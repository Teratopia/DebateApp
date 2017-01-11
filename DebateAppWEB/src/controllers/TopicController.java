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

import data.TopicDAO;
import entities.Topic;

@RestController
public class TopicController implements TopicControllerI{
	
	@Autowired
	private TopicDAO topicDAO; // Create Data Access Object for managed CRUD with
								// mySQL database

	// Respond to request by returning all Topics
	@RequestMapping(path = "Topic", method = RequestMethod.GET)
	public Collection<Topic> index(HttpServletRequest req, HttpServletResponse res) {
		return topicDAO.index();
	}

	// Respond to request by returning single, specific Topic
	@RequestMapping(path = "Topic/{id}", method = RequestMethod.GET)
	public Topic show(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return topicDAO.show(id);
	}

	// Respond to request by passing updates to DAO from HSP res in JSON format
	// and returning updated Topic from DAO
	@RequestMapping(path = "Topic/{id}", method = RequestMethod.PUT)
	public Topic update(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id,
			@RequestBody String topicJson) {
		return topicDAO.update(id, topicJson);
	}

	// Respond to request by passing JSON for new Topic to DAO and returning
	// successfully saved Topic
	@RequestMapping(path = "Topic", method = RequestMethod.POST)
	public Topic create(HttpServletRequest req, HttpServletResponse res, @RequestBody String topicJson) {
		return topicDAO.create(topicJson);
	}

	// Respond to request by destroying/deleting specific Topic and returning
	// deleted Topic information back to front end's angular asynchronous service
	@RequestMapping(path = "Topic/{id}", method = RequestMethod.DELETE)
	public Topic destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {
		return topicDAO.destroy(id);
	}
}
