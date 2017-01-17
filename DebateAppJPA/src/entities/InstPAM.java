package entities;

//+-----------+--------------+------+-----+---------+----------------+
//| Field     | Type         | Null | Key | Default | Extra          |
//+-----------+--------------+------+-----+---------+----------------+
//| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
//| debate_id | int(11)      | NO   | PRI | NULL    |                |
//| team_id   | int(11)      | NO   | MUL | NULL    |                |
//| stance    | varchar(256) | NO   |     | NULL    |                |
//| timeTotal | int(11)      | NO   |     | 0       |                |
//+-----------+--------------+------+-----+---------+----------------+

//+----------------+-------------+------+-----+---------+----------------+
//| Field          | Type        | Null | Key | Default | Extra          |
//+----------------+-------------+------+-----+---------+----------------+
//| id             | int(11)     | NO   | PRI | NULL    | auto_increment |
//| performance_id | int(11)     | NO   | MUL | NULL    |                |
//| user_id        | int(11)     | NO   | MUL | NULL    |                |
//| role           | varchar(42) | YES  |     | NULL    |                |
//+----------------+-------------+------+-----+---------+----------------+



public class InstPAM {

	private int debateId;
	private int teamId;
	private String stance;
	private long timeTotal;
	
	private int userId;
	private String role;
	
	
	public int getDebateId() {
		return debateId;
	}
	public void setDebateId(int debateId) {
		this.debateId = debateId;
	}
	public int getTeamId() {
		return teamId;
	}
	public void setTeamId(int teamId) {
		this.teamId = teamId;
	}
	public String getStance() {
		return stance;
	}
	public void setStance(String stance) {
		this.stance = stance;
	}
	public long getTimeTotal() {
		return timeTotal;
	}
	public void setTimeTotal(long timeTotal) {
		this.timeTotal = timeTotal;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	
	
}
