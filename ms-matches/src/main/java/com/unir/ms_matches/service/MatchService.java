package com.unir.ms_matches.service;

import com.unir.ms_matches.model.Match;
import com.unir.ms_matches.model.MatchType;
import com.unir.ms_matches.model.Status;
import com.unir.ms_matches.repository.MatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MatchService {

    private final MatchRepository matchRepository;

    public Match create(Match match) {
        if (match.getMatchType().equals(MatchType._3X3)) {
            match.setMinPlayers(6);
            match.setMaxPlayers(8);
        } else if (match.getMatchType().equals(MatchType._5X5)) {
            match.setMinPlayers(10);
            match.setMaxPlayers(14);
        }
        match.setNumPlayers(0); // Inicializa el número de jugadores a 0
        return matchRepository.save(match);
    }

    public Optional<Match> getById(Long id) {
        return matchRepository.findById(id);
    }

    public List<Match> getAll() {
        return matchRepository.findAll();
    }

    public boolean joinMatch(Long matchId, Long playerId) {
        Optional<Match> optionalMatch = matchRepository.findById(matchId);
        if (optionalMatch.isPresent()) {
            Match match = optionalMatch.get();
            // Primero se compruba que el usuario no está añadido y que no sobrepasa el máximo
            if (!match.getPlayersId().contains(playerId) && match.getPlayersId().size() < match.getMaxPlayers()) {
                match.getPlayersId().add(playerId);
                updateMatchStatus(match); // Actualiza el estado del partido
                match.setNumPlayers(match.getPlayersId().size()); // Actualiza el número de jugadores
                matchRepository.save(match);
                return true;
            }
        }
        return false;
    }

    public boolean leaveMatch(Long matchId, Long playerId) {
        Optional<Match> optionalMatch = matchRepository.findById(matchId);
        if (optionalMatch.isPresent()) {
            Match match = optionalMatch.get();
            if (match.getPlayersId().contains(playerId)) {
                match.getPlayersId().remove(playerId);
                match.setNumPlayers(match.getPlayersId().size()); // Actualiza el número de jugadores
                if (match.getPlayersId().isEmpty()) {
                    matchRepository.deleteById(matchId); // Elimina el partido si no quedan jugadores
                } else {
                    updateMatchStatus(match); // Actualiza el estado del partido
                    matchRepository.save(match);
                }
                return true;
            }
        }
        return false;
    }

    //Elimina un partido por ID
    public boolean deleteMatch(Long matchId) {
        if (matchRepository.existsById(matchId)) {
            matchRepository.deleteById(matchId);
            return true;
        }
        return false;
    }

    //Se comprueba el tamaño de lista para el estado del partido
    public void updateMatchStatus(Match match) {
        int numPlayers = match.getPlayersId().size();
        int min = match.getMinPlayers();
        int max = match.getMaxPlayers();

        if (numPlayers < min) {
            match.setStatus(Status.OPEN);
        } else if (numPlayers < max) {
            match.setStatus(Status.READY);
        } else if (numPlayers == max) {
            match.setStatus(Status.FULL);
        }
    }
}
