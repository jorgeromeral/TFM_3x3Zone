
package com.unir.ms_bookings.repository;

import com.unir.ms_bookings.model.Booking;
import com.unir.ms_bookings.model.Court;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCourt(Court court);
}
