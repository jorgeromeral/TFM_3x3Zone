package com.unir.ms_users.model;

import lombok.*;

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
}
