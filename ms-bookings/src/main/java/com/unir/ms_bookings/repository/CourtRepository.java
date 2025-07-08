
package com.unir.ms_bookings.repository;

import com.unir.ms_bookings.model.Court;
import com.unir.ms_bookings.model.Club;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourtRepository extends JpaRepository<Court, Long> {
    List<Court> findByClub(Club club);
}
