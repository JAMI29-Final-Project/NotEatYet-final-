package it.noteatyertesting.testing.controllerDatiAdmin;

import it.noteatyertesting.testing.auth.User;
import it.noteatyertesting.testing.auth.UtenteCRUD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class ControllerUtenti {

    @Autowired
    UtenteCRUD utenteGEST;

    @GetMapping("/utenti")
    public List<User> elencoutenti() {
        List <User> elenco = utenteGEST.findByRuolo("USER");
        return elenco;
    }

    @GetMapping("/utenti/{id}")
    User user (@PathVariable int id){
        return utenteGEST.findById(id).orElse(null);
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
