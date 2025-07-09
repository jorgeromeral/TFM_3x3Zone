package com.unir.ms_users.model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String name;

    @Column
    private String surname;

    @Column
    private String location;

    @Column(unique = true)
    private String email;

    @Column
    private String password;

    @Column
    private Integer level;

    @Column
    @Enumerated(EnumType.STRING)
    private Role role;
}