package it.noteatyertesting.testing.controllerDatiAdmin;

import it.noteatyertesting.testing.model.Ingrediente;
import it.noteatyertesting.testing.repository.IIngredientiCRUD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class ControllerIngredienti {

    @Autowired
    IIngredientiCRUD ingredientiGEST;

    @GetMapping("/ingredienti/{piattoid}")
    List<Ingrediente> ingredienteList(@PathVariable int piattoid){
        return ingredientiGEST.findIngredienteByPiattoId(piattoid);
    }

}
