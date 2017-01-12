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

import data.TeamDAOI;
import entities.Team;

@RestController
public class TeamConroller implements TeamControllerI {

	@Autowired
	private TeamDAOI teamDAO; // Create Data Access Object for managed CRUD with
								// mySQL database

	// Respond to request by returning all teams
	@RequestMapping(path = "team", method = RequestMethod.GET)
	public Collection<Team> index(HttpServletRequest req, HttpServletResponse res) {
		return teamDAO.index();
	}

	// Respond to request by returning single, specific team
	@RequestMapping(path = "team/{id}", method = RequestMethod.GET)
	public Team show(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return teamDAO.show(id);
	}

	// Respond to request by passing updates to DAO from HSP res in JSON format
	// and returning updated team from DAO
	@RequestMapping(path = "team/{id}", method = RequestMethod.PUT)
	public Team update(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id,
			@RequestBody String teamJson) {
		return teamDAO.update(id, teamJson);
	}

	// Respond to request by passing JSON for new team to DAO and returning
	// successfully saved team
	@RequestMapping(path = "team", method = RequestMethod.POST)
	public Team create(HttpServletRequest req, HttpServletResponse res, @RequestBody String teamJson) {
		return teamDAO.create(teamJson);
	}

	// Respond to request by destroying/deleting specific team and returning
	// deleted team information back to front end's angular asynchronous service
	@RequestMapping(path = "team/{id}", method = RequestMethod.DELETE)
	public Team destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return teamDAO.destroy(id);
	}
}
