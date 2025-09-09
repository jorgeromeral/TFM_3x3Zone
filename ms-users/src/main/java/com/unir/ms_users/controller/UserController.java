package com.unir.ms_users.controller;

import com.unir.ms_users.model.User;
import com.unir.ms_users.model.UserLoginDto;
import com.unir.ms_users.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Crear un nuevo usuario
    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        return ResponseEntity.ok(userService.create(user));
    }

    //Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<Iterable<User>> getAll() {
        return ResponseEntity.ok(userService.getAll());
    }

    // Obtener usuario por ID (ver perfil de usuario)
    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return userService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar usuario (modificar perfil)
    @PatchMapping("/{id}")
    public ResponseEntity<String> patchUser(@PathVariable Long id, @RequestBody User userData) {
        return userService.patchUser(id, userData)
                ? ResponseEntity.ok("Usuario modificado")
                : ResponseEntity.status(404).body("Usuario no encontrado");
    }

    // Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        return userService.deleteUser(id)
                ? ResponseEntity.ok("Usuario eliminado")
                : ResponseEntity.status(404).body("Usuario no encontrado");
    }

    // Login de usuario
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        return userService.login(loginData.get("email"), loginData.get("password"))
                .map(user -> {
                    // Devuelve info que será necesaria guardar del usuario (como el id) a conocer
                    // cuando se ha loggeado
                    UserLoginDto userDTO = new UserLoginDto(user.getId(), user.getName(),
                            user.getEmail(), user.getLocation(), user.getRole().toString());
                    return ResponseEntity.ok(userDTO);
                })
                .orElse(ResponseEntity.status(401).body(null));
    }
}