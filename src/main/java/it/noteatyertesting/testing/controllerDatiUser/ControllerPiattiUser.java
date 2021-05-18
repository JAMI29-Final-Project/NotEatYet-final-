package it.noteatyertesting.testing.controllerDatiUser;

import it.noteatyertesting.testing.model.Piatto;
import it.noteatyertesting.testing.repository.ICategorieCRUD;
import it.noteatyertesting.testing.repository.IIngredientiCRUD;
import it.noteatyertesting.testing.repository.IPiattiCRUD;
import it.noteatyertesting.testing.repository.IRistorantiCRUD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class ControllerPiattiUser {

    //interfaccia che gestisce le chiamate della tabella Ristoranti
    @Autowired
    IRistorantiCRUD ristorantiGEST;

    //interfaccia che gestisce le chiamate della tabella piatti
    @Autowired
    IPiattiCRUD piattiGEST;

    //interfaccia che gestisce le chiamate della tabella categorie
    @Autowired
    ICategorieCRUD categorieGEST;

    //interfaccia che gestisce le chiamate della tabella Ingredienti
    @Autowired
    IIngredientiCRUD ingredientiGEST;

    @GetMapping("/piattiuser")
    public List<Piatto> getAll() {
        return piattiGEST.findAll();
    }

    @GetMapping("/piattiuser/ristoranteid/{idRistoratore}")
    public List<Piatto> piatti(@PathVariable int idRistoratore) {
        List<Piatto> piatti = piattiGEST.findPiattoByRistoranteId(idRistoratore);
        for (Piatto piatto : piatti) {
            piatto.setIngredienti(ingredientiGEST.findIngredienteByPiattoId(piatto.getId()));
        }
        return piatti;
    }
    @GetMapping("/piattiuser/piattoid/{idPiatto}")
    public Piatto piatto(@PathVariable int idPiatto) {
        Piatto piatto = piattiGEST.findById(idPiatto).orElse(null);
        piatto.setIngredienti(ingredientiGEST.findIngredienteByPiattoId(piatto.getId()));
        return piatto;
    }
}
