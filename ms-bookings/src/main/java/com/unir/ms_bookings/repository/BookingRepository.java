
package com.unir.ms_bookings.repository;

import com.unir.ms_bookings.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
