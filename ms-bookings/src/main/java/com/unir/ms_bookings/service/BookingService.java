package com.unir.ms_bookings.service;

import com.unir.ms_bookings.model.Booking;
import com.unir.ms_bookings.model.Court;
import com.unir.ms_bookings.repository.BookingRepository;
import com.unir.ms_bookings.repository.CourtRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final CourtRepository courtRepository;

    public List<Booking> getByCourt(Long courtId) {
        return courtRepository.findById(courtId)
                .map(bookingRepository::findByCourt)
                .orElse(List.of()); // lista vacia
    }

    // Reservar una franja existente
    public boolean reserve(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if (!booking.isAvailable()) {
            return false;
        }
        booking.setAvailable(false);
        bookingRepository.save(booking);
        return true;
    }

    // Cancelar una reserva
    public boolean cancel(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if (booking.isAvailable()) {
            return false;
        }
        booking.setAvailable(true);
        bookingRepository.save(booking);
        return true;
    }

}
