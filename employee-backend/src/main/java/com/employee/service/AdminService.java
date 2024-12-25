package com.employee.service;

import java.util.List;

import com.employee.Dto.CommentDto;
import com.employee.Dto.EmployeeDto;
import com.employee.Dto.TaskDto;

public interface AdminService {
	
	List<EmployeeDto> getAllEmps();
	
	EmployeeDto getEmployeeById(long id);
	
	EmployeeDto updateEmployee(long id , EmployeeDto employee);
	
	void deleteEmployee(long id);
	
	List<EmployeeDto> searchEmployeeByName(String name);
	
	 EmployeeDto getEmpFromToken(String token);
	 
	 /* Task  */
	 
	  TaskDto  createTask(TaskDto taskDto);
	  
	 List<TaskDto> getAllTasks();
	 
	 TaskDto updateTask(long id , TaskDto taskDto );
	 
	 TaskDto getTaskById(long id);
	 
	 void delete(long id);
	 
	 TaskDto updateTask(long id , String status);
	 
	////////////////////// Comments ////////////////////////
	
	 CommentDto createComment(long taskId , String content,String token);
	 
	 List<CommentDto> getAllComments(long taskId);


}
