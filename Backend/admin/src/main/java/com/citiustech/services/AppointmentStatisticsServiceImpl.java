package com.citiustech.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.AppointmentStatistics;
import com.citiustech.repositories.AppointmentStatisticsRepository;

@Service
public class AppointmentStatisticsServiceImpl implements AppointmentStatisticsService {

	@Autowired
	private AppointmentStatisticsRepository appointmentStatsRepo;

	public AppointmentStatistics saveStatistics(AppointmentStatistics apptStats) {
		return appointmentStatsRepo.save(apptStats);
	}

}
