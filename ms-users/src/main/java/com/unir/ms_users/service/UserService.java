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

    public User patchUser(Long id, User user) {
        User actualUser = usersRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        if(user.getName() != null) actualUser.setName(user.getName());
        if(user.getSurname() != null) actualUser.setSurname(user.getSurname());
        if(user.getLocation() != null) actualUser.setLocation(user.getLocation());
        if(user.getEmail() != null) actualUser.setEmail(user.getEmail());
        if(user.getLevel() != null) actualUser.setLevel(user.getLevel()); // TODO: Otra forma de actualizar el nivel
        if(user.getPassword() != null) actualUser.setPassword(user.getPassword()); //TODO: Otra forma de actualizar la contraseña

        return usersRepository.save(actualUser);
    }

    public boolean deleteUser(Long id) {
        if (usersRepository.existsById(id)) {
            usersRepository.deleteById(id);
            return true;
        }
        return false;
    }


    // TODO: Securizar login (JWT)
    // Login: Comprueba contrasena
    public Optional<User> login(String email, String password) {
        return usersRepository.findByEmail(email)
                .filter(u -> u.getPassword().equals(password));
    }
}
