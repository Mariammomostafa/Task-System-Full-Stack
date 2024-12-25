package com.employee.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee.Dto.EmployeeDto;
import com.employee.Dto.LoginRequest;
import com.employee.Dto.LoginResponse;
import com.employee.Dto.SignupRequest;
import com.employee.JwtUtils.JwtUtils;
import com.employee.model.Employee;
import com.employee.repository.EmployeeRepository;
import com.employee.service.AuthService;
import com.employee.service.EmployeeServiceImpl;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private EmployeeServiceImpl employeeServiceImpl;
	

	@PostMapping("/signup")
	public ResponseEntity<EmployeeDto> signup(@RequestBody SignupRequest signupRequest){
		
		if(employeeRepository.findByEmail(signupRequest.getEmail()).isPresent()){
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
		}
		
		 EmployeeDto employeeDto= authService.signup(signupRequest);
		 if(employeeDto == null)
			  return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		 return ResponseEntity.status(HttpStatus.CREATED).body(employeeDto);
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
		
		System.out.println(loginRequest.getEmail());
		System.out.println(loginRequest.getPassword());
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							loginRequest.getEmail(), loginRequest.getPassword()));
		} catch (BadCredentialsException e) {
			throw new BadCredentialsException("Incorrect Username or password !!!");
		}
		
		UserDetails userDetails= employeeServiceImpl.userDetailsService().loadUserByUsername(loginRequest.getEmail());
		String token= jwtUtils.generateToken(userDetails);
		
	Optional<Employee> employee =employeeRepository.findByEmail(loginRequest.getEmail());	
		
	if(employee.isPresent()) {
		LoginResponse loginResponse= new LoginResponse();
		loginResponse.setToken(token);
		loginResponse.setUserId(employee.get().getId());
		loginResponse.setUserRole(employee.get().getUserRole());
		loginResponse.setEmpName(employee.get().getFirstName());
		
		return ResponseEntity.ok(loginResponse);
	}
	return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
	
	
	@GetMapping("/getUserfromToken")
	public ResponseEntity<EmployeeDto> getUserFromToken(@RequestHeader("Authorization") String token){
		System.out.println(token);
		return ResponseEntity.ok(authService.getEmpFromToken(token));
	}
}
