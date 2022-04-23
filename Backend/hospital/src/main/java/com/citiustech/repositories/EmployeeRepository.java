package com.citiustech.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.citiustech.models.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {

	public Employee findByEmail(String email);

	public Employee findByEmailAndPassword(String email, int password);

	@Query("SELECT e FROM Employee e WHERE e.role='0'")
	public List<Employee> getAllEmployeeName();

	@Query("SELECT e  FROM Employee e WHERE e.employeeId=?1 AND e.password=?2")
	public boolean checkEmployeePassword(int userId, String password);

	@Query("SELECT e.employeeId FROM Employee e WHERE e.email=?1")
	public int getEmployeeId(String email);

}
