package com.employee.model;

import java.util.Date;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.employee.Dto.CommentDto;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "comment")
public class Comment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	  private String content ;
	  
	  private Date createdAt;
	  
	  @ManyToOne(fetch = FetchType.LAZY , optional = false)
	  @JoinColumn(name = "emp_id" , nullable = false)
	  @OnDelete(action = OnDeleteAction.CASCADE)
	  @JsonIgnore
	  private Employee employee;
	  
	  @ManyToOne(fetch = FetchType.LAZY , optional = false)
	  @JoinColumn(name = "task_id" , nullable = false)
	  @OnDelete(action = OnDeleteAction.CASCADE)
	  @JsonIgnore
	  private Task task;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
	}
	  
	  
	public CommentDto getCommentDto() {
		
		CommentDto commentDto = new CommentDto();
		
		commentDto.setId(id);
		commentDto.setContent(content);
		commentDto.setCreatedAt(createdAt);
		commentDto.setTaskId(task.getId());
		commentDto.setEmpId(employee.getId());
		commentDto.setEmpName(employee.getFirstName());
		commentDto.setEmpRole(employee.getUserRole().name());
		
		return commentDto;
	}
	  
	  

}
