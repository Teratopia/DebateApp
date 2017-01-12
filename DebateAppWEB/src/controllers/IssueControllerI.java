package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import entities.Issue;

public interface IssueControllerI {


	public Collection<Issue> index(HttpServletRequest req, HttpServletResponse res);

	public Issue show(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id);

	public Issue update(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id,
			@RequestBody String issueJson);

	public Issue create(HttpServletRequest req, HttpServletResponse res, @RequestBody String issueJson);

	public Issue destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id);
}
