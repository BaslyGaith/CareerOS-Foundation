package com.careeros.job.repository;

import com.careeros.job.entity.JobOpportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface JobOpportunityRepository extends JpaRepository<JobOpportunity, UUID> {
    List<JobOpportunity> findByStatusOrderByMatchScoreDesc(String status);
    List<JobOpportunity> findAllByOrderByMatchScoreDesc();
}
