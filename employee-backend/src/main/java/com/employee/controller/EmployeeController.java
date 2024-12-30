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
import com.employee.service.EmployeeService;


//@CrossOrigin(origins = "http://localhost:4200/") // this line make Error when put it in Repository
@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "*")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;
	

	//get all employees

	

	@PostMapping("/employees")
	public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
		return ResponseEntity.ok( employeeService.createEmployee(employee));

	}


	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable long id){
             
		return ResponseEntity.ok( employeeService.getEmployeeById(id));

		
		}

	@PutMapping("/employees/{id}")
	public ResponseEntity<EmployeeDto> updateInfo(@PathVariable long id , @RequestBody EmployeeDto employee){
			return ResponseEntity.ok(employeeService.updateEmployee(id, employee));
	}
	
	@GetMapping("/getEmployee")
	public ResponseEntity<EmployeeDto> getUserFromToken(@RequestHeader("Authorization") String token){
		System.out.println(token);
		return ResponseEntity.ok(employeeService.getEmpFromToken(token));
	}

	
	                     /////////////////////  Task /////////////////////
	
	@GetMapping("/tasks")
	public  ResponseEntity<List<TaskDto>> getTasksByEmpId(@RequestHeader("Authorization") String token){
		
		 return ResponseEntity.ok(employeeService.getTasksByUserId(token));
		
	}
	
	@GetMapping("/task/{id}")
	public ResponseEntity<TaskDto> getTaskById(@PathVariable long id){
		  TaskDto taskDto=  employeeService.getTaskById(id);
		  if(taskDto == null)
			  return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		  return ResponseEntity.status(HttpStatus.OK).body(taskDto);
	  
	}
	
	@GetMapping("/task/{id}/{status}")
	public ResponseEntity<TaskDto> updateStatus(@PathVariable long id ,@PathVariable String status){
		
		TaskDto taskDto= employeeService.updateTaskStatus(id, status);
		if(taskDto == null)
			  return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		return ResponseEntity.ok(taskDto);
	}
	
	
	@PutMapping("/task/{id}")
	public ResponseEntity<?> updateTask(@PathVariable long id , @RequestBody TaskDto taskDto){
		System.out.println(id);
		System.out.println(taskDto.getPriority());
		System.out.println(taskDto.getTitle());
		System.out.println(taskDto.getDescription());
		TaskDto updatedTaskDto = employeeService.updateTask(id, taskDto);
		
		if(updatedTaskDto == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(updatedTaskDto);
	}
	
	////////////////////////////// Comment ///////////////////////////////
	
	@PostMapping("/task/comment/{taskId}")
	public ResponseEntity<CommentDto> createComment(@PathVariable long taskId, @RequestParam String content , @RequestHeader("Authorization") String token){
		
		CommentDto dto = employeeService.createComment(taskId , content ,token);
		
		if(dto == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		return	ResponseEntity.status(HttpStatus.CREATED).body(dto);
	}
	
	                    /***********************************/
	
	@GetMapping("/comments/{taskId}")
	public ResponseEntity<List<CommentDto>> getAllCommentsByTaskId(@PathVariable long taskId){
		
		return ResponseEntity.ok(employeeService.getAllComments(taskId));
		
	}
	
	/********************************/
	
	@DeleteMapping("/task/comment/{id}")
	public ResponseEntity<?> deleteComment(@PathVariable long id){
		employeeService.deleteComment(id);
	return	ResponseEntity.ok(null);
	}


}
