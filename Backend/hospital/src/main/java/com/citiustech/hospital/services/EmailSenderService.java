package com.citiustech.hospital.services;

import java.text.DecimalFormat;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

	@Autowired
	private JavaMailSender mailSender;

	public boolean sendEmail(String toEmail) {
		boolean flag=false;
		SimpleMailMessage message = new SimpleMailMessage();

		message.setFrom("taxdeptofind@gmail.com");
		message.setTo(toEmail);
		message.setText("Please find One Time Password : " + generateOtp());
		message.setSubject("One Time Password");
			try {
				mailSender.send(message);
				System.out.println("Mail Send...");
			flag=true;
			return flag;
		} catch (Exception e) {
		}
		return flag;
	}

	private String generateOtp() {
		return new DecimalFormat("000000").format(new Random().nextInt(999999));
	}

}