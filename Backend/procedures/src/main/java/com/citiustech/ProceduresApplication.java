package com.citiustech;

import java.io.File;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.ApplicationContext;

import com.citiustech.models.Procedure;
import com.citiustech.repositories.ProcedureRepository;

@EnableEurekaClient
@SpringBootApplication
public class ProceduresApplication {

	private static void populateTableData(ProcedureRepository repo) {
		Set<Procedure> set = new HashSet<>();

		try {
			Scanner sc = new Scanner(new File("procedure_data.txt"));
			while (sc.hasNextLine()) {
				String[] words = sc.nextLine().split("\t");
				if (words.length != 2)
					continue;
				Procedure p = new Procedure();
				p.setProcedureName(words[0].trim());
				p.setDescription(words[1].trim());
				set.add(p);
			}
			sc.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		repo.deleteAll();
		repo.saveAll(set);
	}

	public static void main(String[] args) throws Exception {
		ApplicationContext context = SpringApplication.run(ProceduresApplication.class, args);
		ProcedureRepository repo = context.getBean(ProcedureRepository.class);
		if (repo.count() < 100) {
			System.out.println("POPULATING PROCEDURE TABLE FROM FILE...");
			populateTableData(repo);
		}
	}

}
