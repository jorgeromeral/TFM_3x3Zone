package com.unir.ms_users.service;

import com.unir.ms_users.model.User;
import com.unir.ms_users.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UsersRepository usersRepository;

    // Crear usuario (Registro)
    public User create(User user) {
        return usersRepository.save(user);
    }

    // Obtener todos los usuarios
    public List<User> getAll() { return usersRepository.findAll(); }

    // Ver info de un usuario (Entrar en perfil)
    public Optional<User> getById(Long id) {
        return usersRepository.findById(id);
    }

    public boolean patchUser(Long id, User data) {
        Optional <User> actualUser = usersRepository.findById(id);

        if (actualUser.isPresent()) {
            User user = actualUser.get();
            if(data.getSurname() != null) user.setSurname(data.getSurname());
            if(data.getName() != null) user.setName(data.getName());
            if(data.getLocation() != null) user.setLocation(data.getLocation());
            if(data.getEmail() != null) user.setEmail(data.getEmail());
            if(data.getLevel() != null) user.setLevel(data.getLevel()); // TODO: Otra forma de actualizar el nivel
            if(data.getPassword() != null) user.setPassword(data.getPassword()); //TODO: Otra forma de actualizar la contraseña
            usersRepository.save(user);
            return true;
        }
        return false;
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
