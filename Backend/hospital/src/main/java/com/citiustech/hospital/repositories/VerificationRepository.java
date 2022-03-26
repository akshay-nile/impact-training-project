package com.citiustech.hospital.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.hospital.models.templates.Verification;

@Repository
public interface VerificationRepository extends JpaRepository<Verification, String> {

}
