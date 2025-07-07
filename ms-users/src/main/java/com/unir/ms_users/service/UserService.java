package com.unir.ms_users.service;

import com.unir.ms_users.model.User;
import com.unir.ms_users.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UsersRepository usersRepository;

    // Crear usuario (Registro)
    public User create(User user) {
        return usersRepository.save(user);
    }

    // Ver info de un usuario (Entrar en perfil)
    public Optional<User> getById(Long id) {
        return usersRepository.findById(id);
    }

    // TODO: Securizar login (JWT)
    // Login: Comprueba contrasena
    public Optional<User> login(String email, String password) {
        return usersRepository.findByEmail(email)
                .filter(u -> u.getPassword().equals(password));
    }
}
