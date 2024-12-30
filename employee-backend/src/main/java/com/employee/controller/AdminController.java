package com.employee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employee.Dto.CommentDto;
import com.employee.Dto.EmployeeDto;
import com.employee.Dto.TaskDto;
import com.employee.model.Employee;
import com.employee.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@GetMapping("/employees")
	public  ResponseEntity<List<EmployeeDto>> getAllEmps(){
		return  ResponseEntity.ok(adminService.getAllEmps());
	}
	
	@GetMapping("/employees/{id}")
	public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") long id){
	     return ResponseEntity.ok(adminService.getEmployeeById(id));
	}
	
	@PutMapping("/employees/{id}")
	public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") long id ,@RequestBody EmployeeDto employeeDto){
			return ResponseEntity.ok(adminService.updateEmployee(id,employeeDto));
	}
	
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") long id){
		adminService.deleteEmployee(id);
		return  ResponseEntity.ok(null);
	}
	
	@GetMapping("/employees/search/{name}")
	  public ResponseEntity<List<EmployeeDto>> searchEmployee(@PathVariable String name){
		return ResponseEntity.ok(adminService.searchEmployeeByName(name));
	}
	
	@GetMapping("/employees/getEmployee")
	public ResponseEntity<EmployeeDto> getUserFromToken(@RequestHeader("Authorization") String token){
		System.out.println(token);
		return ResponseEntity.ok(adminService.getEmpFromToken(token));
	}
	
	/////////////////////////// Task ////////////////////////////
	
	@PostMapping("/task")
	public ResponseEntity<TaskDto> crateTask(@RequestBody TaskDto taskDto){
		
		TaskDto createdTaskDto=adminService.createTask(taskDto);
		
		if(createdTaskDto == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(createdTaskDto);
	}
	
	@GetMapping("/tasks")
	public ResponseEntity<List<TaskDto>> getAllTAsks(){
		return ResponseEntity.ok(adminService.getAllTasks());
	}
	
	@PutMapping("/task/{id}")
	public ResponseEntity<?> updateTask(@PathVariable long id , @RequestBody TaskDto taskDto){
		System.out.println(taskDto.getPriority());

		TaskDto updatedTaskDto = adminService.updateTask(id, taskDto);
		
		if(updatedTaskDto == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(updatedTaskDto);
	}
	
	@GetMapping("/task/{id}")
	public ResponseEntity<TaskDto> getTaskById(@PathVariable long id){
		TaskDto taskDto =adminService.getTaskById(id);
		
		if(taskDto== null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(taskDto);
	}
	
	@DeleteMapping("/task/{id}")
	public ResponseEntity<?> deleteTask(@PathVariable long id){
		adminService.delete(id);
	return	ResponseEntity.ok(null);
	}
	
	
	@GetMapping("/task/{id}/{status}")
	public ResponseEntity<TaskDto> updateStatus(@PathVariable long id ,@PathVariable String status){
		
		TaskDto taskDto= adminService.updateTask(id, status);
		if(taskDto == null)
			  return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		return ResponseEntity.ok(taskDto);
	}
	
	
//////////////////////////////Comment ///////////////////////////////
	
@PostMapping("/task/comment/{taskId}")
		public ResponseEntity<CommentDto> createComment(@PathVariable long taskId, @RequestParam String content , @RequestHeader("Authorization") String token){
		
		CommentDto dto = adminService.createComment(taskId , content ,token);
		
		if(dto == null)
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		return	ResponseEntity.status(HttpStatus.CREATED).body(dto);
}


		@GetMapping("/comments/{taskId}")
		public ResponseEntity<List<CommentDto>> getAllCommentsByTaskId(@PathVariable long taskId){
			
			return ResponseEntity.ok(adminService.getAllComments(taskId));
			
		}

		@DeleteMapping("/task/comment/{id}")
		public ResponseEntity<?> deleteComment(@PathVariable long id){
			adminService.deleteComment(id);
		return	ResponseEntity.ok(null);
		}

	
}
