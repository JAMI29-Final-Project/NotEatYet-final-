package it.noteatyertesting.testing.repository;


import it.noteatyertesting.testing.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategorieCRUD extends JpaRepository<Categoria, Integer> {

}


