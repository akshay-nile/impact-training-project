package com.citiustech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.models.Verification;

@Repository
public interface VerificationRepository extends JpaRepository<Verification, String> {

}
