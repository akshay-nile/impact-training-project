package com.citiustech;

import java.io.File;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

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
		Set<Medication> set = new HashSet<>();

		try {
			Scanner sc = new Scanner(new File("medication_data.txt"));
			sc.nextLine();
			while (sc.hasNextLine()) {
				String[] words = sc.nextLine().split("\t");
				if (words.length != 3)
					continue;
				Medication med = new Medication();
				med.setMedicationName(words[0].trim());
				med.setDosage(words[1].trim());
				med.setDescription(words[2].trim());
				set.add(med);
			}
			sc.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		repo.deleteAll();
		repo.saveAll(set);
	}

	public static void main(String[] args) throws Exception {
		ApplicationContext context = SpringApplication.run(MedicationsApplication.class, args);
		MedicationRepository repo = context.getBean(MedicationRepository.class);
		if (repo.count() < 100) {
			System.out.println("POPULATING MEDICATION TABLE FROM FILE...");
			populateTableData(repo);
		}
	}

}
