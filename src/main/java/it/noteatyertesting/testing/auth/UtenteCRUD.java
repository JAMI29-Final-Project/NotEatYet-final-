package it.noteatyertesting.testing.auth;

import org.springframework.data.repository.CrudRepository;

public interface UtenteCRUD extends CrudRepository<User, Integer>, userDao {

}
