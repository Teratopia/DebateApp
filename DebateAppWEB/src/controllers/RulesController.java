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

import data.RulesDAO;
import entities.Rules;

@RestController
public class RulesController {
	@Autowired
	private RulesDAO rulesDAO; // Create Data Access Object for managed CRUD
									// with mySQL database

	// Respond to request by returning all Rules
	@RequestMapping(path = "Rules", method = RequestMethod.GET)
	public Collection<Rules> index(HttpServletRequest req, HttpServletResponse res) {
		return rulesDAO.index();
	}

	// Respond to request by returning single, specific Rules
	@RequestMapping(path = "Rules/{id}", method = RequestMethod.GET)
	public Rules show(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return rulesDAO.show(id);
	}

	// Respond to request by passing updates to DAO from HSP res in JSON format
	// and returning updated Rules from DAO
	@RequestMapping(path = "Rules/{id}", method = RequestMethod.PUT)
	public Rules update(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id,
			@RequestBody String rulesJson) {
		return rulesDAO.update(id, rulesJson);
	}

	// Respond to request by passing JSON for new Rules to DAO and returning
	// successfully saved Rules
	@RequestMapping(path = "Rules", method = RequestMethod.POST)
	public Rules create(HttpServletRequest req, HttpServletResponse res, @RequestBody String rulesJson) {
		return rulesDAO.create(rulesJson);
	}

	// Respond to request by destroying/deleting specific Rules and returning
	// deleted Rules information back to front end's angular asynchronous
	// service
	@RequestMapping(path = "Rules/{id}", method = RequestMethod.DELETE)
	public Rules destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return rulesDAO.destroy(id);
	}
	
}
