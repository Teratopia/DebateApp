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

import data.PerformanceDAOI;
import entities.Performance;

@RestController
public class PerformanceController implements PerformanceControllerI{

	@Autowired
	private PerformanceDAOI performanceDAO; // Create Data Access Object for managed CRUD
									// with mySQL database

	// Respond to request by returning all Performances
	@RequestMapping(path = "performance", method = RequestMethod.GET)
	public Collection<Performance> index(HttpServletRequest req, HttpServletResponse res) {
		return performanceDAO.index();
	}

	// Respond to request by returning single, specific Performance
	@RequestMapping(path = "performance/{id}", method = RequestMethod.GET)
	public Performance show(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return performanceDAO.show(id);
	}

	// Respond to request by passing updates to DAO from HSP res in JSON format
	// and returning updated Performance from DAO
	@RequestMapping(path = "performance/{id}", method = RequestMethod.PUT)
	public Performance update(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id,
			@RequestBody String PerformanceJson) {
		return performanceDAO.update(id, PerformanceJson);
	}

	// Respond to request by passing JSON for new Performance to DAO and returning
	// successfully saved Performance
	@RequestMapping(path = "performance", method = RequestMethod.POST)
	public Performance create(HttpServletRequest req, HttpServletResponse res, @RequestBody String PerformanceJson) {
		return performanceDAO.create(PerformanceJson);
	}
	
	@RequestMapping(path = "pam", method = RequestMethod.POST)
	public Performance instPerformanceAndMember(HttpServletRequest req, HttpServletResponse res, @RequestBody String cJson) {
		return performanceDAO.instPAM(cJson);
	}

	// Respond to request by destroying/deleting specific Performance and returning
	// deleted Performance information back to front end's angular asynchronous
	// service
	@RequestMapping(path = "performance/{id}", method = RequestMethod.DELETE)
	public Performance destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return performanceDAO.destroy(id);
	}
	
}
