package com.careeros.profile.repository;

import com.careeros.profile.entity.CareerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CareerProfileRepository extends JpaRepository<CareerProfile, UUID> {
    Optional<CareerProfile> findByUserId(UUID userId);
}
