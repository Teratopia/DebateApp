package data;

import java.util.Collection;

import entities.Issue;

public interface IssueDAOI {
	
	public Collection<Issue> index();

	public Issue show(int id);

	public Issue update(int id, String todoJson);

	public Issue create(String todoJson);

	public Issue destroy(int id);

}
