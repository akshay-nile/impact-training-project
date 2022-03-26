package com.citiustech.hospital.contollers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.hospital.models.constants.Language;
import com.citiustech.hospital.models.constants.Relation;

@CrossOrigin
@RestController
@RequestMapping("/api/enums")
public class EnumController {

	@GetMapping("/languages")
	public Language[] getLanguages() {
		return Language.values();
	}

	@GetMapping("/relations")
	public Relation[] getRelations() {
		return Relation.values();
	}

}
