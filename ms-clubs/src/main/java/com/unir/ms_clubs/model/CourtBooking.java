package com.unir.ms_clubs.model;

import lombok.*;

import java.time.LocalDateTime;

// Esta clase es para crear un objeto tipo Booking para pder pasarlo a otro microservicio
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CourtBooking {
    private Long courtId;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private boolean available;
}
