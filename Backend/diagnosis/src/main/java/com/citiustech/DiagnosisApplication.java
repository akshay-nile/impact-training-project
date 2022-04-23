package com.citiustech;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.ApplicationContext;

import com.citiustech.models.Diagnosis;
import com.citiustech.repositories.DiagnosisRepository;

@EnableEurekaClient
@SpringBootApplication
public class DiagnosisApplication {
	private static void populateTableData(DiagnosisRepository repo) {
		List<Diagnosis> list = new ArrayList<>();
		
		try {
			Scanner sc = new Scanner(new File("diagnosis_data.txt"));
			sc.nextLine();
			while(sc.hasNextLine()) {
				String line = sc.nextLine();
				if(!line.matches("[A-Z]\\d+\\s[A-Z][a-z].*")) continue;
				Diagnosis d = new Diagnosis();
				d.setTitle(line.trim());
				list.add(d);
			}
			sc.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		repo.deleteAll();
		repo.saveAll(list);
	}

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(DiagnosisApplication.class, args);
//		populateTableData(context.getBean(DiagnosisRepository.class));
	}

}
