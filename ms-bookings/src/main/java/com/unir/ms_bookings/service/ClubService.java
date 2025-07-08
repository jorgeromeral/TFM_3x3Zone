package com.unir.ms_bookings.service;

import com.unir.ms_bookings.model.Club;
import com.unir.ms_bookings.repository.ClubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository repository;

    public List<Club> getByLocation(String location) {
        return repository.findByLocation(location);
    }

    public Club create(Club club) {
        return repository.save(club);
    }

    public boolean update(Long id, Club data) {
        Optional<Club> optionalClub = repository.findById(id);
        if (optionalClub.isPresent()) {
            Club club = optionalClub.get();
            club.setName(data.getName());
            club.setLocation(data.getLocation());
            club.setAddress(data.getAddress());
            club.setPhone(data.getPhone());
            club.setEmail(data.getEmail());
            repository.save(club);
            return true;
        }
        return false;
    }

    public boolean delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}

