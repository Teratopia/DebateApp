package data;

import java.util.Collection;

import entities.Vote;

public interface VoteDAOI {

	public Collection<Vote> index();

	public Vote show(int id);

	public Vote update(int id, String todoJson);

	public Vote create(String todoJson);

	public Vote destroy(int id);
	
	public Collection<Vote> indexByDebate(int debId);
	
}
