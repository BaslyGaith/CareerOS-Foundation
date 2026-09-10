package com.careeros.cv.entity;

import com.careeros.cv.enums.CVLanguage;
import com.careeros.cv.enums.CVStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * A CV is a specific tailored version of a Career Profile, targeting a role in a language.
 * Multiple CVs can exist per user (e.g., "Data Analyst — English", "Java Dev — French").
 * The CV Agent generates content only from verified CareerFacts.
 */
@Entity
@Table(name = "cvs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CV {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "profile_id", nullable = false)
    private UUID profileId;

    @Column(nullable = false)
    private String name; // e.g. "Data Analyst — English"

    private String targetRole;

    private String targetMarket; // e.g. "Germany", "France"

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CVLanguage language;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CVStatus status;

    private String template; // e.g. "CLEAN", "MODERN"

    @Column(columnDefinition = "TEXT")
    private String professionalSummary;

    @Column(columnDefinition = "TEXT")
    private String whatIBring; // "What I bring to this role" section

    @Column(columnDefinition = "TEXT")
    private String coreSkills; // comma-separated verified skills

    @Column(columnDefinition = "TEXT")
    private String experienceSection; // JSON serialized sections

    @Column(columnDefinition = "TEXT")
    private String educationSection;

    @Column(name = "source_job_id")
    private UUID sourceJobId; // If tailored to a specific job

    // CV Safety: track which facts were used to generate this CV
    @Column(columnDefinition = "TEXT")
    private String usedFactIds; // JSON array of CareerFact IDs

    private Integer version;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
