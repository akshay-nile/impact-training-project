package com.citiustech.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

	@Autowired
	private JavaMailSender javaMailSender;

	public boolean sendEmail(String toEmail, String subject, String body) {
		SimpleMailMessage message = new SimpleMailMessage();

		message.setFrom("taxdeptofind@gmail.com");
		message.setTo(toEmail);
		message.setSubject(subject);
		message.setText(body);

		try {
			javaMailSender.send(message);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return false;
	}

}