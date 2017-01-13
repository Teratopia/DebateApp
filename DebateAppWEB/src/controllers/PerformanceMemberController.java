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

import data.PerformanceMemberDAOI;
import entities.PerformanceMember;

@RestController
public class PerformanceMemberController implements PerformanceMemberControllerI{

	@Autowired
	private PerformanceMemberDAOI performanceMemberDAO; // Create Data Access Object for managed CRUD
									// with mySQL database

	// Respond to request by returning all PerformanceMembers
	@RequestMapping(path = "performanceMember", method = RequestMethod.GET)
	public Collection<PerformanceMember> index(HttpServletRequest req, HttpServletResponse res) {
		return performanceMemberDAO.index();
	}

	// Respond to request by returning single, specific PerformanceMember
	@RequestMapping(path = "performanceMember/{id}", method = RequestMethod.GET)
	public PerformanceMember show(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return performanceMemberDAO.show(id);
	}

	// Respond to request by passing updates to DAO from HSP res in JSON format
	// and returning updated PerformanceMember from DAO
	@RequestMapping(path = "performanceMember/{id}", method = RequestMethod.PUT)
	public PerformanceMember update(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id,
			@RequestBody String PerformanceMemberJson) {
		return performanceMemberDAO.update(id, PerformanceMemberJson);
	}

	// Respond to request by passing JSON for new PerformanceMember to DAO and returning
	// successfully saved PerformanceMember
	@RequestMapping(path = "performanceMember", method = RequestMethod.POST)
	public PerformanceMember create(HttpServletRequest req, HttpServletResponse res, @RequestBody String PerformanceMemberJson) {
		return performanceMemberDAO.create(PerformanceMemberJson);
	}

	// Respond to request by destroying/deleting specific PerformanceMember and returning
	// deleted PerformanceMember information back to front end's angular asynchronous
	// service
	@RequestMapping(path = "performanceMember/{id}", method = RequestMethod.DELETE)
	public PerformanceMember destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return performanceMemberDAO.destroy(id);
	}
	
}
