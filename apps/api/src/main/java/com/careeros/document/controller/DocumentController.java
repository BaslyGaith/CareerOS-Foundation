package com.careeros.document.controller;

import com.careeros.document.entity.Document;
import com.careeros.document.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentRepository documentRepository;

    @Value("${careeros.upload-dir:${user.home}/careeros-uploads}")
    private String uploadDir;

    /**
     * GET /api/documents?userId={userId}
     * Lists all documents for a user.
     */
    @GetMapping
    public ResponseEntity<List<Document>> listDocuments(@RequestParam UUID userId) {
        return ResponseEntity.ok(documentRepository.findByUserIdOrderByUploadedAtDesc(userId));
    }

    /**
     * POST /api/documents/upload?userId={userId}&type={type}
     * Uploads a file to the Career Vault. Supported: PDF, DOCX.
     * The file is stored locally and queued for text extraction.
     * User retains full control — no automatic fact creation without confirmation.
     */
    @PostMapping("/upload")
    public ResponseEntity<Document> uploadDocument(
            @RequestParam UUID userId,
            @RequestParam(defaultValue = "OTHER") String type,
            @RequestParam("file") MultipartFile file) throws IOException {

        // Validate file type
        String contentType = file.getContentType();
        if (contentType == null ||
            (!contentType.equals("application/pdf") &&
             !contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document") &&
             !contentType.equals("text/plain"))) {
            return ResponseEntity.badRequest().build();
        }

        // Store file on disk
        Path uploadPath = Paths.get(uploadDir).resolve(userId.toString());
        Files.createDirectories(uploadPath);
        String storedName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(storedName);
        Files.copy(file.getInputStream(), filePath);

        Document doc = Document.builder()
            .id(UUID.randomUUID())
            .userId(userId)
            .originalFilename(file.getOriginalFilename())
            .contentType(contentType)
            .storagePath(filePath.toString())
            .fileSizeBytes(file.getSize())
            .documentType(type)
            .parseStatus("PENDING")
            .build();

        return ResponseEntity.ok(documentRepository.save(doc));
    }

    /**
     * DELETE /api/documents/{id}
     * User explicitly deletes a document. Also removes the stored file.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable UUID id) {
        documentRepository.findById(id).ifPresent(doc -> {
            try {
                Files.deleteIfExists(Paths.get(doc.getStoragePath()));
            } catch (IOException e) {
                // Log but don't block deletion
            }
            documentRepository.delete(doc);
        });
        return ResponseEntity.noContent().build();
    }

    /**
     * GET /api/documents/{id}/status
     * Returns the parsing status of a document.
     */
    @GetMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> getParseStatus(@PathVariable UUID id) {
        return documentRepository.findById(id)
            .map(doc -> ResponseEntity.ok(Map.<String, Object>of(
                "id", doc.getId(),
                "parseStatus", doc.getParseStatus(),
                "filename", doc.getOriginalFilename()
            )))
            .orElse(ResponseEntity.notFound().build());
    }
}
