package com.citiustech.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Allergy;
import com.citiustech.repositories.AllergyRepository;

@Service
public class AllergyServiceImpl implements AllergyService {

	@Autowired
	private AllergyRepository allergyRepo;

	@Override
	public List<Allergy> getAllergyDetails() {
		return (List<Allergy>) allergyRepo.findAll();
	}
	
	@Override
	public void deleteAllergyById(int id) {
		allergyRepo.deleteById(id);
	}

	@Override
	public Allergy addNewAllergy(Allergy allergy) {
		return allergyRepo.save(allergy);
	}

	@Override
	public Map<String, List<String>> getNamesAndTypes() {
		List<Allergy> allergies = (List<Allergy>) allergyRepo.findAll();
		Map<String, List<Allergy>> typeAndAllergies = allergies.stream()
				.collect(Collectors.groupingBy(Allergy::getAllergyType));
		Map<String, List<String>> typeAndNames = new HashMap<>();
		for (String key : typeAndAllergies.keySet()) {
			typeAndNames.put(key, typeAndAllergies.get(key).stream().map(Allergy::getAllergyName).distinct()
					.collect(Collectors.toList()));
		}
		return typeAndNames;
	}

}
