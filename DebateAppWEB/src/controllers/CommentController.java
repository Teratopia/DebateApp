package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.CommentDAO;
import entities.Comment;

//Create     		PUT			/comment/
//Retrieve All		GET			/comment/
//Retrieve One		GET			/comment/{id}
//Update			POST		/comment/{id}
//Destroy			DELETE		/comment/{id}

@RestController
public class CommentController implements CommentControllerI{

	@Autowired
	private CommentDAO commentDAO; // Create Data Access Object for managed CRUD with mySQL database

	// Respond to request by returning all comments 
	@RequestMapping(path = "comment", method = RequestMethod.GET)
	public Collection<Comment> index(HttpServletRequest req, HttpServletResponse res) {
		return commentDAO.index();
	}

	// Respond to request by returning single, specific comment
	@RequestMapping(path = "comment/{id}", method = RequestMethod.GET)
	public Comment show(HttpServletRequest req, HttpServletResponse res, @PathVariable ("id") int id) {
		return commentDAO.show(id);
	}

	// Respond to request by passing updates to DAO from HSP res in JSON format and returning updated comment from DAO
	@RequestMapping(path = "comment/{id}", method = RequestMethod.PUT)
	public Comment update(HttpServletRequest req, HttpServletResponse res, @PathVariable ("id") int id, @RequestBody String commentJson) {
		return commentDAO.update(id, commentJson);
	}

	// Respond to request by passing JSON for new comment to DAO and returning successfully saved comment
	@RequestMapping(path = "comment", method = RequestMethod.POST)
	public Comment create(HttpServletRequest req, HttpServletResponse res, @RequestBody String commentJson) {
		return commentDAO.create(commentJson);
	}

	// Respond to request by destroying/deleting specific comment and returning deleted comment information back to front end's angular asynchronous service
	@RequestMapping(path = "comment/{id}", method = RequestMethod.DELETE)
	public Comment destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable ("id") int id) {
		return commentDAO.destroy(id);
	}
	
}
