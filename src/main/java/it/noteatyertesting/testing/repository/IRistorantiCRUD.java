package it.noteatyertesting.testing.repository;

import it.noteatyertesting.testing.model.Ristorante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRistorantiCRUD extends JpaRepository<Ristorante, Integer> {

    @Query(value = "select ristoranti from Ristorante ristoranti where ristoranti.via = :via")
    Ristorante ristorante (@Param("via") String via);

    List<Ristorante> findByUserId(int userId);
}
