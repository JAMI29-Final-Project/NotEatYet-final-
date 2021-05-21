package it.noteatyertesting.testing.controllerDatiUser;

import it.noteatyertesting.testing.auth.User;
import it.noteatyertesting.testing.auth.UtenteCRUD;
import it.noteatyertesting.testing.model.Ingrediente;
import it.noteatyertesting.testing.model.Piatto;
import it.noteatyertesting.testing.model.Ristorante;
import it.noteatyertesting.testing.repository.IIngredientiCRUD;
import it.noteatyertesting.testing.repository.IPiattiCRUD;
import it.noteatyertesting.testing.repository.IRistorantiCRUD;
import it.noteatyertesting.testing.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/user")
public class ControllerRistorantiUser {

    @Autowired
    UtenteCRUD daoUser;

    //interfaccia che gestisce le chiamate della tabella Ristoranti
    @Autowired
    IRistorantiCRUD ristorantiGEST;

    //interfaccia che gestisce le chiamate della tabella piatti
    @Autowired
    IPiattiCRUD piattiGEST;

    //interfaccia che gestisce le chiamate della tabella Ingredienti
    @Autowired
    IIngredientiCRUD ingredientiGEST;

    private FileStorageService fs;

    @Autowired
    public ControllerRistorantiUser(FileStorageService fs) {
        this.fs = fs;
    }

    @GetMapping("/usersession")
    User user (Principal principal){
        String nome = principal.getName();
        return (User) daoUser.findByUsername(nome).orElse(null);
    }

    @GetMapping("/ristorantiuser")
    List<Ristorante>  elenco(Principal principal){
        String username = principal.getName();
        User utente = (User) daoUser.findByUsername(username).orElse(null);
        System.out.println(username);
        return ristorantiGEST.findByUserId(utente.getId());
    }

    @GetMapping("/ristorantiuser/{id}")
    public Ristorante getOne(@PathVariable int id) {
        Ristorante ristorante = ristorantiGEST.findById(id).orElse(null);
        ristorante.setMenu(piattiGEST.findPiattoByRistoranteId(id));
        for(Piatto piatto : ristorante.getMenu()){
            piatto.setIngredienti(ingredientiGEST.findIngredienteByPiattoId(piatto.getId()));
        }
        return ristorante;
    }
    @PostMapping("/ristorantiuser")
    public int addResturant(Principal principal ,@RequestBody Ristorante ristorante) {
        String username = principal.getName();
        User utente = (User) daoUser.findByUsername(username).orElse(null);
        ristorante.setUser(utente);
        ristorantiGEST.save(ristorante);
        return ristorante.getId();
    }

    @PostMapping("/fileupload/{idRistornate}")
    public void uploadFile(@PathVariable int idRistornate,@RequestParam("ajax_file") MultipartFile file) {
        Ristorante ristorante = ristorantiGEST.findById(idRistornate).orElse(null);
        System.out.println(file.getOriginalFilename());
        if(!file.isEmpty()) {
            fs.salvaFile(file);
        }
        if(ristorante != null){
            ristorante.setImmagini(file.getOriginalFilename());
            ristorantiGEST.save(ristorante);
        }
    }

    @DeleteMapping("/ristorantiuser/{id}")
    public void deleteResturant(@PathVariable int id) {

        Ristorante ristorante = getOne(id);
        if(ristorante.getImmagini() != null) {
            fs.deleteFile(ristorante.getImmagini());
        }else{
            ristorante.setImmagini("Addio");
        }
        for (Piatto piattodel : ristorante.getMenu()) {
            for(Ingrediente ingrediente : piattodel.getIngredienti()) {
                ingredientiGEST.deleteById(ingrediente.getId());
            }
            piattiGEST.deleteById(piattodel.getId());
        }
        ristorantiGEST.deleteById(ristorante.getId());
    }
    @PutMapping("/ristorantiuser")
    public void editRistorant(@RequestBody Ristorante ristoranteedit){
        Ristorante ristorante = ristorantiGEST.findById(ristoranteedit.getId()).orElse(null);
        ristoranteedit.setUser(ristorante.getUser());
        ristorantiGEST.save(ristoranteedit);
    }
}
