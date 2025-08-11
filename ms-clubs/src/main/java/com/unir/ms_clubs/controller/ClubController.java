package com.unir.ms_clubs.controller;

import com.unir.ms_clubs.model.Club;
import com.unir.ms_clubs.service.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clubs")
@RequiredArgsConstructor
public class ClubController {

    private final ClubService service;

    @GetMapping
    public ResponseEntity<List<Club>> getAll() {
        return ResponseEntity.ok(service.getAll()); // Por defecto, devuelve todos los clubes
    }

    // obterner club por ID
    @GetMapping("/{id}")
    public ResponseEntity<Club> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).build());
    }
    // Obtener clubes por ubicación
    @GetMapping
    public ResponseEntity<List<Club>> getByLocation(@RequestParam String location) {
        return ResponseEntity.ok(service.getByLocation(location));
    }

    // Crear club nuevo
    @PostMapping
    public ResponseEntity<Club> create(@RequestBody Club club) {
        return ResponseEntity.status(201).body(service.create(club));
    }

    //Modificar club existente
    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody Club club) {
        return service.update(id, club)
                ? ResponseEntity.ok("Club actualizado")
                : ResponseEntity.status(404).body("Club no encontrado");
    }

    // Eliminar club
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        return service.delete(id)
                ? ResponseEntity.ok("Club eliminado")
                : ResponseEntity.status(404).body("Club no encontrado");
    }
}
