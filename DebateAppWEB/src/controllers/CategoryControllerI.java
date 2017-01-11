package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import entities.Category;

public interface CategoryControllerI {

	public Collection<Category> index(HttpServletRequest req, HttpServletResponse res);

	public Category show(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id);

	public Category update(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id,
			@RequestBody String CategoryJson);

	public Category create(HttpServletRequest req, HttpServletResponse res, @RequestBody String categoryJson);

	public Category destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id);
}
