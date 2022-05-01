package com.citiustech.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
@ComponentScan(value = "com.citiustech")
public class Configurations {

	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}
}
