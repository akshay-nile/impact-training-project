package com.citiustech.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggerAspect {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

//	@Around(value = "execution(* com.citiustech..*(..))")
//	public Object duringExecution(ProceedingJoinPoint joinPoint) throws Throwable {
//		logger.info("Before calling method: {}.{}() with argument[s]={}",
//				joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName(),
//				joinPoint.getArgs());
//		Object result = joinPoint.proceed();
//		logger.info("After calling method: {}.{}() with argument[s]={}",
//				joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName(), result);
//		return result;
//	}
//
//	@AfterThrowing(value = "execution(* com.citiustech..*(..))", throwing = "ex")
//	public void afterExceptionThrown(JoinPoint joinPoint, Throwable ex) {
//		logger.error("Target method went into exception, message {}", ex.getMessage());
//		logger.error("Exception occured in {}.{}() with cause = {}", joinPoint.getSignature().getDeclaringTypeName(),
//				joinPoint.getSignature().getName(), ex.getMessage());
//	}

}
