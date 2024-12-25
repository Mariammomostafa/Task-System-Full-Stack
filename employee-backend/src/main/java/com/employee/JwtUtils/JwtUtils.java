package com.employee.JwtUtils;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.employee.Dto.EmployeeDto;
import com.employee.model.Employee;
import com.employee.repository.EmployeeRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Value(value ="${auth.secret}")
	private String SECRET_KEY;
	
	public String generateToken(UserDetails userDetails) {
		
		Map<String, Object> extraClaims= new HashMap<>();
		extraClaims.put("username", userDetails.getUsername());
		extraClaims.put("password", userDetails.getPassword());
		extraClaims.put("authorities", userDetails.getAuthorities());
 		
		return Jwts.builder().setClaims(extraClaims)
				.setSubject(userDetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+1000*60*60*24*7))
				.signWith(getSigningKey() , SignatureAlgorithm.HS256)
				.compact();
				
	}

	private Key getSigningKey() {
		byte[] keyBytes= Decoders.BASE64.decode(SECRET_KEY);
		return Keys.hmacShaKeyFor(keyBytes);
	}
	
	private Claims getAllClaims(String token) {
		
		return Jwts.parserBuilder().setSigningKey(getSigningKey())
				.build().parseClaimsJws(token)
				.getBody();
	}
	
	private <T>T extractClaim(String token , Function<Claims, T> claimResolver) {
		Claims claims = getAllClaims(token);
		return claimResolver.apply(claims);
	}
	
	public Date getExpirationDate(String token) {
		
		Date expiration = extractClaim(token, Claims::getExpiration);
		return expiration;
	}
	
	public boolean isTokenValid(String token) {
		Date expirationDate = getExpirationDate(token);
		return expirationDate.before(new Date());
				
	}
	
	public String getUsernameFromToken(String token) {
		if (token.startsWith("Bearer ")) {
			 token = token.substring(7);
		    }
		   return extractClaim(token, Claims::getSubject);
	}
	
	public boolean isTokenValid(String token , UserDetails userDetails) {
		
		String username= getUsernameFromToken(token);
		return(username.equals(userDetails.getUsername()));
		
	}
	
	public Employee getEmpFromToken(String token) {
		
		String email = getUsernameFromToken(token);
		Employee employee =employeeRepository.findByEmail(email).get();
		return employee;
	}
	
	

}
