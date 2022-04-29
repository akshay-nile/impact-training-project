package com.citiustech.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.citiustech.exceptions.CustomException;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;

@Component
public class RestUtil {

	@Autowired
	private RestTemplate restTemplate;
	
	@HystrixCommand(fallbackMethod = "fallbackPerformGetRequest")
	public <T> T performGetRequest(String url, Class<T> type) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity entity = new HttpEntity(headers);
		ResponseEntity<T> response = restTemplate.exchange(url, HttpMethod.GET, entity, type);
		return response.getBody();
	}
	
	public <T> T fallbackPerformGetRequest(String url, Class<T> type,Throwable t) {
		throw new CustomException("Connection Timeout for "+url,HttpStatus.REQUEST_TIMEOUT);
	}
}
