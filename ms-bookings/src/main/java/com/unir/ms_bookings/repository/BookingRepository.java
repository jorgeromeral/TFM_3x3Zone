
package com.unir.ms_bookings.repository;

import com.unir.ms_bookings.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCourtId(Long courtId);
}
