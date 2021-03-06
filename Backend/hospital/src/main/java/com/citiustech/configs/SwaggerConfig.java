package com.citiustech.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfig {

	@Bean
	public Docket getDocket() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("com.citiustech.hospital")).build().apiInfo(setDetails());
	}

	public ApiInfo setDetails() {
		ApiInfoBuilder build = new ApiInfoBuilder();
		return build.title("Membership-Service").version("1.0")
				.description("Membership service for registering and other features for the user").license("CTHospital")
				.build();
	}
}