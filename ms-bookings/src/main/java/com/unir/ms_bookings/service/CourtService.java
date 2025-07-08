package com.unir.ms_bookings.service;

import com.unir.ms_bookings.model.Booking;
import com.unir.ms_bookings.model.Club;
import com.unir.ms_bookings.model.Court;
import com.unir.ms_bookings.repository.BookingRepository;
import com.unir.ms_bookings.repository.ClubRepository;
import com.unir.ms_bookings.repository.CourtRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourtService {

    private final CourtRepository courtRepository;
    private final ClubRepository clubRepository;
    private final BookingRepository bookingRepository;

    // En base al club Id filtra las pistas ue pertenezcan a ese ID del club
    public List<Court> getByClub(Long clubId) {
        return clubRepository.findById(clubId)
                .map(courtRepository::findByClub)
                .orElse(List.of()); // lista vacia
    }

    public Court create(Court court) {
        generateSlots(court, 7); // Genera slots para 7 días
        return courtRepository.save(court);
    }

    public boolean update(Long id, Court data) {
        Optional<Court> optionalCourt = courtRepository.findById(id);
        if (optionalCourt.isPresent()) {
            Court court = optionalCourt.get();
            court.setName(data.getName());
            court.setCourtType(data.getCourtType());
            courtRepository.save(court);
            return true;
        }
        return false;
    }

    public boolean delete(Long id) {
        if (courtRepository.existsById(id)) {
            courtRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // TODO: Autogenerar slots de horas para la reserva de una pista
    // Este metodo genera slots de horas para la reserva de una pista
    // @param days: numero de dias a generar slots
    private void generateSlots(Court court, int days) {
        for (int i = 0; i < days; i++) {
            LocalDate day = LocalDate.now().plusDays(i); // dia = hoy + days (a generar)
            LocalTime current = court.getOpeningTime(); // hora de apertura de la pista --> INICIO
            // Generar slots de horas desde la apertura hasta el cierre
            while (current.isBefore(court.getClosingTime().plusSeconds(1))) {
                bookingRepository.save(Booking.builder()
                        .court(court)
                        .startDateTime(day.atTime(current))
                        .endDateTime(day.atTime(current).plusMinutes(court.getSlotMinutes()))
                        .available(true) // disponible para reserva
                        .build());
                current = current.plusMinutes(court.getSlotMinutes());
            }
        }
    }
}
