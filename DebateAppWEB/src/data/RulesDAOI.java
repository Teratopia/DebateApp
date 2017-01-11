package data;

import java.util.Collection;

import entities.Rules;

public interface RulesDAOI {

	public Collection<Rules> index();

	public Rules show(int id);

	public Rules update(int id, String todoJson);

	public Rules create(String todoJson);

	public Rules destroy(int id);
	
}
