package com.employee.service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.comparator.Comparators;

import com.employee.Dto.CommentDto;
import com.employee.Dto.EmployeeDto;
import com.employee.Dto.TaskDto;
import com.employee.JwtUtils.JwtUtils;
import com.employee.enums.TaskStatus;
import com.employee.model.Comment;
import com.employee.model.Employee;
import com.employee.model.Task;
import com.employee.repository.CommentRepository;
import com.employee.repository.EmployeeRepository;
import com.employee.repository.TaskRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AdminServiceImpl  implements AdminService{
	
	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private TaskRepository taskRepository;
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Override
	public List<EmployeeDto> getAllEmps() {
		return employeeRepository.findAll().stream()
				//.filter(user -> user.getUserRole() == UserRole.EMPLOYEE)
				.map(Employee::getEmployeeDto)
				.collect(Collectors.toList());
	}

	@Override
	public EmployeeDto getEmployeeById(long id) {
		 Optional<Employee> employee= employeeRepository.findById(id);
		 if(employee.isEmpty())
			  throw new EntityNotFoundException("User Not Found ...");
		return employee.get().getEmployeeDto();
	}

	@Override
	public EmployeeDto updateEmployee(long id, EmployeeDto employee) {
		
		Employee emp=employeeRepository.findById(id).get();
		if(emp != null) {
			
			emp.setId(id);
			emp.setFirstName(employee.getFirstName());
			emp.setLastName(employee.getLastName());
			emp.setEmail(employee.getEmail());
			emp.setPassword(new BCryptPasswordEncoder().encode(employee.getPassword()));
			
			return employeeRepository.save(emp).getEmployeeDto();
		}
		return null;
	}

	@Override
	public void deleteEmployee(long id) {
		 Employee employee= employeeRepository.findById(id).get();
		if(employee != null)
			employeeRepository.deleteById(id);
		System.out.println("User deleted successfully");
	}

	@Override
	public List<EmployeeDto> searchEmployeeByName(String name) {
		 
		return employeeRepository.findAllByFirstName(name).stream()
				.sorted(Comparator.comparing(Employee::getFirstName).reversed())
				.map(Employee::getEmployeeDto).collect(Collectors.toList());
	}

	@Override
	public EmployeeDto getEmpFromToken(String token) {
		
		String email=  jwtUtils.getUsernameFromToken(token);
		Employee employee = employeeRepository.findByEmail(email).get();
		return employee.getEmployeeDto();
	}
	
	
	/////////////////////////////// Tasks  //////////////////////////////////

	@Override
	public TaskDto createTask(TaskDto taskDto) {
		
		Optional<Employee> emp= employeeRepository.findById(taskDto.getEmpId());
		System.out.println(emp.get().getFirstName());
		System.out.println(taskDto.getPriority());
		if(emp.isPresent()) {
			
			Task task= new Task();
			
			task.setTitle(taskDto.getTitle());
			task.setDescription(taskDto.getDescription());
			task.setPirority(taskDto.getPriority());
			task.setStatus(TaskStatus.INPROGRESS);
			task.setDate(taskDto.getDate());
			task.setEmployee(emp.get());
			
			  Task createdTask= taskRepository.save(task);
			  System.out.println(" Task Created Successfully");
			return createdTask.getTaskDto();
		}
		return null;
	}

	@Override
	public List<TaskDto> getAllTasks() {
		
		return taskRepository.findAll().stream()
				.sorted(Comparator.comparing(Task::getDate))
				.map(Task::getTaskDto)
				.collect(Collectors.toList());
	}

	@Override
	public TaskDto updateTask(long id, TaskDto taskDto) {
		System.out.println(taskDto.getPriority());
		  Task task=  taskRepository.findById(id).get();
		  Employee employee =employeeRepository.findById(taskDto.getEmpId()).get();
		  if(task != null) {
			  task.setTitle(taskDto.getTitle());
			  task.setDescription(taskDto.getDescription());
			  task.setDate(taskDto.getDate());
			  task.setPirority(taskDto.getPriority());
			  task.setStatus(mapStringToStatus(String.valueOf(taskDto.getStatus())));
			  task.setEmployee(employee);
			  Task updatedTask= taskRepository.save(task);
		      return  updatedTask.getTaskDto();
		}
		return null;
	}
	
	 

	@Override
	public TaskDto getTaskById(long id) {
		 Task task= taskRepository.findById(id).get();
		return  task.getTaskDto();
	}

	@Override
	public void delete(long id) {
		taskRepository.deleteById(id);
	}

	@Override
	public TaskDto updateTask(long id, String status) {
		     Task task=  taskRepository.findById(id).get();
		     if(task != null) {
		    	 task.setStatus(mapStringToStatus(status));
		    	 return taskRepository.save(task).getTaskDto();
		     }
		throw new EntityNotFoundException("Task Not Found ...");
	}
	
	
	
	private TaskStatus mapStringToStatus(String status) {
		return	switch(status) {
			
			case "PENDING" -> TaskStatus.PENDING ;
			case "INPROGRESS" -> TaskStatus.INPROGRESS;
			case "COMPELETED" -> TaskStatus.COMPELETED;
			default -> 	 TaskStatus.CANCELED;	
			};
		}
	
	///////////////////////////////// Comments /////////////////////////////////////////

	@Override
	public CommentDto createComment(long taskId, String content, String token) {
		
        Employee employee=	jwtUtils.getEmpFromToken(token);
         Task task =taskRepository.findById(taskId).get();
         
         if(employee != null && task != null) {
      	   Comment comment=new Comment();
				
	   				comment.setContent(content);
	   				comment.setCreatedAt(new Date());
	   				comment.setTask(task);
	   				comment.setEmployee(employee);         	   
				
				return commentRepository.save(comment).getCommentDto();
         }			
			
			throw new EntityNotFoundException("Task Or Employee Not Found !!!!");
	}

	@Override
	public List<CommentDto> getAllComments(long taskId) {
		
	return	commentRepository.findAllByTaskId(taskId).stream()
		.map(Comment::getCommentDto)
		.collect(Collectors.toList());
	}

	@Override
	public void deleteComment(long id) {
		commentRepository.deleteById(id);
		
	}

	
}
