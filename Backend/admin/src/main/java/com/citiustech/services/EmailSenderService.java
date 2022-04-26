package com.citiustech.services;

import java.util.Stack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService implements Runnable {
	
	@Autowired
	private JavaMailSender javaMailSender;

	private Stack<SimpleMailMessage> stack = new Stack<SimpleMailMessage>();

	public Thread sendEmail(String toEmail, String subject, String body) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("CTHospitalO@gmail.com");
		message.setTo(toEmail);
		message.setSubject(subject);
		message.setText(body);
		stack.push(message);

		Thread emailSenderThread = new Thread(this);
		emailSenderThread.start();
		return emailSenderThread;
	}

	@Override
	public void run() {
		SimpleMailMessage message = stack.pop();
		try {
			javaMailSender.send(message);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}