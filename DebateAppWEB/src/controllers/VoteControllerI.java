package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entities.Vote;

public interface VoteControllerI {

	public Collection<Vote> index(HttpServletRequest req, HttpServletResponse res);

	public Vote show(HttpServletRequest req, HttpServletResponse res, int id);

	public Vote update(HttpServletRequest req, HttpServletResponse res, int id, String voteJson);

	public Vote create(HttpServletRequest req, HttpServletResponse res, String voteJson);

	public Vote destroy(HttpServletRequest req, HttpServletResponse res, int id);
	
}
