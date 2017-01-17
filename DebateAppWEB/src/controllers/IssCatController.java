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

import data.IssCatDAOI;
import entities.IssCat;

//Create     		PUT			/IssCat/
//Retrieve All		GET			/IssCat/
//Retrieve One		GET			/IssCat/{id}
//Update			POST		/IssCat/{id}
//Destroy			DELETE		/IssCat/{id}

@RestController
public class IssCatController implements IssCatControllerI {

	@Autowired
	private IssCatDAOI issCatDAO; // Create Data Access Object for managed CRUD
									// with mySQL database

	// Respond to request by returning all IssCats
	@RequestMapping(path = "issCat", method = RequestMethod.GET)
	public Collection<IssCat> index(HttpServletRequest req, HttpServletResponse res) {
		return issCatDAO.index();
	}

	// Respond to request by returning single, specific IssCat
	@RequestMapping(path = "/issCat/{id}", method = RequestMethod.GET)
	public IssCat show(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return issCatDAO.show(id);
	}

	// Respond to request by passing updates to DAO from HSP res in JSON format
	// and returning updated IssCat from DAO
	@RequestMapping(path = "issCat/{id}", method = RequestMethod.PUT)
	public IssCat update(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id,
			@RequestBody String IssCatJson) {
		return issCatDAO.update(id, IssCatJson);
	}

	// Respond to request by passing JSON for new IssCat to DAO and returning
	// successfully saved IssCat
	@RequestMapping(path = "issCat", method = RequestMethod.POST)
	public IssCat create(HttpServletRequest req, HttpServletResponse res, @RequestBody String IssCatJson) {
		return issCatDAO.create(IssCatJson);
	}

	// Respond to request by destroying/deleting specific IssCat and returning
	// deleted IssCat information back to front end's angular asynchronous
	// service
	@RequestMapping(path = "issCat/{id}", method = RequestMethod.DELETE)
	public IssCat destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return issCatDAO.destroy(id);
	}

}
