
package com.unir.ms_bookings.repository;

import com.unir.ms_bookings.model.Club;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClubRepository extends JpaRepository<Club, Long> {
    List<Club> findByLocation(String location);
}
