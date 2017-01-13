package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entities.PerformanceMember;

public interface PerformanceMemberControllerI {

	public Collection<PerformanceMember> index(HttpServletRequest req, HttpServletResponse res);

	public PerformanceMember show(HttpServletRequest req, HttpServletResponse res, int id);

	public PerformanceMember update(HttpServletRequest req, HttpServletResponse res, int id, String PerformanceMemberJson);

	public PerformanceMember create(HttpServletRequest req, HttpServletResponse res, String PerformanceMemberJson);

	public PerformanceMember destroy(HttpServletRequest req, HttpServletResponse res, int id);
	
}
