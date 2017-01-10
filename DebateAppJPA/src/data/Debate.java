//+-----------+--------------+------+-----+---------+----------------+
//| Field     | Type         | Null | Key | Default | Extra          |
//+-----------+--------------+------+-----+---------+----------------+
//| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
//| topic     | int(11)      | NO   | MUL | NULL    |                |
//| title     | varchar(256) | NO   |     | NULL    |                |
//| stance1   | varchar(256) | NO   |     | NULL    |                |
//| stance2   | varchar(256) | NO   |     | NULL    |                |
//| rules_id  | int(11)      | NO   | MUL | NULL    |                |
//| result_id | int(11)      | NO   | MUL | NULL    |                |
//+-----------+--------------+------+-----+---------+----------------+

package data;

import java.util.ArrayList;
import java.util.HashSet;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class Debate {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	int topic;
	String title;
	String user1stance;
	String user2stance;
	int rules_id;
	int result_id;
	ArrayList<User> users; 
	@ManyToMany
	@JoinTable(name = "team_debate", joinColumns = @JoinColumn(name = "debate_id"), inverseJoinColumns = @JoinColumn(name = "team_id"))
	HashSet<Team> teams; 
	
	public Debate(){}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getTopic() {
		return topic;
	}

	public void setTopic(int topic) {
		this.topic = topic;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getUser1stance() {
		return user1stance;
	}

	public void setUser1stance(String user1stance) {
		this.user1stance = user1stance;
	}

	public String getUser2stance() {
		return user2stance;
	}

	public void setUser2stance(String user2stance) {
		this.user2stance = user2stance;
	}

	public int getRules_id() {
		return rules_id;
	}

	public void setRules_id(int rules_id) {
		this.rules_id = rules_id;
	}

	public int getResult_id() {
		return result_id;
	}

	public void setResult_id(int result_id) {
		this.result_id = result_id;
	}

	public ArrayList<User> getUsers() {
		return users;
	}

	public void setUsers(ArrayList<User> users) {
		this.users = users;
	}

	public HashSet<Team> getTeams() {
		return teams;
	}

	public void setTeams(HashSet<Team> teams) {
		this.teams = teams;
	}

	@Override
	public String toString() {
		return "Debate [id=" + id + ", topic=" + topic + ", title=" + title + ", user1stance=" + user1stance
				+ ", user2stance=" + user2stance + ", rules_id=" + rules_id + ", result_id=" + result_id + ", users="
				+ users + ", teams=" + teams + "]";
	}
	
}