package com.citiustech.controllers;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("/authenticate")
public class AuthenticationController {

	@Autowired
	private RestTemplate restTemplate;

	@PostMapping("/user")
	public ResponseEntity<?> authenticate(@RequestBody Map<String, String> credentials) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		Object user = restTemplate.exchange("http://gateway-microservice:8080/hospital/login", HttpMethod.POST, 
				new HttpEntity<>(credentials, headers),
				new ParameterizedTypeReference<Object>() {}).getBody();
		
		if(user == null) {
			return new ResponseEntity<>(null, HttpStatus.OK);			
		}
		
		String token = Jwts.builder()
				.setSubject("Token")
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
				.signWith(SignatureAlgorithm.HS256, "login_key")
				.compact();

		Map<String, Object> response = new HashMap<>();
		response.put("user", user);
		response.put("token", token);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
