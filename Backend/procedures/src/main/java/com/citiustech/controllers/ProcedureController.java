package com.citiustech.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.models.Procedure;
import com.citiustech.services.ProcedureService;

@CrossOrigin
@RestController
@RequestMapping("/procedures/api")
public class ProcedureController {

	@Autowired
	private ProcedureService procedureService;

	@GetMapping("/get-procedure-details")
	public ResponseEntity<?> getAllProcedureDetails(@RequestParam int start, @RequestParam int count) {
		List<Procedure> procedures = procedureService.getProcedureDetails(start, count);
		return new ResponseEntity<>(procedures, HttpStatus.OK);
	}

	@GetMapping("/procedureId/{procedureId}")
	public ResponseEntity<?> getProceduresDetailsById(@PathVariable int procedureId) {
		Procedure procedure = procedureService.getProcedureDetailsByProcedureId(procedureId);
		if (procedure != null) {
			return new ResponseEntity<>(procedure, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@PostMapping("/addProcedure")
	private ResponseEntity<?> addProcedure(@RequestBody Procedure procedure) {
		Procedure newProcedure = procedureService.addProcedure(procedure);
		return new ResponseEntity<>(newProcedure, HttpStatus.CREATED);
	}

	@DeleteMapping(value = "/deleteProcedureById/{id}")
	public ResponseEntity<?> deleteProcedureById(@PathVariable int id) {
		procedureService.deleteProcedureById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/addNewProcedure")
	public ResponseEntity<?> addNewProcedure(@RequestBody Procedure procedure) {
		Procedure newProcedure = procedureService.addNewProcedure(procedure);
		return new ResponseEntity<>(newProcedure, HttpStatus.OK);
	}
}