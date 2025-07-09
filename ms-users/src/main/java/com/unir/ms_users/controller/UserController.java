package com.unir.ms_users.controller;

import com.unir.ms_users.model.User;
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

    // Obtener usuario por ID (ver perfil de usuario)
    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return userService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar usuario (modificar perfil)
    @PatchMapping("/{id}")
    public ResponseEntity<User> patchUser(@PathVariable Long id, @RequestBody User userData) {
        User updatedUser = userService.patchUser(id, userData);
        return ResponseEntity.ok(updatedUser);
    }

    // Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return userService.deleteUser(id)
                ? ResponseEntity.ok("Usuario eliminado")
                : ResponseEntity.status(404).body("Usuario no encontrado");
    }

    // Login de usuario registrado
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginData) {
        return userService.login(loginData.get("email"), loginData.get("password"))
                .map(user -> ResponseEntity.ok("Hola: " + user.getName()))
                .orElse(ResponseEntity.status(401).body("Usuario y/o contraseña incorrectos"));
    }
}