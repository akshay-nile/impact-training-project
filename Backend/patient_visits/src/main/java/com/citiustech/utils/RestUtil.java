package com.citiustech.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class RestUtil {

	@Autowired
	private RestTemplate restTemplate;

	public <T> T performGetRequest(String url, Class<T> type) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity entity = new HttpEntity(headers);
		ResponseEntity<T> response = restTemplate.exchange(url, HttpMethod.GET, entity, type);
		return response.getBody();
	}
}
