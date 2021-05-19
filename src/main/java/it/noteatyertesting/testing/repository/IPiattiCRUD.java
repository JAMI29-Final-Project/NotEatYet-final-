package it.noteatyertesting.testing.repository;

import it.noteatyertesting.testing.model.Piatto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPiattiCRUD extends JpaRepository<Piatto, Integer> {

    public List<Piatto> findPiattoByRistoranteId(Integer id);


}
