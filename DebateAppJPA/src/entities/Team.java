package entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Team {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	@OneToMany(mappedBy = "team")
	private Set<Result> results;
	@ManyToMany(mappedBy = "teams")
	@JsonIgnore
	private Set<User> users;

	public Team() {
	}

	public void addResult(Result result) {
		if (results == null) {
			results = new HashSet<>();
		}
		if (!results.contains(result)) {
			results.add(result);
			if (result.getTeam() != null) {
				result.getTeam().getResults().remove(result);
			}
			result.setTeam(this);
		}
	}

	public void removeResult(Result result) {
		result.setTeam(null);
		if (results != null) {
			results.remove(result);
		}
	}

	public void addUser(User user) {
		if (users == null) {
			users = new HashSet<>();
		}
		if (!users.contains(user)) {
			users.add(user);
			user.addTeam(this);
		}
	}

	public void removeUser(User user) {
		if (users != null && users.contains(user)) {
			users.remove(user);
			user.removeTeam(this);
		}
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Result> getResults() {
		return results;
	}

	public void setResults(Set<Result> results) {
		this.results = results;
	}

	public int getId() {
		return id;
	}
}
