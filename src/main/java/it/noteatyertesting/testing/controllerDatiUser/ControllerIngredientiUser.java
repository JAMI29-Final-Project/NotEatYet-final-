package it.noteatyertesting.testing.controllerDatiUser;

import it.noteatyertesting.testing.model.Ingrediente;
import it.noteatyertesting.testing.model.Piatto;
import it.noteatyertesting.testing.repository.IIngredientiCRUD;
import it.noteatyertesting.testing.repository.IPiattiCRUD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class ControllerIngredientiUser {

    @Autowired
    IIngredientiCRUD ingredientiGEST;

    @Autowired
    IPiattiCRUD piattiGEST;

    @GetMapping("/ingredientiuser/{piattoid}")
    List<Ingrediente> ingredienteList(@PathVariable int piattoid) {
        return ingredientiGEST.findIngredienteByPiattoId(piattoid);
    }

    @PostMapping("ingredientiuser/aggiungi/{idPiatto}")
    public void addIngredientiAPiatto(@PathVariable int idPiatto, @RequestParam String ingredienti) {
        Piatto p = piattiGEST.findById(idPiatto).orElse(null);
        Ingrediente ingrediente = new Ingrediente(ingredienti,p);
        ingredientiGEST.save(ingrediente);
    }
}
