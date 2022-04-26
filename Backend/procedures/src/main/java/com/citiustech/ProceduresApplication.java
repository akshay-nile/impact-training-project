package com.citiustech;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

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
		List<Procedure> list = new ArrayList<>();

		try {
			Scanner sc = new Scanner(new File("procedure_data.csv"));
			sc.nextLine();
			while (sc.hasNextLine()) {
				String line = sc.nextLine();
				int i = line.indexOf(",");
				if (i == -1)
					continue;
				String name = line.substring(0, i).trim();
				String desc = line.substring(i + 1).trim();
				Procedure p = new Procedure();
				p.setProcedureName(name);
				p.setDescription(desc);
				list.add(p);
			}
			sc.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		repo.deleteAll();
		repo.saveAll(list);
	}

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(ProceduresApplication.class, args);
//		populateTableData(context.getBean(ProcedureRepository.class));
	}

}
