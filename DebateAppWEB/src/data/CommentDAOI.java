package data;

import java.util.Collection;

import entities.Comment;

public interface CommentDAOI {

	public Collection<Comment> index();

	public Comment show(int id);

	public Comment update(int id, String commentJson);

	public Comment create(String commentJson);

	public Comment destroy(int id);
}
