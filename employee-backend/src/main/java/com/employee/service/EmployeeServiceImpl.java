package com.employee.service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private TaskRepository taskRepository;
	
	@Autowired
	private CommentRepository commentRepository;
	
	

	@Override
	public Employee createEmployee(Employee employee) {
		return employeeRepository.save(employee)	;
	}

	                           /******************************/
	@Override
	public Employee getEmployeeById(long id) {
		Employee employee= employeeRepository.findById(id)
			     .orElseThrow(() -> new RuntimeException("Employee Not Exist with Id : "+id));
	    return employee;
	}
	
	                           /******************************/

	@Override
	public EmployeeDto updateEmployee(long id, EmployeeDto employee) {
		 Employee emp= employeeRepository.findById(id).get();


		emp.setFirstName(employee.getFirstName());
		emp.setLastName(employee.getLastName());
		emp.setEmail(employee.getEmail());

		Employee updatedEmployee= employeeRepository.save(emp);
		
		return updatedEmployee.getEmployeeDto();
	}
	
	
	                 /**********************************/
	@Override
	public EmployeeDto getEmpFromToken(String token) {
		
		String email=  jwtUtils.getUsernameFromToken(token);
		Employee employee = employeeRepository.findByEmail(email).get();
		return employee.getEmployeeDto();
	}
	
	                              /******************************/

	
	@Override
	public UserDetailsService userDetailsService() {
           return new UserDetailsService() {
			
					@Override
					public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
						
						 return employeeRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User Not Found ....."));
					
					}
				};
	}
	
                                   /////////////////////Tasks ////////////////////

			@Override
			public TaskDto getTaskById(long id) {
				
				  Task task= taskRepository.findById(id).get();
				  if(task != null) {
					   return task.getTaskDto();
				  }
				  throw new EntityNotFoundException("Task Not Found ....");
			}
			
	                   /***************************************/

			@Override
			public List<TaskDto> getTasksByUserId(String token) {
		          Employee employee=	jwtUtils.getEmpFromToken(token);
			     
			     if(employee != null) {
			    	 
			   return 	 taskRepository.findAllByEmployeeId(employee.getId())
			    	 .stream().sorted(Comparator.comparing(Task::getDate))
			    	 .map(Task::getTaskDto)
			    	 .collect(Collectors.toList());
			    	 
			     }
			     throw new EntityNotFoundException("User Not Found");
			}
			
			/**************************************************/
			
			@Override
			public TaskDto updateTaskStatus(long id, String status) {
				     Task task=  taskRepository.findById(id).get();
				     if(task != null) {
				    	 task.setStatus(mapStringToStatus2(status));
				    	 return taskRepository.save(task).getTaskDto();
				     }
				throw new EntityNotFoundException("Task Not Found ...");
			}
			
			
			private TaskStatus mapStringToStatus2(String status) {
				return	switch(status) {
					
					case "PENDING" -> TaskStatus.PENDING ;
					case "INPROGRESS" -> TaskStatus.INPROGRESS;
					case "COMPELETED" -> TaskStatus.COMPELETED;
					default -> 	 TaskStatus.CANCELED;	
					};
				}
			
			/*******************************************/
			
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
			
			/*****************************************/
			
			private TaskStatus mapStringToStatus(String status) {
				return	switch(status) {
					
					case "PENDING" -> TaskStatus.PENDING ;
					case "INPROGRESS" -> TaskStatus.INPROGRESS;
					case "COMPELETED" -> TaskStatus.COMPELETED;
					default -> 	 TaskStatus.CANCELED;	
					};
				}

			////////////////////////// Comment //////////////////////////////////
			
			@Override
			public CommentDto createComment(long taskId , String content ,String token) {
				
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

			               /***********************************/
			
			@Override
			public List<CommentDto> getAllComments(long taskId) {
				return	commentRepository.findAllByTaskId(taskId).stream()
						.map(Comment::getCommentDto)
						.collect(Collectors.toList());
			}
			
			
			/***********************/
			
			@Override
			public void deleteComment(long id) {
				commentRepository.deleteById(id);
				
			}

			

			


}
