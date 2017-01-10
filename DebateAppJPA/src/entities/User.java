package entities;

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

@Entity
public class User {
	@Id
	private int id;
	private String password;
	private String username;
	private int goodevil;
	private int lawfulchaotic;

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
