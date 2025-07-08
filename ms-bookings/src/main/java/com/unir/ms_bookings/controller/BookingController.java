package com.unir.ms_bookings.controller;

import com.unir.ms_bookings.model.Booking;
import com.unir.ms_bookings.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @GetMapping("/court/{courtId}")
    public ResponseEntity<List<Booking>> getBookingsByCourt(@PathVariable Long courtId) {
        List<Booking> booking = bookingService.getByCourt(courtId);
        return ResponseEntity.ok(booking);
    }

    @PatchMapping("/{bookingId}/reserve")
    public ResponseEntity<String> reserveBooking(@PathVariable Long bookingId) {
        return bookingService.reserve(bookingId)
                ? ResponseEntity.ok("Reserva realizada") // Si es true
                : ResponseEntity.status(400).body("No se ha podido realizar la reserva"); // Si es false
    }

    @PatchMapping("/{bookingId}/cancel")
    public ResponseEntity<String> cancelBooking(@PathVariable Long bookingId) {
        return bookingService.cancel(bookingId)
                ? ResponseEntity.ok("Reserva cancelada") // Si es true
                : ResponseEntity.status(400).body("No se ha podido cancelar la reserva"); // Si es false
    }


}
