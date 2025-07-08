package com.unir.ms_bookings.controller;

import com.unir.ms_bookings.model.Club;
import com.unir.ms_bookings.service.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clubs")
@RequiredArgsConstructor
public class ClubController {

    private final ClubService service;

    // Obtener clubes por ubicación (clubes que se muestran por defecto en la app)
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
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Club club) {
        return service.update(id, club)
                ? ResponseEntity.ok("Club actualizado")
                : ResponseEntity.status(404).body("Club no encontrado");
    }

    // Eliminar club
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return service.delete(id)
                ? ResponseEntity.ok("Club eliminado")
                : ResponseEntity.status(404).body("Club no encontrado");
    }
}
