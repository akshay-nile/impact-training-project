package com.citiustech;

import java.time.LocalDate;
import java.time.Month;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.citiustech.filters.PatientFilter;
import com.citiustech.models.Employee;
import com.citiustech.models.constants.Role;
import com.citiustech.models.constants.Status;
import com.citiustech.models.constants.Title;
import com.citiustech.repositories.EmployeeRepository;

@EnableEurekaClient
@SpringBootApplication
public class HospitalApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(HospitalApplication.class, args);
		EmployeeRepository repo = context.getBean(EmployeeRepository.class);

		if (repo.findByEmail("thirupathi.vemireddy@citiustech.com") == null) {
			Employee admin = new Employee();
			admin.setTitle(Title.Mr);
			admin.setBirthdate(LocalDate.of(2000, Month.JANUARY, 1));
			admin.setFirstName("Thirupathi");
			admin.setLastName("Vemireddy");
			admin.setEmail("thirupathi.vemireddy@citiustech.com");
			admin.setRole(Role.ADMIN);
			admin.setStatus(Status.ACTIVE);
			admin.setPassword("Admin123".hashCode());
			repo.save(admin);
		}
	}

	@Bean
	public FilterRegistrationBean getFilter() {
		UrlBasedCorsConfigurationSource urlconfig = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();

		List<String> all = Arrays.asList("*");

		config.setAllowCredentials(true);
		config.setAllowedHeaders(all);
		config.setAllowedMethods(all);
		config.setAllowedOrigins(all);

		urlconfig.registerCorsConfiguration("/**", config);

		FilterRegistrationBean filterbean = new FilterRegistrationBean(new CorsFilter(urlconfig));
		filterbean.setFilter(new PatientFilter());
		filterbean.addUrlPatterns("/hospital/api/");

		return filterbean;
	}

}
