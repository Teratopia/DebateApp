package entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

//+-----------------+----------+------+-----+---------+----------------+
//| Field           | Type     | Null | Key | Default | Extra          |
//+-----------------+----------+------+-----+---------+----------------+
//| id              | int(11)  | NO   | PRI | NULL    | auto_increment |
//| user_id         | int(11)  | NO   | MUL | NULL    |                |
//| debate_id       | int(11)  | NO   | MUL | NULL    |                |
//| team_id         | int(11)  | NO   | MUL | NULL    |                |
//| instance_number | int(11)  | NO   |     | NULL    |                |
//| timestamp       | datetime | NO   |     | NULL    |                |
//+-----------------+----------+------+-----+---------+----------------+

@Entity
public class Vote {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	@ManyToOne
	@JoinColumn(name = "result_id")
	private Result result;
	@ManyToOne
	@JoinColumn(name = "team_id")
	private Team team;
	private int instanceNum;
	private Date timeStamp;

	public Vote() {
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Result getResult() {
		return result;
	}

	public void setResult(Result result) {
		this.result = result;
	}

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}

	public int getInstanceNum() {
		return instanceNum;
	}

	public void setInstanceNum(int instanceNum) {
		this.instanceNum = instanceNum;
	}

	public Date getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(Date timeStamp) {
		this.timeStamp = timeStamp;
	}

	public int getId() {
		return id;
	}
}
