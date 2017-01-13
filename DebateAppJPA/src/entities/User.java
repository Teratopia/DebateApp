package entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;

//+------------+--------------+------+-----+---------+----------------+
//| Field      | Type         | Null | Key | Default | Extra          |
//+------------+--------------+------+-----+---------+----------------+
//| id         | int(11)      | NO   | PRI | NULL    | auto_increment |
//| password   | varchar(256) | NO   |     | NULL    |                |
//| username   | varchar(42)  | NO   |     | NULL    |                |
//| goodevil   | int(11)      | YES  |     | 0       |                |
//| lawfulness | int(11)      | YES  |     | 0       |                |
//| type       | varchar(6)   | YES  |     | NULL    |                |
//+------------+--------------+------+-----+---------+----------------+

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {
	@Id
	private int id;
	private String password;
	private String username;
	@Column(name = "lawfulness")
	private int goodevil;
	@Column(name = "goodness")
	private int lawfulchaotic;
	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private Set<Argument> arguments;
	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private Set<PerformanceMember> perfMember;
	@ManyToMany
	@JoinTable(name = "team_roster", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "team_id"))
	@JsonIgnore
	private Set<Team> teams;
	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private Set<Comment> comments;
	private String type;

	public void setPerfMember(Set<PerformanceMember> perfMember) {
		this.perfMember = perfMember;
	}

	public void addTeam(Team team) {
		if (teams == null) {
			teams = new HashSet<>();
		}
		if (!teams.contains(team)) {
			teams.add(team);
			team.addUser(this);
		}
	}

	public void removeTeam(Team team) {
		if (teams != null && teams.contains(team)) {
			teams.remove(team);
			team.removeUser(this);
		}
	}

	public String getPassword() {
		return password;
	}

	public Set<Argument> getArguments() {
		return arguments;
	}

	public void setArguments(Set<Argument> arguments) {
		this.arguments = arguments;
	}

	public Set<Team> getTeams() {
		return teams;
	}

	public void setTeams(Set<Team> teams) {
		this.teams = teams;
	}

	public Set<Comment> getComments() {
		return comments;
	}

	public void setComments(Set<Comment> comments) {
		this.comments = comments;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getGoodevil() {
		return goodevil;
	}

	public void setGoodevil(int goodevil) {
		this.goodevil = goodevil;
	}

	public int getLawfulchaotic() {
		return lawfulchaotic;
	}

	public void setLawfulchaotic(int lawfulchaotic) {
		this.lawfulchaotic = lawfulchaotic;
	}

	public int getId() {
		return id;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + "]";
	}

}
