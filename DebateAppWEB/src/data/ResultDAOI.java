package data;

import java.util.Collection;

import entities.Result;

public interface ResultDAOI {

	public Collection<Result> index();

	public Result show(int id);

	public Result update(int id, String todoJson);

	public Result create(String todoJson);

	public Result destroy(int id);
	
}
