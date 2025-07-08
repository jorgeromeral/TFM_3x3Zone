
package com.unir.ms_bookings.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne //1 pista varias reservas en diferentes horarios
    @JoinColumn(name = "court_id", nullable = false)
    private Court court;

    @Column(unique = true)
    private LocalDateTime startDateTime;

    @Column(unique = true)
    private LocalDateTime endDateTime;

    @Column
    private boolean available;
}
