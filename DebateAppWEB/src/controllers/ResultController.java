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

import data.ResultDAOI;
import entities.Result;

@RestController
public class ResultController {

	@Autowired
	private ResultDAOI resultDAO; // Create Data Access Object for managed CRUD
									// with mySQL database

	// Respond to request by returning all Results
	@RequestMapping(path = "Result", method = RequestMethod.GET)
	public Collection<Result> index(HttpServletRequest req, HttpServletResponse res) {
		return resultDAO.index();
	}

	// Respond to request by returning single, specific Result
	@RequestMapping(path = "/result/{id}", method = RequestMethod.GET)
	public Result show(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return resultDAO.show(id);
	}

	// Respond to request by passing updates to DAO from HSP res in JSON format
	// and returning updated Result from DAO
	@RequestMapping(path = "/result/{id}", method = RequestMethod.PUT)
	public Result update(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id,
			@RequestBody String resultJson) {
		return resultDAO.update(id, resultJson);
	}

	// Respond to request by passing JSON for new Result to DAO and returning
	// successfully saved Result
	@RequestMapping(path = "/result", method = RequestMethod.POST)
	public Result create(HttpServletRequest req, HttpServletResponse res, @RequestBody String resultJson) {
		return resultDAO.create(resultJson);
	}

	// Respond to request by destroying/deleting specific Result and returning
	// deleted Result information back to front end's angular asynchronous
	// service
	@RequestMapping(path = "/result/{id}", method = RequestMethod.DELETE)
	public Result destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return resultDAO.destroy(id);
	}
	
	
}
