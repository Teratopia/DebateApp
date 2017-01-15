package data;

import java.util.Collection;

import entities.Performance;

public interface PerformanceDAOI {

	public Collection<Performance> index();
	
	public Collection<Performance> indexByUser(int id);

	public Performance show(int id);

	public Performance update(int id, String todoJson);

	public Performance create(String todoJson);

	public Performance destroy(int id);
	
}
