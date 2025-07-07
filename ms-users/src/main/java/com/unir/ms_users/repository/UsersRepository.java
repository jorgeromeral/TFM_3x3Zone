package com.unir.ms_users.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.unir.ms_users.model.User;
import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<User, Long> { //<Entity, ID>
    // Metodo para login simple
    Optional<User> findByEmail(String email); // Optional para obligarme a tratar el caso null
}
