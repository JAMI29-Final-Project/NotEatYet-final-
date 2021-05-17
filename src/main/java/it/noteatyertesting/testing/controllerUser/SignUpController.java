package it.noteatyertesting.testing.controllerUser;

import it.noteatyertesting.testing.auth.Authservice;
import it.noteatyertesting.testing.auth.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/signup")
public class SignUpController {

    @Autowired
    private Authservice authservice;

    @PostMapping
    public String singup(@RequestBody User user){
        authservice.signup(user.getNome(), user.getCognome(), user.getDatadinascita(), user.getEmail(), user.getUsername(), user.getPassword());
        return "Registrato";
    }
}