package com.employee.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.employee.Dto.CommentDto;
import com.employee.Dto.EmployeeDto;
import com.employee.Dto.TaskDto;
import com.employee.model.Employee;

public interface EmployeeService {
	
	UserDetailsService userDetailsService();
	
	 
	 
	 Employee createEmployee( Employee employee);
	 
	 Employee getEmployeeById( long id);
	 
	 EmployeeDto updateEmployee( long id ,  EmployeeDto employee);
	 
	 EmployeeDto getEmpFromToken(String token);

	
	////////////////////// Tasks ////////////////////
	 
	 List<TaskDto> getTasksByUserId(String token);
	 
	 TaskDto updateTask(long id , TaskDto taskDto );
	 
	 TaskDto getTaskById(long id);

	 TaskDto updateTaskStatus(long id , String status);

	 //////////////////// Comment ///////////////////
	 
	 CommentDto createComment(long taskId , String content,String token);
	 
	 List<CommentDto> getAllComments(long taskId);
	 
	 void deleteComment(long id);
	

}
