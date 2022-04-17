package com.citiustech.controllers;

import java.util.Date;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("/authenticate")
public class AuthenticationController {

	@PostMapping("/user")
	public ResponseEntity<?> authenticate(@RequestBody Map<String, String> map) {
		String token = Jwts.builder()
				.setSubject("Token")
				.claim("email", map.get("email"))
				.claim("password", map.get("password"))
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
				.signWith(SignatureAlgorithm.HS256, "login_key").compact();
		return new ResponseEntity<>("\"" + token + "\"", HttpStatus.OK);
	}
}
