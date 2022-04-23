package com.citiustech.generators;

import java.io.Serializable;
import java.sql.ResultSet;
import java.sql.Statement;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class EmployeeGenerator implements IdentifierGenerator {
	
	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		int nextValue = 0;
		
		try {
			Statement statement = session.connection().createStatement();
			statement.executeUpdate("CREATE SEQUENCE IF NOT EXISTS employee_seq INCREMENT 1 START 1");
			ResultSet rs = statement.executeQuery("SELECT nextval('employee_seq')");
			if (rs.next()) {
				nextValue = rs.getInt(1);
			}
			rs.close();
			statement.close();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return String.format("E%04d", nextValue);
	}

}