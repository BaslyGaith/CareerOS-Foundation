package com.careeros.document.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Career Vault document — stores uploaded files (PDFs, CVs, certificates, etc.)
 * with metadata. Actual file bytes stored on filesystem or blob storage path.
 */
@Entity
@Table(name = "documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private String originalFilename;

    @Column(nullable = false)
    private String contentType; // application/pdf, application/vnd.openxmlformats...

    @Column(nullable = false)
    private String storagePath; // relative path on disk

    private Long fileSizeBytes;

    private String documentType; // CV_UPLOAD, CERTIFICATE, DIPLOMA, COVER_LETTER, OTHER

    private String detectedLanguage; // e.g. "en", "fr"

    // Parsing status
    private String parseStatus; // PENDING, PARSED, FAILED

    @Column(columnDefinition = "TEXT")
    private String parsedText; // raw extracted text (for fact extraction pipeline)

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime uploadedAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
