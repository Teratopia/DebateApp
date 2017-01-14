package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entities.User;

public interface UserControllerI {

	public Collection<User> index(HttpServletRequest req, HttpServletResponse res);

	public User show(HttpServletRequest req, HttpServletResponse res, int id);

	public User update(HttpServletRequest req, HttpServletResponse res, int id, String UserJson);

	public User deactivate(HttpServletRequest req, HttpServletResponse res, int id);

	public User create(HttpServletRequest req, HttpServletResponse res, String UserJson);

	public User destroy(HttpServletRequest req, HttpServletResponse res, int id);
	
}
