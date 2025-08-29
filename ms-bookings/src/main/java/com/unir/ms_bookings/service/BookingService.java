package com.unir.ms_bookings.service;

import com.unir.ms_bookings.model.Booking;
import com.unir.ms_bookings.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;

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

    // Crear una nueva reserva
    public Booking create(Booking booking) {
        booking.setAvailable(true); // Por defecto, al crear una reserva, está disponible
        return bookingRepository.save(booking);
    }

    // Obtener todas las reservas (opcional, para ver el estado de las reservas)
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Obtener reservas por ID de pista
    public List<Booking> getBookingsByCourtId(Long courtId) {
        return bookingRepository.findByCourtId(courtId);
    }

    // vaciar tabla entera de courts (para testing)
    public void clearAll() {
        bookingRepository.deleteAll();
    }
}
