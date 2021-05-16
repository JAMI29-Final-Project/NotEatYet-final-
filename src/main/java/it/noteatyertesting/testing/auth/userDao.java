package it.noteatyertesting.testing.auth;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface userDao {
    Optional<? extends UserDetails> findByUsername(String username);
}
