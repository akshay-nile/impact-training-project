package com.citiustech;

import java.io.File;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

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
		Set<Diagnosis> set = new HashSet<>();

		try {
			Scanner sc = new Scanner(new File("diagnosis_data.txt"));
			while (sc.hasNextLine()) {
				String line = sc.nextLine();
				Diagnosis d = new Diagnosis();
				d.setTitle(line.trim());
				set.add(d);
			}
			sc.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		repo.deleteAll();
		repo.saveAll(set);
	}

	public static void main(String[] args) throws Exception {
		ApplicationContext context = SpringApplication.run(DiagnosisApplication.class, args);
		DiagnosisRepository repo = context.getBean(DiagnosisRepository.class);
		if (repo.count() < 100) {
			System.out.println("POPULATING DIAGNOSIS TABLE FORM FILE...");
			populateTableData(repo);
		}
	}

}
