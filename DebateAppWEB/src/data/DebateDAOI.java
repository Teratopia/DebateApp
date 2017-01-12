package data;

import java.util.Collection;

import entities.Debate;

public interface DebateDAOI {

	public Collection<Debate> index();

	public Debate show(int id);

	public Debate update(int id, String todoJson);

	public Debate create(String todoJson);

	public Debate destroy(int id);
	
}
