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

import data.IssueDAOI;
import entities.Issue;

@RestController
public class IssueController {

	@Autowired
	private IssueDAOI issueDAO; // Create Data Access Object for managed CRUD
									// with mySQL database

	// Respond to request by returning all Issues
	@RequestMapping(path = "issue", method = RequestMethod.GET)
	public Collection<Issue> index(HttpServletRequest req, HttpServletResponse res) {
		return issueDAO.index();
	}

	// Respond to request by returning single, specific Issue
	@RequestMapping(path = "issue/{id}", method = RequestMethod.GET)
	public Issue show(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return issueDAO.show(id);
	}

	// Respond to request by passing updates to DAO from HSP res in JSON format
	// and returning updated Issue from DAO
	@RequestMapping(path = "issue/{id}", method = RequestMethod.PUT)
	public Issue update(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id,
			@RequestBody String issueJson) {
		return issueDAO.update(id, issueJson);
	}

	// Respond to request by passing JSON for new Issue to DAO and returning
	// successfully saved Issue
	@RequestMapping(path = "issue", method = RequestMethod.POST)
	public Issue create(HttpServletRequest req, HttpServletResponse res, @RequestBody String issueJson) {
		return issueDAO.create(issueJson);
	}

	// Respond to request by destroying/deleting specific Issue and returning
	// deleted Issue information back to front end's angular asynchronous
	// service
	@RequestMapping(path = "issue/{id}", method = RequestMethod.DELETE)
	public Issue destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return issueDAO.destroy(id);
	}
	
}
