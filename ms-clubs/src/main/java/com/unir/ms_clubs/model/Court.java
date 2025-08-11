
package com.unir.ms_bookings.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Table(name = "courts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Court {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "club_id", nullable = false)
    private Club club;

    @Column
    private String name;

    @Column
    @Enumerated(EnumType.STRING)
    private CourtType courtType;

    @Column(nullable = false)
    private LocalTime openingTime; // Ej. 10:00

    @Column(nullable = false)
    private LocalTime closingTime; // Ej. 22:00

    @Column(nullable = false)
    private int slotMinutes;

}
