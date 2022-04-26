package com.citiustech;

import java.io.File;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.ApplicationContext;

import com.citiustech.models.Allergy;
import com.citiustech.repositories.AllergyRepository;

@EnableEurekaClient
@SpringBootApplication
public class AllergyApplication {

	private static void populateTableData(AllergyRepository allergyRepo) {
		Set<Allergy> set = new HashSet<>();

		try {
			Scanner sc = new Scanner(new File("allergy_data.txt"));
			while (sc.hasNextLine()) {
				String[] words = sc.nextLine().split("\t");
				if (words.length != 2)
					continue;
				Allergy allergy = new Allergy();
				allergy.setAllergyType(words[0].trim());
				allergy.setAllergyName(words[1].trim());
				set.add(allergy);
			}
			sc.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		allergyRepo.deleteAll();
		allergyRepo.saveAll(set);
	}

	public static void main(String[] args) throws Exception {
		ApplicationContext context = SpringApplication.run(AllergyApplication.class, args);
		AllergyRepository repo = context.getBean(AllergyRepository.class);
		if (repo.count() < 100) {
			System.out.println("POPULATING ALLERGY TABLE FROM FILE...");
			populateTableData(repo);
		}
	}

}
