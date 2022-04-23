package com.citiustech;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.ApplicationContext;

import com.citiustech.models.Medication;
import com.citiustech.repositories.MedicationRepository;
@EnableEurekaClient
@SpringBootApplication
public class MedicationsApplication {
	
	private static void populateTableData(MedicationRepository repo) {
		List<Medication> list = new ArrayList<>();
		
		try {
			Scanner sc = new Scanner(new File("medication_data.csv"));
			sc.nextLine();
			while(sc.hasNextLine()) {
				List<String> words = Arrays.stream(sc.nextLine().split(","))
						.map(String::trim).collect(Collectors.toList());
				
				if(words.get(2).length() == 0 || words.get(3).length() == 0 || words.get(5).length() == 0) continue;
				if(words.get(2) == "0" || words.get(3) == "0" || words.get(5) == "0") continue;
				
				Medication med = new Medication();
				med.setMedicationName(words.get(5));
				med.setDosage(words.get(3));
				med.setDescription(words.get(2));
				list.add(med);
			}
			sc.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		repo.deleteAll();
		repo.saveAll(list);
	}
	
	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(MedicationsApplication.class, args);
//		populateTableData(context.getBean(MedicationRepository.class));
	}

}
