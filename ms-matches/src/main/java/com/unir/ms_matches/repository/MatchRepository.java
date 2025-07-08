package com.unir.ms_matches.repository;

import com.unir.ms_matches.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, Long> {
}
