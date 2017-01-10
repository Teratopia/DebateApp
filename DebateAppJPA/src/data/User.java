package data;

//+------------+--------------+------+-----+---------+----------------+
//| Field      | Type         | Null | Key | Default | Extra          |
//+------------+--------------+------+-----+---------+----------------+
//| id         | int(11)      | NO   | PRI | NULL    | auto_increment |
//| password   | varchar(256) | NO   |     | NULL    |                |
//| username   | varchar(42)  | NO   |     | NULL    |                |
//| goodness   | int(11)      | YES  |     | 0       |                |
//| lawfulness | int(11)      | YES  |     | 0       |                |
//| type       | varchar(6)   | YES  |     | NULL    |                |
//+------------+--------------+------+-----+---------+----------------+

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
	@Id
	private int id;
	private String password;
	private String username;
	private int goodness;
	private int lawfulness;
	
	public User(){}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
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

	public int getGoodness() {
		return goodness;
	}

	public void setGoodness(int goodness) {
		this.goodness = goodness;
	}

	public int getLawfulness() {
		return lawfulness;
	}

	public void setLawfulness(int lawfulness) {
		this.lawfulness = lawfulness;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + "]";
	}
	
}
