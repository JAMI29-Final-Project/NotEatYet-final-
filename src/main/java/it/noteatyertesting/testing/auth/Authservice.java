package it.noteatyertesting.testing.auth;

import it.noteatyertesting.testing.security.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Authservice implements UserDetailsService {

    private UtenteCRUD dao;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public Authservice(UtenteCRUD dao, PasswordEncoder passwordEncoder) {
        this.dao = dao;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<? extends UserDetails> user = dao.findByUsername(username);

        if(user.isPresent()) return user.get();

        throw new UsernameNotFoundException("Utente insesitente");
    }
    public void signup (String nome, String cognome, String datadinascita, String mail, String username, String password){
        User newUser = new User();
        newUser.setNome(nome);
        newUser.setCognome(cognome);
        newUser.setDatadinascita(datadinascita);
        newUser.setEmail(mail);
        newUser.setUsername(username);
        newUser.setPassword(password);
        newUser.setRuolo(Roles.USER);

        try{
            dao.save(newUser);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

}
