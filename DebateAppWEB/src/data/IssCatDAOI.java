package data;

import java.util.Collection;

import entities.IssCat;

public interface IssCatDAOI {

	public Collection<IssCat> index();

	public IssCat show(int id);

	public IssCat update(int id, String todoJson);

	public IssCat create(String todoJson);

	public IssCat destroy(int id);

}
