package it.noteatyertesting.testing.controllerDatiAdmin;

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

import java.util.List;

@RestController
@RequestMapping("/admin")
public class ControllerUtenti {

    @Autowired
    UtenteCRUD utenteGEST;

    @Autowired
    IRistorantiCRUD ristorantiGEST;

    //interfaccia che gestisce le chiamate della tabella piatti
    @Autowired
    IPiattiCRUD piattiGEST;

    //interfaccia che gestisce le chiamate della tabella Ingredienti
    @Autowired
    IIngredientiCRUD ingredientiGEST;


    @GetMapping("/utenti")
    public List<User> elencoutenti() {
        List<User> elenco = utenteGEST.findByRuolo("USER");
        return elenco;
    }

    @GetMapping("/utenti/{id}")
    User user(@PathVariable int id) {

        return utenteGEST.findById(id).orElse(null);

    }

    @PutMapping("/utenti/modifica")
    public void modifica(@RequestBody User usermodifica) {
        User user = utenteGEST.findById(usermodifica.getId()).orElse(null);
        usermodifica.setPassword(user.getPassword());
        usermodifica.setRuolo(user.getRuolo());
        utenteGEST.save(usermodifica);
    }

    @DeleteMapping("/utenti/{id}")
    public void elimina(@PathVariable int id) {
        List<Ristorante> elenco = ristorantiGEST.findByUserId(id);
        if (elenco != null) {
            for (Ristorante ristorante : elenco) {
                ristorante.setMenu(piattiGEST.findPiattoByRistoranteId(ristorante.getId()));
                for (Piatto piattodel : ristorante.getMenu()) {
                    piattodel.setIngredienti(ingredientiGEST.findIngredienteByPiattoId(piattodel.getId()));
                    for (Ingrediente ingrediente : piattodel.getIngredienti()) {
                        ingredientiGEST.deleteById(ingrediente.getId());
                    }
                    piattiGEST.deleteById(piattodel.getId());
                }
                ristorantiGEST.deleteById(ristorante.getId());
            }
        }
        utenteGEST.deleteById(id);
    }
}
