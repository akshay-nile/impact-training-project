package com.citiustech.services;

import com.citiustech.models.Appointment;
import com.citiustech.models.VisitReport;

public interface VisitService {

	public VisitReport getVisitReport(Appointment apt);

}
