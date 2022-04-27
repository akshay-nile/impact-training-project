package com.citiustech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.models.AppointmentStatistics;

@Repository
public interface AppointmentStatisticsRepository extends JpaRepository<AppointmentStatistics, String>{

}
