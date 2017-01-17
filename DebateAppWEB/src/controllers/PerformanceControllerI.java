package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestBody;

import entities.Performance;

public interface PerformanceControllerI {

	public Collection<Performance> index(HttpServletRequest req, HttpServletResponse res);

	public Performance show(HttpServletRequest req, HttpServletResponse res, int id);

	public Performance update(HttpServletRequest req, HttpServletResponse res, int id, String PerformanceJson);

	public Performance create(HttpServletRequest req, HttpServletResponse res, String PerformanceJson);

	public Performance destroy(HttpServletRequest req, HttpServletResponse res, int id);
	
	public void instPerformanceAndMember(HttpServletRequest req, HttpServletResponse res, @RequestBody String cJson);

	
}
