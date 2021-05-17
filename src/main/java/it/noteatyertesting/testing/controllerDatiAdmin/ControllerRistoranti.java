package it.noteatyertesting.testing.controllerDatiAdmin;


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
public class ControllerRistoranti {

    //interfaccia che gestisce le chiamate della tabella Ristoranti
    @Autowired
    IRistorantiCRUD ristorantiGEST;

    //interfaccia che gestisce le chiamate della tabella piatti
    @Autowired
    IPiattiCRUD piattiGEST;

    //interfaccia che gestisce le chiamate della tabella Ingredienti
    @Autowired
    IIngredientiCRUD ingredientiGEST;

    @GetMapping("/ristoranti")
        public List<Ristorante> getAll() {

            return ristorantiGEST.findAll();
        }

        @GetMapping("/ristoranti/{id}")
        public Ristorante getOne(@PathVariable int id) {
        Ristorante ristorante = ristorantiGEST.findById(id).orElse(null);
        ristorante.setMenu(piattiGEST.findPiattoByRistoranteId(id));
        for(Piatto piatto : ristorante.getMenu()){
            piatto.setIngredienti(ingredientiGEST.findIngredienteByPiattoId(piatto.getId()));
        }
        return ristorante;
    }

    @PostMapping("/ristoranti")
    public void addResturant(@RequestBody Ristorante ristorante) {
        ristorantiGEST.save(ristorante);
    }

    @DeleteMapping("/ristoranti/{id}")
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
    @PutMapping("/ristoranti")
    public void editRistorant(@RequestBody Ristorante ristoranteedit){
        Ristorante ristorante = ristorantiGEST.findById(ristoranteedit.getId()).orElse(null);
        ristoranteedit.setUser(ristorante.getUser());
        ristorantiGEST.save(ristoranteedit);
    }

}
