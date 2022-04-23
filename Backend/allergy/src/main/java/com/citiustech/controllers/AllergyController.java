package com.citiustech.controllers;

import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.models.Allergy;
import com.citiustech.services.AllergyService;

@CrossOrigin
@RestController
@RequestMapping("/allergy/api")
public class AllergyController {

	@Autowired
	private AllergyService allergyService;

	@GetMapping("/getAllAllergyDetails")
	public ResponseEntity<?> getAllAllergyDetails() {
		List<Allergy> allergies = allergyService.getAllergyDetails();
		if (allergies.size() != 0) {
			return new ResponseEntity<>(allergies, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@GetMapping("/allergyId/{allergyId}")
	public ResponseEntity<?> getAllAllergyDetailsById(@PathVariable int allergyId) {
		Allergy allergy = allergyService.getAllergyDetailsById(allergyId);
		if (allergy != null) {
			return new ResponseEntity<>(allergy, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@GetMapping({ "/names-and-types", "/types-and-names" })
	public ResponseEntity<?> getNamesAndTypes() {
		Map<String, List<String>> typesAndNames = allergyService.getNamesAndTypes();
		return new ResponseEntity<>(typesAndNames, HttpStatus.OK);
	}

	@DeleteMapping("/deleteAllergyById/{id}")
	public ResponseEntity<?> deleteAllergyById(@PathVariable int id) {
		allergyService.deleteAllergyById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/addNewAllergy")
	public ResponseEntity<?> addNewAllergy(@RequestBody Allergy allergy) {
		Allergy newAllergy = allergyService.addNewAllergy(allergy);
		return new ResponseEntity<>(newAllergy, HttpStatus.OK);
	}

}
