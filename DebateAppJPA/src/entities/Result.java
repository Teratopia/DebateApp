package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

//+-----------+---------+------+-----+---------+----------------+
//| Field     | Type    | Null | Key | Default | Extra          |
//+-----------+---------+------+-----+---------+----------------+
//| id        | int(11) | NO   | PRI | NULL    | auto_increment |
//| team1id   | int(11) | NO   | MUL | NULL    |                |
//| team2id   | int(11) | NO   | MUL | NULL    |                |
//| time      | int(11) | NO   |     | NULL    |                |
//| side1time | int(11) | NO   |     | NULL    |                |
//| side2time | int(11) | YES  |     | NULL    |                |
//| points1   | int(11) | NO   |     | 0       |                |
//| points2   | int(11) | NO   |     | 0       |                |
//| winteam   | int(11) | NO   | MUL | NULL    |                |
//| loseteam  | int(11) | NO   | MUL | NULL    |                |
//+-----------+---------+------+-----+---------+----------------+

@Entity
public class Result {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	@JoinColumn(name = "team_id")
	private Team team;
	@ManyToOne
	@JoinColumn(name = "debate_id")
	private Debate debate;
	private int teamTime;
	private int teamPoints;
	private String stance;
	@OneToOne
	@JoinColumn(name = "rules_id")
	private Rules rules;
	private boolean winner;
	private int instanceNum;

	public Result() {
	}

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}

	public Debate getDebate() {
		return debate;
	}

	public void setDebate(Debate debate) {
		this.debate = debate;
	}

	public int getTeamTime() {
		return teamTime;
	}

	public void setTeamTime(int teamTime) {
		this.teamTime = teamTime;
	}

	public int getTeamPoints() {
		return teamPoints;
	}

	public void setTeamPoints(int teamPoints) {
		this.teamPoints = teamPoints;
	}

	public String getStance() {
		return stance;
	}

	public void setStance(String stance) {
		this.stance = stance;
	}

	public Rules getRules() {
		return rules;
	}

	public void setRules(Rules rules) {
		this.rules = rules;
	}

	public boolean isWinner() {
		return winner;
	}

	public void setWinner(boolean winner) {
		this.winner = winner;
	}

	public int getInstanceNum() {
		return instanceNum;
	}

	public void setInstanceNum(int instanceNum) {
		this.instanceNum = instanceNum;
	}

	public int getId() {
		return id;
	}
}
