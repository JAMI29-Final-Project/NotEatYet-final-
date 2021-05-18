package it.noteatyertesting.testing.repository;


import it.noteatyertesting.testing.model.Ingrediente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IIngredientiCRUD extends JpaRepository<Ingrediente, Integer> {

    List<Ingrediente> findIngredienteByPiattoId(int id);

    void deleteIngredienteByPiattoId(int id);
}
