package it.noteatyertesting.testing.controllerDatiAdmin;


//import it.noteatyertesting.testing.model.Categoria;
//import it.noteatyertesting.testing.model.Ingrediente;

import it.noteatyertesting.testing.model.Piatto;
//import it.noteatyertesting.testing.model.Ristorante;
import it.noteatyertesting.testing.repository.ICategorieCRUD;
import it.noteatyertesting.testing.repository.IIngredientiCRUD;
import it.noteatyertesting.testing.repository.IPiattiCRUD;
import it.noteatyertesting.testing.repository.IRistorantiCRUD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class ControllerPiatti {

    /*
     *PIATTI OK review by EDOARDO CAROLLO
     */

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

    @GetMapping("/piatti")
    public List<Piatto> getAll() {
        return piattiGEST.findAll();
    }

    @GetMapping("/piatti/ristoranteid/{idRistoratore}")
    public List<Piatto> piatti(@PathVariable int idRistoratore) {
        List<Piatto> piatti = piattiGEST.findPiattoByRistoranteId(idRistoratore);
        for (Piatto piatto : piatti) {
            piatto.setIngredienti(ingredientiGEST.findIngredienteByPiattoId(piatto.getId()));
        }

        return piatti;

    }

    @GetMapping("/piatti/piattoid/{idPiatto}")
    public Piatto piatto(@PathVariable int idPiatto) {
        Piatto piatto = piattiGEST.findById(idPiatto).orElse(null);
        piatto.setIngredienti(ingredientiGEST.findIngredienteByPiattoId(piatto.getId()));
        return piatto;
    }

//    @PostMapping("/piatti/aggiungi/{idRistorante}/{idCategoria}")
//    public void addPiatto(@PathVariable int idRistorante, @PathVariable int idCategoria, @RequestBody Piatto piatto){
//        Categoria categoria = categorieGEST.findById(idCategoria).orElse(null);
//        Ristorante ristorante = ristorantiGEST.findById(idRistorante).orElse(null);
//        piatto.setCategoria(categoria);
//        piatto.setRistorante(ristorante);
//        piattiGEST.save(piatto);
//    }

//    @DeleteMapping("/piatti/elimina/{idPiatto}")
//    public void delete(@PathVariable int idPiatto){
//        Piatto piatto = piattiGEST.findById(idPiatto).orElse(null);
//        piatto.setIngredienti(ingredientiGEST.findIngredienteByPiattoId(piatto.getId()));
//        if(piatto.getIngredienti() != null){
//            for(Ingrediente ingrediente : piatto.getIngredienti()){
//                ingredientiGEST.deleteById(ingrediente.getId());
//            }
//        }
//        piattiGEST.deleteById(idPiatto);
//    }

//    @PutMapping("/piatti/edit/{idCategoria}")
//    public void editPiatto( @PathVariable int idCategoria, @RequestBody Piatto piattoModifica ){
//        Piatto piatto = piattiGEST.findById(piattoModifica.getId()).orElse(null);
//        piattoModifica.setRistorante(piatto.getRistorante());
//        Categoria categoria = categorieGEST.findById(idCategoria).orElse(null);
//        piattoModifica.setCategoria(categoria);
//        piattiGEST.save(piattoModifica);
//    }
}
