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

import data.VoteDAOI;
import entities.Vote;

@RestController
public class VoteController {

	@Autowired
	private VoteDAOI voteDAO; // Create Data Access Object for managed CRUD with
								// mySQL database

	// Respond to request by returning all Votes
	@RequestMapping(path = "vote", method = RequestMethod.GET)
	public Collection<Vote> index(HttpServletRequest req, HttpServletResponse res) {
		return voteDAO.index();
	}

	// Respond to request by returning single, specific Vote
	@RequestMapping(path = "vote/{id}", method = RequestMethod.GET)
	public Vote show(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return voteDAO.show(id);
	}

	// Respond to request by passing updates to DAO from HSP res in JSON format
	// and returning updated Vote from DAO
	@RequestMapping(path = "vote/{id}", method = RequestMethod.PUT)
	public Vote update(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id,
			@RequestBody String voteJson) {
		return voteDAO.update(id, voteJson);
	}

	// Respond to request by passing JSON for new Vote to DAO and returning
	// successfully saved Vote
	@RequestMapping(path = "vote", method = RequestMethod.POST)
	public Vote create(HttpServletRequest req, HttpServletResponse res, @RequestBody String voteJson) {
		return voteDAO.create(voteJson);
	}

	// Respond to request by destroying/deleting specific Vote and returning
	// deleted Vote information back to front end's angular asynchronous service
	@RequestMapping(path = "vote/{id}", method = RequestMethod.DELETE)
	public Vote destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return voteDAO.destroy(id);
	}
	
}
