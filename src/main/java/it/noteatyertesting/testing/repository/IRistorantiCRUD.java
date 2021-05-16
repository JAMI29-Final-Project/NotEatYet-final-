package it.noteatyertesting.testing.repository;

import it.noteatyertesting.testing.model.Ristorante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRistorantiCRUD extends JpaRepository<Ristorante, Integer> {

}
