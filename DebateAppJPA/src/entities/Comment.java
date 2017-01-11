package entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	@ManyToOne
	@JoinColumn(name = "debate_id")
	private Debate debate;
	private String text;
	@Column(name = "time")
	private Date timeStamp;
	@Column(name = "linkref")
	private String linkRef;

	public Comment() {
	}

	public String getLinkRef() {
		return linkRef;
	}

	public void setLinkRef(String linkRef) {
		this.linkRef = linkRef;
	}


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

	public Date getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(Date timeStamp) {
		this.timeStamp = timeStamp;
	}

	@Override
	public String toString() {
		return "Comment [id=" + id + ", user=" + user + ", debate=" + debate + ", text=" + text + ", timeStamp="
				+ timeStamp + "]";
	}

}
