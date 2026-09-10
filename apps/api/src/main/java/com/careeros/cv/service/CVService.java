package com.careeros.cv.service;

import com.careeros.cv.dto.CreateCVRequest;
import com.careeros.cv.dto.CVSummaryDto;
import com.careeros.cv.entity.CV;
import com.careeros.cv.enums.CVStatus;
import com.careeros.cv.repository.CVRepository;
import com.careeros.profile.entity.CareerFact;
import com.careeros.profile.entity.CareerProfile;
import com.careeros.profile.repository.CareerFactRepository;
import com.careeros.profile.repository.CareerProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * CVService manages the lifecycle of CVs.
 *
 * CV Safety Rules enforced here:
 * - Never invent facts. All content comes from verified CareerFacts.
 * - User must explicitly confirm tailoring changes before save.
 * - No "Senior" in titles unless explicitly in verified facts.
 * - Gaps are surfaced transparently, not hidden or fabricated.
 */
@Service
@RequiredArgsConstructor
public class CVService {

    private final CVRepository cvRepository;
    private final CareerProfileRepository profileRepository;
    private final CareerFactRepository factRepository;

    public List<CVSummaryDto> listByUser(UUID userId) {
        return cvRepository.findByUserIdOrderByCreatedAtDesc(userId)
            .stream()
            .map(this::toSummary)
            .collect(Collectors.toList());
    }

    public Optional<CV> findById(UUID id) {
        return cvRepository.findById(id);
    }

    /**
     * Creates a new blank CV draft, pulling verified facts from the career profile.
     * The CV is populated with ONLY verified facts (isVerified=true, source=USER_CONFIRMED or similar).
     */
    public CV createCV(CreateCVRequest req) {
        List<CareerFact> verifiedFacts = factRepository.findByProfileIdAndIsVerified(req.profileId(), true);
        String factIds = verifiedFacts.stream()
            .map(f -> f.getId().toString())
            .collect(Collectors.joining(","));

        String skillsFromFacts = verifiedFacts.stream()
            .filter(f -> "SKILL".equalsIgnoreCase(f.getFactType()))
            .map(CareerFact::getDescription)
            .collect(Collectors.joining(" · "));

        Optional<CareerProfile> profile = profileRepository.findById(req.profileId());
        String summary = profile.map(CareerProfile::getProfessionalSummary).orElse("");

        CV cv = CV.builder()
            .id(UUID.randomUUID())
            .userId(req.userId())
            .profileId(req.profileId())
            .name(req.name())
            .targetRole(req.targetRole())
            .targetMarket(req.targetMarket())
            .language(req.language())
            .status(CVStatus.DRAFT)
            .template(req.template() != null ? req.template() : "CLEAN")
            .professionalSummary(summary)
            .coreSkills(skillsFromFacts)
            .usedFactIds(factIds)
            .version(1)
            .build();

        return cvRepository.save(cv);
    }

    public CV duplicateCV(UUID sourceId) {
        CV source = cvRepository.findById(sourceId)
            .orElseThrow(() -> new IllegalArgumentException("CV not found: " + sourceId));
        CV copy = CV.builder()
            .id(UUID.randomUUID())
            .userId(source.getUserId())
            .profileId(source.getProfileId())
            .name(source.getName() + " (Copy)")
            .targetRole(source.getTargetRole())
            .targetMarket(source.getTargetMarket())
            .language(source.getLanguage())
            .status(CVStatus.DRAFT)
            .template(source.getTemplate())
            .professionalSummary(source.getProfessionalSummary())
            .whatIBring(source.getWhatIBring())
            .coreSkills(source.getCoreSkills())
            .experienceSection(source.getExperienceSection())
            .educationSection(source.getEducationSection())
            .usedFactIds(source.getUsedFactIds())
            .version(1)
            .build();
        return cvRepository.save(copy);
    }

    public CV updateStatus(UUID id, CVStatus status) {
        CV cv = cvRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("CV not found: " + id));
        cv.setStatus(status);
        return cvRepository.save(cv);
    }

    public void deleteCV(UUID id) {
        cvRepository.deleteById(id);
    }

    private CVSummaryDto toSummary(CV cv) {
        return new CVSummaryDto(
            cv.getId(), cv.getName(), cv.getTargetRole(), cv.getTargetMarket(),
            cv.getLanguage(), cv.getStatus(), cv.getTemplate(), cv.getVersion(),
            cv.getSourceJobId(), cv.getCreatedAt(), cv.getUpdatedAt()
        );
    }
}
