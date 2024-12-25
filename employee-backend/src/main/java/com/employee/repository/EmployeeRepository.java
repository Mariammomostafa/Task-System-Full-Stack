package com.employee.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.employee.Dto.EmployeeDto;
import com.employee.enums.UserRole;
import com.employee.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{

	Optional<Employee> findByEmail(String email);

	Optional<Employee> findByUserRole(UserRole userRole);

	List<Employee> findAllByFirstName(String name);

}
