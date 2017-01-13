package data;

import java.util.Collection;

import entities.PerformanceMember;

public interface PerformanceMemberDAOI {

	public Collection<PerformanceMember> index();

	public PerformanceMember show(int id);

	public PerformanceMember update(int id, String todoJson);

	public PerformanceMember create(String todoJson);

	public PerformanceMember destroy(int id);
	
}
