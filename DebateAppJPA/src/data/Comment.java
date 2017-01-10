package data;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

//+-----------+--------------+------+-----+-------------------+----------------+
//| Field     | Type         | Null | Key | Default           | Extra          |
//+-----------+--------------+------+-----+-------------------+----------------+
//| id        | int(11)      | NO   | PRI | NULL              | auto_increment |
//| user_id   | int(11)      | NO   | MUL | NULL              |                |
//| debate_id | int(11)      | NO   | MUL | NULL              |                |
//| text      | varchar(256) | YES  |     | NULL              |                |
//| time      | datetime     | YES  |     | CURRENT_TIMESTAMP |                |
//| linkref   | varchar(500) | YES  |     | NULL              |                |
//+-----------+--------------+------+-----+-------------------+----------------+

@Entity
public class Comment {
	@Id
	private int id;
	private User user;
	private Debate debate;
	private String text;
	private Date time;
	
	public Comment(){}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Debate getDebate() {
		return debate;
	}

	public void setDebate(Debate debate) {
		this.debate = debate;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	@Override
	public String toString() {
		return "Comment [id=" + id + ", user=" + user + ", debate=" + debate + ", text=" + text + ", time=" + time
				+ "]";
	}
	
}
