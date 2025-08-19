package com.unir.ms_clubs.controller;

import com.unir.ms_clubs.model.Court;
import com.unir.ms_clubs.service.CourtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courts")
@RequiredArgsConstructor
public class CourtController {

    private final CourtService service;

    // Obtener pistas de un club en concreto
    @GetMapping("/{clubId}")
    public ResponseEntity<List<Court>> getByClub(@PathVariable Long clubId) {
        return ResponseEntity.ok(service.getByClub(clubId));
    }

    // Crear pista
    @PostMapping("{clubId}")
    public ResponseEntity<Court> create(@RequestBody Court court, @PathVariable Long clubId) {
        return ResponseEntity.status(201).body(service.create(court, clubId));
    }

    // Actualizar pista existente
    @PatchMapping("/{courtId}")
    public ResponseEntity<?> update(@PathVariable Long courtId, @RequestBody Court court) {
        return service.update(courtId, court)
                ? ResponseEntity.ok("Pista actualizada")
                : ResponseEntity.status(404).body("Pista no encontrada");
    }

    // Eliminar pista
    @DeleteMapping("/{courtId}")
    public ResponseEntity<?> delete(@PathVariable Long courtId) {
        return service.delete(courtId)
                ? ResponseEntity.ok("Pista eliminada")
                : ResponseEntity.status(404).body("Pista no encontrada");
    }
}
