package com.citiustech.services;

import java.util.List;
import java.util.Map;

import com.citiustech.models.Allergy;


public interface AllergyService {

	public List<Allergy> getAllergyDetails();

	public Allergy getAllergyDetailsById(int allergyId);

	public Map<String, List<String>> getNamesAndTypes();

	public void deleteAllergyById(int id);

	public Allergy addNewAllergy(Allergy allergy);

}
