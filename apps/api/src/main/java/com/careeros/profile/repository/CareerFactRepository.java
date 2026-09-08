package com.careeros.profile.repository;

import com.careeros.profile.entity.CareerFact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CareerFactRepository extends JpaRepository<CareerFact, UUID> {
    List<CareerFact> findByProfileId(UUID profileId);
    List<CareerFact> findByProfileIdAndIsVerified(UUID profileId, boolean isVerified);
}
