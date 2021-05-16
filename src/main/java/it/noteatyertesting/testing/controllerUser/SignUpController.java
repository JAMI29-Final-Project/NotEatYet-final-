package it.noteatyertesting.testing.controllerUser;

import it.noteatyertesting.testing.auth.Authservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/signup")
public class SignUpController {

    @Autowired
    private Authservice authservice;

    @PostMapping
    public String singup(@RequestParam String nome, @RequestParam String cognome, @RequestParam String datadinascita, @RequestParam String mail, @RequestParam String username, @RequestParam String password){
        authservice.signup(nome, cognome, datadinascita, mail, username, password);
        return "Registrato";
    }
}
