package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import entities.IssCat;

public interface IssCatControllerI {
	public Collection<IssCat> index(HttpServletRequest req, HttpServletResponse res);

	public IssCat show(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id);

	public IssCat update(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id,
			@RequestBody String IssCatJson);

	public IssCat create(HttpServletRequest req, HttpServletResponse res, @RequestBody String IssCatJson);

	public IssCat destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id);
}
