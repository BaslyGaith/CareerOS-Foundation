CREATE TABLE cvs (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    profile_id UUID NOT NULL REFERENCES career_profiles(id),
    name VARCHAR(255) NOT NULL,
    target_role VARCHAR(255),
    target_market VARCHAR(255),
    language VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'DRAFT',
    template VARCHAR(100),
    professional_summary TEXT,
    what_i_bring TEXT,
    core_skills TEXT,
    experience_section TEXT,
    education_section TEXT,
    source_job_id UUID,
    used_fact_ids TEXT,
    version INT DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE documents (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    original_filename VARCHAR(500) NOT NULL,
    content_type VARCHAR(255) NOT NULL,
    storage_path VARCHAR(1000) NOT NULL,
    file_size_bytes BIGINT,
    document_type VARCHAR(100),
    detected_language VARCHAR(10),
    parse_status VARCHAR(50) DEFAULT 'PENDING',
    parsed_text TEXT,
    uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
