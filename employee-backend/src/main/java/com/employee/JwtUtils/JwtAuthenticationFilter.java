package com.employee.JwtUtils;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.employee.service.EmployeeService;
import com.employee.service.EmployeeServiceImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private EmployeeServiceImpl employeeServiceImpl;
	
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String header= request.getHeader("Authorization");
		if(header == null || ! header.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}
		
		String token = header.substring(7);
		String username= jwtUtils.getUsernameFromToken(token);
		
		if(username !=null && SecurityContextHolder.getContext().getAuthentication() == null) {
			
			UserDetails userDetails=employeeServiceImpl.userDetailsService().loadUserByUsername(username);
			
			if(jwtUtils.isTokenValid(token ,userDetails)) {
				SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
				
				UsernamePasswordAuthenticationToken authToken= 
						new UsernamePasswordAuthenticationToken(userDetails , null , userDetails.getAuthorities());
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				securityContext.setAuthentication(authToken);
				SecurityContextHolder.setContext(securityContext);
				}
		}
		filterChain.doFilter(request, response);
	}
	
	

}
