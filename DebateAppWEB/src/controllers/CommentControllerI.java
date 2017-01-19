package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import entities.Comment;

public interface CommentControllerI {
	public Collection<Comment> index(HttpServletRequest req, HttpServletResponse res);
	
	public Collection<Comment> indexByDebate(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id);


	public Comment show(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id);

	public Comment update(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id,
			@RequestBody String commentJson);

	public Comment create(HttpServletRequest req, HttpServletResponse res, @RequestBody String commentJson);

	public Comment destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id);
}
