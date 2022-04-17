package com.citiustech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class DiagnosisApplication {

	public static void main(String[] args) {
		SpringApplication.run(DiagnosisApplication.class, args);
	}

}