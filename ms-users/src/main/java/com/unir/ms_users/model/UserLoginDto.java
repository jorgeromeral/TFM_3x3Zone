package com.unir.ms_users.model;

import lombok.*;

// Se usa para dar formato a la respuesta del login
// para guardar info de sesión del usuario que se loggea
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserLoginDto {
    private Long id;
    private String name;
    private String email;
    private String location;
    private String role;
}
