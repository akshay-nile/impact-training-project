package com.citiustech.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.models.Procedure;
import com.citiustech.services.ProcedureService;

@CrossOrigin
@RestController
@RequestMapping("/procedure/api")
public class ProcedureController {
	
	@Autowired
	private ProcedureService procedureService;
	
	@GetMapping("/getAllProcedureDetails")
	public ResponseEntity<?> getAllProcedureDetails() {
		List<Procedure> procedures = procedureService.getProcedureDetails();
		if (procedures.size() != 0) {
			return new ResponseEntity<>(procedures, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@GetMapping("/procedureId/{procedureId}")
	public ResponseEntity<?> getProceduresDetailsById(@PathVariable int procedureId) {
		Procedure procedure = procedureService.getProcedureDetailsByProcedureId(procedureId);
		if (procedure != null) {
			return new ResponseEntity<>(procedure, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
	@GetMapping("/procedureByAptId/{aptId}")
	public ResponseEntity<?> getProcedureByAptId(@PathVariable int aptId) {
		List<Procedure> procedureList = procedureService.getProcedureByAptId(aptId);
		if (procedureList.size() != 0) {
			return new ResponseEntity<>(procedureList, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
}
