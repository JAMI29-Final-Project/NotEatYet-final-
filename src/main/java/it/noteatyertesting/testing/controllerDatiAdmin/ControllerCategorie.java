package it.noteatyertesting.testing.controllerDatiAdmin;

import it.noteatyertesting.testing.model.Categoria;
import it.noteatyertesting.testing.repository.ICategorieCRUD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ControllerCategorie {
    @Autowired
    ICategorieCRUD categorieGEST;

    @GetMapping("/categorie")
    public List<Categoria> categorie() {
        return categorieGEST.findAll();
    }
}
