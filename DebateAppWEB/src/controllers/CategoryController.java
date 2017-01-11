package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import data.CategoryDAO;
import data.CategoryDAOI;
import entities.Category;

@RestController
public class CategoryController implements CategoryControllerI{

	@Autowired
	CategoryDAOI categoryDao = new CategoryDAO();

	@Override
	public Collection<Category> index(HttpServletRequest req, HttpServletResponse res) {
		return categoryDao.index();
	}

	@Override
	public Category show(HttpServletRequest req, HttpServletResponse res, int id) {
		return categoryDao.show(id);
	}

	@Override
	public Category update(HttpServletRequest req, HttpServletResponse res, int id, String categoryJson) {
		return categoryDao.update(id, categoryJson);
	}

	@Override
	public Category create(HttpServletRequest req, HttpServletResponse res, String categoryJson) {
		return categoryDao.create(categoryJson);
	}

	@Override
	public Category destroy(HttpServletRequest req, HttpServletResponse res, int id) {
		return categoryDao.destroy(id);
	}
	
}
