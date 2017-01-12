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

import data.ArgumentDAO;
import data.ArgumentDAOI;
import entities.Argument;


@RestController
public class ArgumentConroller implements ArgumentControllerI{

	@Autowired
	private ArgumentDAOI argumentDAO; // Create Data Access Object for managed CRUD with mySQL database

	// Respond to request by returning all arguments 
	@RequestMapping(path = "/argument", method = RequestMethod.GET)
	public Collection<Argument> index(HttpServletRequest req, HttpServletResponse res) {
		return argumentDAO.index();
	}

	// Respond to request by returning single, specific argument
	@RequestMapping(path = "/argument/{id}", method = RequestMethod.GET)
	public Argument show(HttpServletRequest req, HttpServletResponse res, @PathVariable ("id") int id) {
		return argumentDAO.show(id);
	}

	// Respond to request by passing updates to DAO from HSP res in JSON format and returning updated argument from DAO
	@RequestMapping(path = "/argument/{id}", method = RequestMethod.PUT)
	public Argument update(HttpServletRequest req, HttpServletResponse res, @PathVariable ("id") int id, @RequestBody String argumentJson) {
		return argumentDAO.update(id, argumentJson);
	}

	// Respond to request by passing JSON for new argument to DAO and returning successfully saved argument
	@RequestMapping(path = "/argument", method = RequestMethod.POST)
	public Argument create(HttpServletRequest req, HttpServletResponse res, @RequestBody String argumentJson) {
		return argumentDAO.create(argumentJson);
	}

	// Respond to request by destroying/deleting specific argument and returning deleted argument information back to front end's angular asynchronous service
	@RequestMapping(path = "/argument/{id}", method = RequestMethod.DELETE)
	public Argument destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable ("id") int id) {
		return argumentDAO.destroy(id);
	}
}
