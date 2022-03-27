package com.citiustech.hospital.contollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.hospital.models.constants.Language;
import com.citiustech.hospital.models.constants.Relation;
import com.citiustech.hospital.services.UtilityService;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UtilityController {

	@Autowired
	private UtilityService utilityService;
	
	@GetMapping("/enums/languages")
	public Language[] getLanguages() {
		return Language.values();
	}

	@GetMapping("/enums/relations")
	public Relation[] getRelations() {
		return Relation.values();
	}
	
	@PostMapping("/exists/email")
	public boolean emailExists(@RequestBody String email) {
		return utilityService.emailExists(email);
	}
	
	@PostMapping("/exists/phone")
	public boolean phoneExists(@RequestBody String phone) {
		return utilityService.phoneExists(phone);
	}
}
