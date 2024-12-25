package com.employee.model;

import java.util.Date;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.employee.Dto.TaskDto;
import com.employee.enums.TaskStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "task")
public class Task {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String title;
    
	private String description;
	
	private String pirority;
	
	private Date date;
	
	private TaskStatus status;
	
	@ManyToOne(fetch = FetchType.LAZY , optional = false)
	@JoinColumn(name =  "task_id" , nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Employee employee;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPirority() {
		return pirority;
	}

	public void setPirority(String pirority) {
		this.pirority = pirority;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public TaskStatus getStatus() {
		return status;
	}

	public void setStatus(TaskStatus status) {
		this.status = status;
	}
	
	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public TaskDto getTaskDto() {
		
		TaskDto taskDto=new TaskDto();
		
		taskDto.setId(id);
		taskDto.setTitle(title);
		taskDto.setDate(date);
		taskDto.setDescription(description);
		taskDto.setPriority(pirority);
		taskDto.setStatus(status);
		taskDto.setEmpId(employee.getId());
		taskDto.setEmpName(employee.getFirstName());
		
		return taskDto;		
	}
	
	
		

}
