package entities;

import java.util.ArrayList;
import java.util.HashSet;

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

@Entity
public class User {
	@Id
	private int id;
	private String password;
	private String username;
	private int goodevil;
	private int lawfulchaotic;
	@OneToMany(mappedBy = "user")
	private ArrayList<Argument> arguments;
	@ManyToMany
	@JoinTable(name = "user_team", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "team_id"))
	private HashSet<Team> teams;
	@OneToMany(mappedBy = "user")
	private ArrayList<Comment> comments;
	private String type;

	public User() {
	}

	public String getPassword() {
		return password;
	}

	public ArrayList<Argument> getArguments() {
		return arguments;
	}

	public void setArguments(ArrayList<Argument> arguments) {
		this.arguments = arguments;
	}

	public HashSet<Team> getTeams() {
		return teams;
	}

	public void setTeams(HashSet<Team> teams) {
		this.teams = teams;
	}

	public ArrayList<Comment> getComments() {
		return comments;
	}

	public void setComments(ArrayList<Comment> comments) {
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
