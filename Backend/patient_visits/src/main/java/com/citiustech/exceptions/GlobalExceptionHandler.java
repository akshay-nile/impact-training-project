package com.citiustech.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
	class ExceptionTemplate {

		private LocalDateTime timestamp;
		private String message;

		public ExceptionTemplate(String message) {
			this.timestamp = LocalDateTime.now();
			this.message = message;
		}

		public LocalDateTime getTimestamp() {
			return timestamp;
		}

		public String getMessage() {
			return message;
		}
	}

//	@ExceptionHandler(RuntimeException.class)
//	public ResponseEntity<ExceptionTemplate> handleRuntimeExceptions(RuntimeException e) {
//		ExceptionTemplate temp = new ExceptionTemplate(e.getMessage());
//		return new ResponseEntity<>(temp, HttpStatus.BAD_REQUEST);
//	}
//
//	@ExceptionHandler(CustomException.class)
//	public ResponseEntity<ExceptionTemplate> handleRuntimeExceptions(CustomException e) {
//		ExceptionTemplate temp = new ExceptionTemplate(e.getMessage());
//		return new ResponseEntity<>(temp, e.getStatus());
//	}
}
