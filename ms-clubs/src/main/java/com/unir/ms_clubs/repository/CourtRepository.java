
package com.unir.ms_clubs.repository;

import com.unir.ms_clubs.model.Court;
import com.unir.ms_clubs.model.Club;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourtRepository extends JpaRepository<Court, Long> {
    List<Court> findByClub(Club club);
}
