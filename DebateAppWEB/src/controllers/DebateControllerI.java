package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import entities.Debate;

public interface DebateControllerI {


	public Collection<Debate> index(HttpServletRequest req, HttpServletResponse res);

	public Debate show(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id);

	public Debate update(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id,
			@RequestBody String debateJson);

	public Debate create(HttpServletRequest req, HttpServletResponse res, @RequestBody String debateJson);

	public Debate destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id);
}
