package com.careeros.document.repository;

import com.careeros.document.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DocumentRepository extends JpaRepository<Document, UUID> {
    List<Document> findByUserIdOrderByUploadedAtDesc(UUID userId);
    List<Document> findByUserIdAndDocumentType(UUID userId, String documentType);
    List<Document> findByUserIdAndParseStatus(UUID userId, String parseStatus);
}
