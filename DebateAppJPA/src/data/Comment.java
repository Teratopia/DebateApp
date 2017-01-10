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
	
}
