package data;

import java.util.Collection;

import javax.persistence.NoResultException;

import entities.User;

public interface UserDAOI {

	public User authenticateUser(User user) throws NoResultException;

	public Collection<User> index();

	public User show(int id);

	public User update(int id, String todoJson);

	public User create(String todoJson);

	public User deactivate(int id);

	public User destroy(int id);

	public User login(User user) throws NoResultException;

}
