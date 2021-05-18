package it.noteatyertesting.testing.controllerDatiAdmin;

import it.noteatyertesting.testing.auth.User;
import it.noteatyertesting.testing.auth.UtenteCRUD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class ControllerUtenti {

    @Autowired
    UtenteCRUD utenteGEST;

    @GetMapping("/utenti")
    public List<User> elencoutenti() {
        return utenteGEST.findByRuolo("USER");
    }

    @PutMapping("/utenti/modifica")
    public void modifica(@RequestBody User usermodifica) {
        User user = utenteGEST.findById(usermodifica.getId()).orElse(null);
        usermodifica.setPassword(user.getPassword());
        utenteGEST.save(usermodifica);
    }

    @DeleteMapping("/utenti/{id}")
    public void elimina(@PathVariable int id) {
        utenteGEST.deleteById(id);
    }
}
