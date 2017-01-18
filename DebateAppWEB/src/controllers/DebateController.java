package controllers;

import java.util.Collection;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.DebateDAOI;
import entities.Debate;

@RestController
public class DebateController {

	@Autowired
	private DebateDAOI debateDAO; // Create Data Access Object for managed CRUD
									// with mySQL database

	// Respond to request by returning all Debates
	@RequestMapping(path = "debate", method = RequestMethod.GET)
	public Collection<Debate> index(HttpServletRequest req, HttpServletResponse res) {
		return debateDAO.index();
	}

	// Respond to request by returning single, specific Debate
	@RequestMapping(path = "debate/{id}", method = RequestMethod.GET)
	public Debate show(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return debateDAO.show(id);
	}

	// Respond to request by returning single, specific Debate
	@RequestMapping(path = "debate/{id}/full", method = RequestMethod.GET)
	public Map<String, Object> showArgs(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return debateDAO.indexArgs(id);
	}

	// Respond to request by passing updates to DAO from HSP res in JSON format
	// and returning updated Debate from DAO
	@RequestMapping(path = "debate/{id}", method = RequestMethod.PUT)
	public Debate update(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id,
			@RequestBody String debateJson) {
		return debateDAO.update(id, debateJson);
	}

	// Respond to request by passing JSON for new Debate to DAO and returning
	// successfully saved Debate
	@RequestMapping(path = "debate", method = RequestMethod.POST)
	public Debate create(HttpServletRequest req, HttpServletResponse res, @RequestBody String debateJson) {
		return debateDAO.create(debateJson);
	}

	// Respond to request by destroying/deleting specific Debate and returning
	// deleted Debate information back to front end's angular asynchronous
	// service
	@RequestMapping(path = "debate/{id}", method = RequestMethod.DELETE)
	public Debate destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return debateDAO.destroy(id);
	}
	
	
}
