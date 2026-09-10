package com.careeros.cv.controller;

import com.careeros.cv.dto.CreateCVRequest;
import com.careeros.cv.dto.CVSummaryDto;
import com.careeros.cv.entity.CV;
import com.careeros.cv.enums.CVStatus;
import com.careeros.cv.service.CVService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/cvs")
@RequiredArgsConstructor
public class CVController {

    private final CVService cvService;

    /**
     * GET /api/cvs?userId={userId}
     * Lists all CVs for a user as summary cards (without heavy text fields).
     */
    @GetMapping
    public ResponseEntity<List<CVSummaryDto>> listCVs(@RequestParam UUID userId) {
        return ResponseEntity.ok(cvService.listByUser(userId));
    }

    /**
     * GET /api/cvs/{id}
     * Returns full CV including all content sections.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CV> getCV(@PathVariable UUID id) {
        return cvService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    /**
     * POST /api/cvs
     * Creates a new CV draft. Content is generated from verified CareerFacts only.
     */
    @PostMapping
    public ResponseEntity<CV> createCV(@RequestBody CreateCVRequest req) {
        return ResponseEntity.ok(cvService.createCV(req));
    }

    /**
     * POST /api/cvs/{id}/duplicate
     * Duplicates an existing CV so user can create a variant.
     */
    @PostMapping("/{id}/duplicate")
    public ResponseEntity<CV> duplicateCV(@PathVariable UUID id) {
        return ResponseEntity.ok(cvService.duplicateCV(id));
    }

    /**
     * PATCH /api/cvs/{id}/status
     * User explicitly activates or archives a CV.
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<CV> updateStatus(@PathVariable UUID id, @RequestParam CVStatus status) {
        return ResponseEntity.ok(cvService.updateStatus(id, status));
    }

    /**
     * DELETE /api/cvs/{id}
     * User explicitly deletes a CV. Requires user action (not automated).
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCV(@PathVariable UUID id) {
        cvService.deleteCV(id);
        return ResponseEntity.noContent().build();
    }
}
