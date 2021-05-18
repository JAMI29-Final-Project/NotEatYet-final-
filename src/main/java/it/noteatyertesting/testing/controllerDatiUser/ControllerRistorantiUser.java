package it.noteatyertesting.testing.controllerDatiUser;

import it.noteatyertesting.testing.auth.User;
import it.noteatyertesting.testing.auth.UtenteCRUD;
import it.noteatyertesting.testing.model.Ingrediente;
import it.noteatyertesting.testing.model.Piatto;
import it.noteatyertesting.testing.model.Ristorante;
import it.noteatyertesting.testing.repository.IIngredientiCRUD;
import it.noteatyertesting.testing.repository.IPiattiCRUD;
import it.noteatyertesting.testing.repository.IRistorantiCRUD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public void addResturant(@RequestBody Ristorante ristorante) {
        ristorantiGEST.save(ristorante);
    }

    @DeleteMapping("/ristorantiuser/{id}")
    public void deleteResturant(@PathVariable int id) {

        Ristorante ristorante = getOne(id);

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
