package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import entities.Team;

public interface TeamControllerI {
	public Collection<Team> index(HttpServletRequest req, HttpServletResponse res);

	public Team show(HttpServletRequest req, HttpServletResponse res, @PathVariable ("id") int id);

	public Team update(HttpServletRequest req, HttpServletResponse res, @PathVariable ("id") int id, @RequestBody String teamJson);

	public Team create(HttpServletRequest req, HttpServletResponse res, @RequestBody String teamJson);

	public Team destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable ("id") int id);
}
