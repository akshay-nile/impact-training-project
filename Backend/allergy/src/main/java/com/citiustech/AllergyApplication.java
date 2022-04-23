package com.citiustech;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

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
		List<Allergy> list = new ArrayList<>();
		
		try {
			Scanner sc = new Scanner(new File("allergy_data.csv"));
			sc.nextLine();
			while(sc.hasNextLine()) {
				String[] words = sc.nextLine().split(",");
				Allergy allergy = new Allergy();
				allergy.setAllergyId(words[0].trim());
				allergy.setAllergyType(words[1].trim());
				allergy.setAllergyName(words[2].trim());
				allergy.setAllergySource(words[3].trim());
				allergy.setAllergySequence(words[4].trim());
				allergy.setAllerginicity(words[5].trim());
				list.add(allergy);
			}
			sc.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		allergyRepo.deleteAll();
		allergyRepo.saveAll(list);
	}

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(AllergyApplication.class, args);
//		populateTableData(context.getBean(AllergyRepository.class));
	}

}
