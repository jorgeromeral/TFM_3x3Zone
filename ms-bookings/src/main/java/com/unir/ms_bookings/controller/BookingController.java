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

    // Reservar pista, franja horaria
    @PatchMapping("/{bookingId}/reserve")
    public ResponseEntity<String> reserveBooking(@PathVariable Long bookingId) {
        return bookingService.reserve(bookingId)
                ? ResponseEntity.ok("Reserva realizada") // Si es true
                : ResponseEntity.status(400).body("No se ha podido realizar la reserva"); // Si es false
    }

    // Cancelar reserva de pista
    @PatchMapping("/{bookingId}/cancel")
    public ResponseEntity<String> cancelBooking(@PathVariable Long bookingId) {
        return bookingService.cancel(bookingId)
                ? ResponseEntity.ok("Reserva cancelada") // Si es true
                : ResponseEntity.status(400).body("No se ha podido cancelar la reserva"); // Si es false
    }

    // Crear reservas (Automático desde courts)
    @PostMapping
    public ResponseEntity<Booking> create(@RequestBody Booking booking) {
        return ResponseEntity.status(201).body(bookingService.create(booking));
    }

    // Obtener todas las reservas (opcional, para ver el estado de las reservas)
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    // Obtener reservas por ID de pista
    @GetMapping("/court/{courtId}")
    public ResponseEntity<List<Booking>> getBookingsByCourtId(@PathVariable Long courtId) {
        return ResponseEntity.ok(bookingService.getBookingsByCourtId(courtId));
    }

    // Elimina todas las reservas (slots) de un court
    @DeleteMapping("/clear/{courtId}")
    public ResponseEntity<String> clearFromCourt(@PathVariable Long courtId) {
        bookingService.clearFromCourt(courtId);
        return ResponseEntity.ok("Todos los registros de la tabla han sido eliminados");
    }

    // Elimina todos los registros de la tabla (para pruebas)
    @DeleteMapping("/clear")
    public ResponseEntity<String> clearAll() {
        bookingService.clearAll();
        return ResponseEntity.ok("Todos los registros de la tabla han sido eliminados");
    }

}
