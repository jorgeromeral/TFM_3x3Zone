package com.unir.ms_matches.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "matches")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private int minLevel;

    @Column
    private String location;

    @Column
    private LocalDateTime dateTime;

    @Column
    @Enumerated(EnumType.STRING)
    private MatchType matchType; // "_3x3" o "_5x5"

    @Column
    @Enumerated(EnumType.STRING)
    private Status status; // "OPEN", "READY", "FULL"

    @Column
    private int numPlayers;

    @Column
    private int minPlayers; // Número mínimo de jugadores para iniciar el partido

    @Column
    private int maxPlayers; // Número máximo de jugadores permitidos en el partido

    @ElementCollection // Crea una tabla secundaria para almacenar la lista de IDs
    private List<Long> playersId; // IDs de los jugadores
}
