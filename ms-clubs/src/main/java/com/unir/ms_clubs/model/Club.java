package com.unir.ms_clubs.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "clubs")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column()
    private String name;

    @Column
    private String location; // city

    @Column(unique = true)
    private String address;

    @Column
    private String phone;

    @Column
    private String email;

    @Column
    private Long ownerId; // Id del usuario (role=club) que es el dueño del club
}
