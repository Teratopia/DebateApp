package data;

import java.util.Collection;

import entities.Topic;

public interface TopicDAOI {

	public Collection<Topic> index();

	public Topic show(int id);

	public Topic update(int id, String todoJson);

	public Topic create(String todoJson);

	public Topic destroy(int id);
	
}
