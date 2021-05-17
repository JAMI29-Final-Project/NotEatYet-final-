package it.noteatyertesting.testing.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UtenteCRUD extends CrudRepository<User, Integer>, userDao {

//    @Query(value = "select users.id, users.nome from User users where users.username = name ") //user
//    User user (String name);
//
//    User findByUsername(String username);

}
