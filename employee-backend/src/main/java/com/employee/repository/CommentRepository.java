package com.employee.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee.model.Comment;

public interface CommentRepository  extends JpaRepository<Comment, Long>{

	List<Comment> findAllByTaskId(long taskId);

}
