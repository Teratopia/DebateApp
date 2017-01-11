package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entities.Topic;

public interface TopicControllerI {

	public Collection<Topic> index(HttpServletRequest req, HttpServletResponse res);

	public Topic show(HttpServletRequest req, HttpServletResponse res, int id);

	public Topic update(HttpServletRequest req, HttpServletResponse res, int id, String TopicJson);

	public Topic create(HttpServletRequest req, HttpServletResponse res, String TopicJson);

	public Topic destroy(HttpServletRequest req, HttpServletResponse res, int id);

}
