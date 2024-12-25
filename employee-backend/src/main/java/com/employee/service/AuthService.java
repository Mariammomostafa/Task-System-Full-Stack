package com.employee.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.employee.Dto.EmployeeDto;
import com.employee.Dto.SignupRequest;
import com.employee.JwtUtils.JwtUtils;
import com.employee.enums.UserRole;
import com.employee.model.Employee;
import com.employee.repository.EmployeeRepository;

import jakarta.annotation.PostConstruct;

@Service
public class AuthService {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private JwtUtils jwtUtils;
	


	@PostConstruct
	public void createAdminAccount(){
		
		if(!employeeRepository.findByUserRole(UserRole.ADMIN).isPresent()) {
			
			Employee employee=new Employee();
			employee.setFirstName("mariam");
			employee.setLastName("mostafa");
			employee.setEmail("mariam@gmail.com");
			employee.setPassword(new BCryptPasswordEncoder().encode("631985"));
			employee.setUserRole(UserRole.ADMIN);
			
			employeeRepository.save(employee);
			System.out.println("Admin Created Successfully .....");	
		}	
		System.out.println("Admin Already Exists !!!!");	
	}
	
	
	public EmployeeDto signup(SignupRequest signupRequest) {
		
		if(employeeRepository.findByEmail(signupRequest.getEmail()).isPresent()){
			return null;
		}
		
		Employee employee =new Employee();
		employee.setFirstName(signupRequest.getFirstName());
		employee.setLastName(signupRequest.getLastName());
		employee.setEmail(signupRequest.getEmail());
		employee.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
		employee.setUserRole(UserRole.EMPLOYEE);
		
		Employee createdEmployee = employeeRepository.save(employee);
		System.out.println("User SignUp Successfully ...");
		return createdEmployee.getEmployeeDto();
	}
	
public EmployeeDto getEmpFromToken(String token) {
		
		String email=  jwtUtils.getUsernameFromToken(token);
		Employee employee = employeeRepository.findByEmail(email).get();
		return employee.getEmployeeDto();
	}

}
