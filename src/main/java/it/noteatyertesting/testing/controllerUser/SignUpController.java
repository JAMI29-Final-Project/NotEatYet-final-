package it.noteatyertesting.testing.controllerUser;

import it.noteatyertesting.testing.auth.Authservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class SignUpController {

    @Autowired
    private Authservice authService;

    @PostMapping("/signup/add")
    public void singup(@RequestParam String nome, @RequestParam String cognome, @RequestParam String datadinascita, @RequestParam String email, @RequestParam String username, @RequestParam String password){
        authService.signup(nome, cognome, datadinascita, email, username, password);
    }
}