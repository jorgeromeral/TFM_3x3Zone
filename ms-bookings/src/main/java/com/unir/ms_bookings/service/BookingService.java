package com.unir.ms_bookings.service;

import com.unir.ms_bookings.model.Booking;
import com.unir.ms_bookings.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final CourtRepository courtRepository;

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
