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

import data.UserDAOI;
import entities.User;

@RestController
public class UserController implements UserControllerI{

	@Autowired
	private UserDAOI userDAO; // Create Data Access Object for managed CRUD
									// with mySQL database

	// Respond to request by returning all Users
	@RequestMapping(path = "user", method = RequestMethod.GET)
	public Collection<User> index(HttpServletRequest req, HttpServletResponse res) {
		return userDAO.index();
	}

	// Respond to request by returning single, specific User
	@RequestMapping(path = "user/{id}", method = RequestMethod.GET)
	public User show(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return userDAO.show(id);
	}

	// Respond to request by passing updates to DAO from HSP res in JSON format
	// and returning updated User from DAO
	@RequestMapping(path = "user/{id}", method = RequestMethod.PUT)
	public User update(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id,
			@RequestBody String UserJson) {
		return userDAO.update(id, UserJson);
	}

	// Respond to request by passing JSON for new User to DAO and returning
	// successfully saved User
	@RequestMapping(path = "user", method = RequestMethod.POST)
	public User create(HttpServletRequest req, HttpServletResponse res, @RequestBody String UserJson) {
		return userDAO.create(UserJson);
	}
	
	@RequestMapping(path = "user/{id}/deact", method = RequestMethod.PUT)
	public User deactivate(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return userDAO.deactivate(id);
	}

	// Respond to request by destroying/deleting specific User and returning
	// deleted User information back to front end's angular asynchronous
	// service
	@RequestMapping(path = "user/{id}", method = RequestMethod.DELETE)
	public User destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return userDAO.destroy(id);
	}
	
}
