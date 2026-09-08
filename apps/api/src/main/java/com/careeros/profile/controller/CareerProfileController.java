package com.careeros.profile.controller;

import com.careeros.profile.entity.CareerFact;
import com.careeros.profile.entity.CareerProfile;
import com.careeros.profile.enums.FactSource;
import com.careeros.profile.repository.CareerFactRepository;
import com.careeros.profile.repository.CareerProfileRepository;
import com.careeros.user.entity.User;
import com.careeros.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class CareerProfileController {

    private final CareerProfileRepository profileRepository;
    private final CareerFactRepository factRepository;
    private final UserRepository userRepository;

    /**
     * GET /api/profile/{userId}
     * Returns the Career Profile for the given user.
     * In Sprint 1, userId is passed directly.
     * Sprint 5 will replace this with authenticated user extraction.
     */
    @GetMapping("/{userId}")
    public ResponseEntity<CareerProfile> getProfile(@PathVariable UUID userId) {
        return profileRepository.findByUserId(userId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    /**
     * GET /api/profile/{userId}/facts
     * Returns all Career Facts for the given user's profile.
     */
    @GetMapping("/{userId}/facts")
    public ResponseEntity<List<CareerFact>> getFacts(@PathVariable UUID userId) {
        Optional<CareerProfile> profile = profileRepository.findByUserId(userId);
        if (profile.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(factRepository.findByProfileId(profile.get().getId()));
    }

    /**
     * POST /api/profile/{userId}/facts/{factId}/verify
     * Marks a fact as USER_CONFIRMED (verified by the user).
     * This is a critical human-in-the-loop action — no fact becomes trusted without user action.
     */
    @PostMapping("/{userId}/facts/{factId}/verify")
    public ResponseEntity<CareerFact> verifyFact(@PathVariable UUID userId, @PathVariable UUID factId) {
        return factRepository.findById(factId).map(fact -> {
            fact.setVerified(true);
            fact.setSource(FactSource.USER_CONFIRMED);
            return ResponseEntity.ok(factRepository.save(fact));
        }).orElse(ResponseEntity.notFound().build());
    }

    /**
     * POST /api/profile/seed
     * Sprint 1 only: Seeds a demo user + profile for local development.
     * Will be removed in Sprint 5 when real auth is wired.
     */
    @PostMapping("/seed")
    public ResponseEntity<Map<String, Object>> seedDemoProfile() {
        // Idempotent: only create if not already exists
        User user = userRepository.findByEmail("demo@careeros.dev").orElseGet(() -> {
            User newUser = User.builder()
                .id(UUID.randomUUID())
                .email("demo@careeros.dev")
                .firstName("Gaith")
                .lastName("Basly")
                .build();
            return userRepository.save(newUser);
        });

        CareerProfile profile = profileRepository.findByUserId(user.getId()).orElseGet(() -> {
            CareerProfile newProfile = CareerProfile.builder()
                .id(UUID.randomUUID())
                .user(user)
                .professionalSummary(
                    "Data Analyst and Software Engineer with experience in building scalable backend systems " +
                    "and analytical dashboards. Specialized in Java, Spring Boot, React, and Data Analytics."
                )
                .targetRoles("Data Analyst, Java Developer, Full Stack Developer")
                .preferredLocations("Berlin, Paris, Remote")
                .remotePreference("HYBRID")
                .availability("Immediately")
                .build();
            return profileRepository.save(newProfile);
        });

        // Seed a few verified facts if none exist
        List<CareerFact> existing = factRepository.findByProfileId(profile.getId());
        if (existing.isEmpty()) {
            List<CareerFact> facts = List.of(
                CareerFact.builder().id(UUID.randomUUID()).profileId(profile.getId())
                    .factType("SKILL").description("Java 17+ backend development with Spring Boot")
                    .source(FactSource.USER_CONFIRMED).isVerified(true).build(),
                CareerFact.builder().id(UUID.randomUUID()).profileId(profile.getId())
                    .factType("SKILL").description("Data Analytics with Power BI and SQL")
                    .source(FactSource.USER_CONFIRMED).isVerified(true).build(),
                CareerFact.builder().id(UUID.randomUUID()).profileId(profile.getId())
                    .factType("SKILL").description("React and TypeScript frontend development")
                    .source(FactSource.USER_ENTERED).isVerified(false).build(),
                CareerFact.builder().id(UUID.randomUUID()).profileId(profile.getId())
                    .factType("EXPERIENCE").description("4+ years of professional software development experience")
                    .source(FactSource.USER_CONFIRMED).isVerified(true).build()
            );
            factRepository.saveAll(facts);
        }

        return ResponseEntity.ok(Map.of(
            "userId", user.getId(),
            "profileId", profile.getId(),
            "message", "Demo profile ready"
        ));
    }
}
