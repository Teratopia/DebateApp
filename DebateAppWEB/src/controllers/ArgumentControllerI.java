package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import entities.Argument;

public interface ArgumentControllerI {
	public Collection<Argument> index(HttpServletRequest req, HttpServletResponse res);

	public Argument show(HttpServletRequest req, HttpServletResponse res, @PathVariable ("id") int id);

	public Argument update(HttpServletRequest req, HttpServletResponse res, @PathVariable ("id") int id, @RequestBody String argumentJson);

	public Argument create(HttpServletRequest req, HttpServletResponse res, @RequestBody String argumentJson);

	public Argument destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable ("id") int id);
}
