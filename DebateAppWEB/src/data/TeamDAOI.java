package data;

import java.util.Collection;

import entities.Team;

public interface TeamDAOI {

	public Collection<Team> index();

	public Team show(int id);

	public Team update(int id, String teamJson);

	public Team create(String teamJson);

	public Team destroy(int id);
}
