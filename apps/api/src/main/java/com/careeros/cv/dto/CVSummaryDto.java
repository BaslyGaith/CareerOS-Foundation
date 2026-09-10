package com.careeros.cv.dto;

import com.careeros.cv.enums.CVLanguage;
import com.careeros.cv.enums.CVStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record CVSummaryDto(
    UUID id,
    String name,
    String targetRole,
    String targetMarket,
    CVLanguage language,
    CVStatus status,
    String template,
    Integer version,
    UUID sourceJobId,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
