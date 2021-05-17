package it.noteatyertesting.testing.auth;

import it.noteatyertesting.testing.security.Roles;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "users")
public class User implements UserDetails {


    private static final Map<String, Collection<? extends GrantedAuthority>> AUTHORITIES = new HashMap<>();

    {
        AUTHORITIES.put(Roles.ADMIN, Arrays.asList(new GrantedAuthority[] { new SimpleGrantedAuthority("ROLE_ADMIN"),
                new SimpleGrantedAuthority("management"), }));
        AUTHORITIES.put(Roles.USER, Arrays.asList(new GrantedAuthority[] { new SimpleGrantedAuthority("ROLE_USER") }));

    }

    public static Collection<? extends GrantedAuthority> getAuthorityOfRole(String role) {
        return AUTHORITIES.get(role);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String username;
    private String password;
    private String nome;
    private String cognome;
    private String datadinascita;
    private String ruolo;

    public User() {
    }

    public User(int id, String email, String username, String password, String nome, String cognome, String datadinascita, String ruolo) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.nome = nome;
        this.cognome = cognome;
        this.datadinascita = datadinascita;
        this.ruolo = ruolo;
    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getDatadinascita() {
        return datadinascita;
    }

    public void setDatadinascita(String datadinascita) {
        this.datadinascita = datadinascita;
    }

    public String getRuolo() {
        return ruolo;
    }

    public void setRuolo(String ruolo) {
        this.ruolo = ruolo;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getAuthorityOfRole(this.ruolo);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "{\"User\":{"
                + " \"id\":\"" + id + "\""
                + ",\"email\":\"" + email + "\""
                + ",\"username\":\"" + username + "\""
                + ",\"password\":\"" + password + "\""
                + ",\"nome\":\"" + nome + "\""
                + ",\"cognome\":\"" + cognome + "\""
                + ",\"datadinascita\":\"" + datadinascita + "\""
                + ",\"ruolo\":\"" + ruolo + "\""
                + "}}";
    }
}
