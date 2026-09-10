package com.careeros.cv.repository;

import com.careeros.cv.entity.CV;
import com.careeros.cv.enums.CVStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CVRepository extends JpaRepository<CV, UUID> {
    List<CV> findByUserIdOrderByCreatedAtDesc(UUID userId);
    List<CV> findByUserIdAndStatus(UUID userId, CVStatus status);
    List<CV> findByUserIdAndLanguage(UUID userId, String language);
}
