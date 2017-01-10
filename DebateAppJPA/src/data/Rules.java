package data;

//+--------------------+------------+------+-----+---------+----------------+
//| Field              | Type       | Null | Key | Default | Extra          |
//+--------------------+------------+------+-----+---------+----------------+
//| id                 | int(11)    | NO   | PRI | NULL    | auto_increment |
//| args_per_turn      | int(11)    | NO   |     | 1       |                |
//| chars_per_arg      | int(11)    | NO   |     | 256     |                |
//| limit_seconds      | int(11)    | NO   |     | 86165   |                |
//| opening_statements | tinyint(1) | NO   |     | 0       |                |
//| references_on      | tinyint(1) | NO   |     | 0       |                |
//| win_value          | int(11)    | NO   |     | 100     |                |
//| users_public_flag  | tinyint(1) | NO   |     | 0       |                |
//| viewers_flag       | tinyint(1) | NO   |     | 0       |                |
//| comments_view      | tinyint(1) | NO   |     | 0       |                |
//| private_debate     | tinyint(1) | NO   |     | 0       |                |
//+--------------------+------------+------+-----+---------+----------------+

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Rules {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int apt;
	private int cpa;
	private int timeLimit;
	private boolean oStatements;
}
