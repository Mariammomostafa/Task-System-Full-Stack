package com.employee.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.employee.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>{

	List<Task> findAllByEmployeeId(long id);
	

}
