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

import data.CategoryDAO;
import data.CategoryDAOI;
import entities.Category;

@RestController
public class CategoryController implements CategoryControllerI{

	@Autowired
	CategoryDAOI categoryDao = new CategoryDAO();

	@Override
	@RequestMapping(path = "/category", method = RequestMethod.GET)
	public Collection<Category> index(HttpServletRequest req, HttpServletResponse res) {
		return categoryDao.index();
	}

	@Override
	@RequestMapping(path = "/category/{id}", method = RequestMethod.GET)
	public Category show(HttpServletRequest req, HttpServletResponse res, @PathVariable ("id") int id) {
		return categoryDao.show(id);
	}

	@Override
	@RequestMapping(path = "/category/{id}", method = RequestMethod.PUT)
	public Category update(HttpServletRequest req, HttpServletResponse res, @PathVariable ("id") int id, @RequestBody String categoryJson) {
		return categoryDao.update(id, categoryJson);
	}

	@Override
	@RequestMapping(path = "/category", method = RequestMethod.POST)
	public Category create(HttpServletRequest req, HttpServletResponse res, @RequestBody String categoryJson) {
		return categoryDao.create(categoryJson);
	}

	@Override
	@RequestMapping(path = "/category/{id}", method = RequestMethod.DELETE)
	public Category destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable ("id") int id) {
		return categoryDao.destroy(id);
	}
	
}
