package data;

import java.util.Collection;

import entities.Argument;

public interface ArgumentDAOI {

	public Collection<Argument> index();

	public Argument show(int id);

	public Argument update(int id, String argumentJson);

	public Argument create(String argumentJson);

	public Argument destroy(int id);
	
	
}
