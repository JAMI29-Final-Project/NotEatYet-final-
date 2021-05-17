package it.noteatyertesting.testing.security;

import it.noteatyertesting.testing.auth.Authservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class ApplicationSecuretyConfig extends WebSecurityConfigurerAdapter {

    private final PasswordEncoder passwordEncoder;
    private final Authservice authservice;

    @Autowired
    public ApplicationSecuretyConfig(PasswordEncoder passwordEncoder, Authservice authservice) {
        this.passwordEncoder = passwordEncoder;
        this.authservice = authservice;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()

                .authorizeRequests().antMatchers("/", "/css/**", "/img/**", "/logos/**", "/videos/**",
                                                            "/homepage.html", "/login_error.html", "/login_Page.html",
                                                            "/sign_up.html", "/forbidden.html", "/jquery-3.6.0.min.js",
                                                            "/logout.html", "/signup.js", "/signup/add", "/login").permitAll()
                .antMatchers("/login_success.html").hasAnyRole(Roles.ADMIN, Roles.USER)
                //acesso ai template Admin
                .antMatchers("/admin/**").hasAnyRole(Roles.ADMIN)
                //accesso controllerAdmin
                //controllerRistoranti
                .antMatchers("/ristoranti","/ristoranti/{id}").hasAnyRole(Roles.ADMIN)
                //controllerPiatti
                .antMatchers("/piatti","/piatti/ristoranteid/{idRistoratore}","/piatti/piattoid/{idPiatto}",
                                        "/piatti/aggiungi/{idRistorante}/{idCategoria}","/piatti/elimina/{idPiatto}",
                                        "/piatti/edit/{idCategoria}").hasAnyRole(Roles.ADMIN)
                //controllerCategorie
                .antMatchers("/categorie").hasAnyRole(Roles.ADMIN)
                //controllerUtenti (fix)
                .antMatchers("/user/**","/user/ristoranti","/user/ristoranti/{via}").hasAnyRole(Roles.USER)
                .anyRequest().authenticated()
                .and()
                .exceptionHandling()
                .accessDeniedPage("/forbidden.html")
                .and()
                .formLogin()
                .loginPage("/login_Page.html")
                .loginProcessingUrl("/login")
                .permitAll()
                .defaultSuccessUrl("/login_success.html", true)
                .failureUrl("/login_error.html")
                .passwordParameter("password")
                .usernameParameter("username")
                .and()
                .rememberMe()
                .rememberMeParameter("remember-me")
                .and()
                .logout().logoutUrl("/logout")
                .logoutSuccessUrl("/logout.html")
                .clearAuthentication(true)
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .logoutSuccessUrl("/homepage.html");
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(authservice);
        return provider;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

}