package com.unir.ms_matches.controller;

import com.unir.ms_matches.model.Match;
import com.unir.ms_matches.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    @Autowired
    private MatchService matchService;

    // Crear nuevo partido
    @PostMapping
    public ResponseEntity<Match> createMatch(@RequestBody Match match) {
        return ResponseEntity.ok(matchService.create(match));
    }

    // Obtener un partido por ID (ver detalles del partido)
    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatch(@PathVariable Long id) {
        return matchService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Obtener todos los partidos
    @GetMapping
    public ResponseEntity<List<Match>> getAllMatches() {
        return ResponseEntity.ok(matchService.getAll());
    }

    // Unirse a un partido
    @PatchMapping("/{id}/join")
    public ResponseEntity<String> joinMatch(@PathVariable Long id, @RequestParam Long playerId) {
        boolean joined = matchService.joinMatch(id, playerId);
        return joined
                ? ResponseEntity.ok("Te has unido al partido correctamente.")
                : ResponseEntity.badRequest().body("No se pudo unir al partido");
    }

    // Salirse de un partido
    @PatchMapping("/{id}/leave")
    public ResponseEntity<String> leaveMatch(@PathVariable Long id, @RequestParam Long playerId) {
        boolean left = matchService.leaveMatch(id, playerId);
        return left
                ? ResponseEntity.ok("Te has salido del partido.")
                : ResponseEntity.badRequest().body("No estás inscrito al partido");
    }

    // Eliminar un partido (TODO: solo si el usuario es el creador del partido)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMatch(@PathVariable Long id) {
        boolean deleted = matchService.deleteMatch(id);
        return deleted
                ? ResponseEntity.ok("Partido eliminado correctamente.")
                : ResponseEntity.badRequest().body("No se pudo eliminar el partido");
    }
}
