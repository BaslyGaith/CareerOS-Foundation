package com.careeros.cv.dto;

import com.careeros.cv.enums.CVLanguage;

import java.util.UUID;

public record CreateCVRequest(
    UUID userId,
    UUID profileId,
    String name,
    String targetRole,
    String targetMarket,
    CVLanguage language,
    String template
) {}
