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
    private UserService service;

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        return ResponseEntity.ok(service.create(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /*@PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User login) {
        return service.login(login.getEmail(), login.getPassword())
                .map(user -> ResponseEntity.ok("Hola " + user.getName()))
                .orElse(ResponseEntity.status(401).body("Usuario y/o contraseña incorrectos"));
    }*/
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginData) {
        return service.login(loginData.get("email"), loginData.get("password"))
                .map(user -> ResponseEntity.ok("Hola: " + user.getName()))
                .orElse(ResponseEntity.status(401).body("Usuario y/o contraseña incorrectos"));
    }
}