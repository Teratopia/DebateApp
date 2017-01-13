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
	@JsonIgnore
	private Set<Performance> performances;
	@ManyToMany(mappedBy = "teams")
	@JsonIgnore
	private Set<User> users;

	public Team() {
	}

	public void addPerformance(Performance performance) {
		if (performances == null) {
			performances = new HashSet<>();
		}
		if (!performances.contains(performance)) {
			performances.add(performance);
			performance.setTeam(this);
		}
	}

	public void removePerformance(Performance performance) {
		if (performances != null && performances.contains(performance)) {
			performances.remove(performance);
			performance.setTeam(null);
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

	public Set<Performance> getPerformances() {
		return performances;
	}

	public void setPerformances(Set<Performance> performances) {
		this.performances = performances;
	}

	public int getId() {
		return id;
	}
}
