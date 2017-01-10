//+-------------+--------------+------+-----+---------+----------------+
//| Field       | Type         | Null | Key | Default | Extra          |
//+-------------+--------------+------+-----+---------+----------------+
//| id          | int(11)      | NO   | PRI | NULL    | auto_increment |
//| topic       | int(11)      | NO   | MUL | NULL    |                |
//| title       | varchar(256) | NO   |     | NULL    |                |
//| user1stance | varchar(500) | NO   |     | NULL    |                |
//| user2stance | varchar(500) | NO   |     | NULL    |                |
//| rules_id    | int(11)      | NO   | MUL | NULL    |                |
//| winner      | varchar(43)  | YES  |     | NULL    |                |
//+-------------+--------------+------+-----+---------+----------------+

//

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
	String stance1;
	String stance2;
	int rules_id;
	int result_id;
	ArrayList<User> users; 
	@ManyToMany
	@JoinTable(name = "team_debate", joinColumns = @JoinColumn(name = "debate_id"), inverseJoinColumns = @JoinColumn(name = "team_id"))
	HashSet<Team> teams; 
	
	
	
}