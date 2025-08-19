package com.unir.ms_clubs.service;

import com.unir.ms_clubs.model.Club;
import com.unir.ms_clubs.model.Court;
import com.unir.ms_clubs.model.CourtBooking;
import com.unir.ms_clubs.repository.ClubRepository;
import com.unir.ms_clubs.repository.CourtRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourtService {

    private final CourtRepository courtRepository;
    private final ClubRepository clubRepository;

    // Usamos RestTemplate para realizar peticiones HTTP al servicio Booking para generar slots de reservas
    private final RestTemplate restTemplate = new RestTemplate();
    private final String bookingsServiceUrl = "http://ms-bookings:8082/api/bookings";

    // En base al club Id filtra las pistas ue pertenezcan a ese ID del club
    public List<Court> getByClub(Long clubId) {
        return clubRepository.findById(clubId)
                .map(courtRepository::findByClub)
                .orElse(List.of()); // lista vacia
    }

    public Court create(Court court, Long clubId) {
        // TODO: Nº de días NO debe ser fijo
        generateSlots(court, 7);// Genera slots para 7 días
        // Asignar el club a la pista antes de guardarla
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new RuntimeException("Club not found with id: " + clubId));
        court.setClub(club);
        return courtRepository.save(court);
    }

    public boolean update(Long id, Court data) {
        Optional<Court> optionalCourt = courtRepository.findById(id);
        if (optionalCourt.isPresent()) {
            Court court = optionalCourt.get();
            if (data.getName() != null) court.setName(data.getName());
            if (data.getCourtType() != null) court.setCourtType(data.getCourtType());
            if (data.getOpeningTime() != null) court.setOpeningTime(data.getOpeningTime());
            if (data.getClosingTime() != null) court.setClosingTime(data.getClosingTime());
            if (data.getSlotMinutes() > 0) court.setSlotMinutes(data.getSlotMinutes());
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
                CourtBooking booking = CourtBooking.builder()
                    .courtId(court.getId())
                    .startDateTime(day.atTime(current))
                    .endDateTime(day.atTime(current).plusMinutes(court.getSlotMinutes()))
                    .available(true) // disponible para reserva
                    .build();

                // Enviar la reserva al servicio de bookings
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                HttpEntity<CourtBooking> request = new HttpEntity<>(booking, headers); // Se establece el body del post

                ResponseEntity<String> response = restTemplate.postForEntity(bookingsServiceUrl, request, String.class);
                if (!response.getStatusCode().is2xxSuccessful()) {
                    throw new RuntimeException("Error al crear el booking en ms-bookings");
                }

                current = current.plusMinutes(court.getSlotMinutes());
            }
        }
    }
}
