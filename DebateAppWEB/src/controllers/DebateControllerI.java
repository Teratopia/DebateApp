package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import entities.Rules;

public interface DebateControllerI {

	public Collection<Rules> index(HttpServletRequest req, HttpServletResponse res);

	public Rules show(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id);

	public Rules update(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id,
			@RequestBody String rulesJson);

	public Rules create(HttpServletRequest req, HttpServletResponse res, @RequestBody String rulesJson);

	public Rules destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id);
}