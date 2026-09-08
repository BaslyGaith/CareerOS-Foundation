package com.careeros.job.controller;

import com.careeros.job.entity.JobOpportunity;
import com.careeros.job.repository.JobOpportunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/opportunities")
@RequiredArgsConstructor
public class JobOpportunityController {

    private final JobOpportunityRepository opportunityRepository;

    @GetMapping
    public ResponseEntity<List<JobOpportunity>> listOpportunities() {
        return ResponseEntity.ok(opportunityRepository.findAllByOrderByMatchScoreDesc());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobOpportunity> getOpportunity(@PathVariable UUID id) {
        return opportunityRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    /**
     * POST /api/opportunities/seed
     * Sprint 1 only: Seeds mock opportunities for local development.
     */
    @PostMapping("/seed")
    public ResponseEntity<Map<String, Object>> seedOpportunities() {
        if (opportunityRepository.count() > 0) {
            return ResponseEntity.ok(Map.of("message", "Opportunities already seeded", "count", opportunityRepository.count()));
        }

        List<JobOpportunity> mockJobs = List.of(
            JobOpportunity.builder()
                .id(UUID.randomUUID())
                .title("Java Developer")
                .company("Example GmbH")
                .location("Berlin, Germany")
                .description("We are looking for a passionate Java Developer to join our growing backend team. " +
                    "You will work with Java 17+, Spring Boot, and PostgreSQL to build scalable APIs.")
                .source("MOCK")
                .url("https://example.com/jobs/java-dev")
                .publicationDate(LocalDateTime.now().minusDays(2))
                .matchScore(94)
                .status("NEW")
                .build(),
            JobOpportunity.builder()
                .id(UUID.randomUUID())
                .title("Data Analyst")
                .company("ABC France")
                .location("Paris, France")
                .description("Seeking a Data Analyst with strong SQL and Power BI skills to support business intelligence " +
                    "reporting and data-driven decisions across the organization.")
                .source("MOCK")
                .url("https://example.com/jobs/data-analyst")
                .publicationDate(LocalDateTime.now().minusDays(6))
                .matchScore(87)
                .status("APPLIED")
                .build(),
            JobOpportunity.builder()
                .id(UUID.randomUUID())
                .title("Full Stack Engineer")
                .company("TechCorp Berlin")
                .location("Berlin, Germany (Remote)")
                .description("Join our cross-functional team building modern web applications with React and Spring Boot. " +
                    "Strong TypeScript skills required.")
                .source("MOCK")
                .url("https://example.com/jobs/fullstack")
                .publicationDate(LocalDateTime.now().minusDays(1))
                .matchScore(81)
                .status("NEW")
                .build()
        );

        opportunityRepository.saveAll(mockJobs);
        return ResponseEntity.ok(Map.of("message", "Mock opportunities seeded", "count", mockJobs.size()));
    }
}
