package entities;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "debate")
public class Debate {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@OneToMany(mappedBy = "debate")
	@JsonIgnore
	private Set<Performance> performances;
	@OneToMany(mappedBy = "debate")
	@JsonIgnore
	private Set<Vote> votes;
	@OneToMany(mappedBy = "debate")
	@JsonIgnore
	private Set<Comment> comments;
	@OneToOne
	@JoinColumn(name = "rules_id")
	private Rules rules;
	@ManyToOne
	@JoinColumn(name = "issue_id")
	private Issue issue;
//	commented b/c persistence error caused by one to many above
//	@Column(name = "winner_id")
//	private Performance winner;
	private Date timeStamp;

	public Set<Comment> getComments() {
		return comments;
	}

	public void setComments(Set<Comment> comments) {
		this.comments = comments;
	}

	public Date getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(Date timeStamp) {
		this.timeStamp = timeStamp;
	}

	public Debate() {
	}

	public void addVote(Vote vote) {
		if (votes == null) {
			votes = new HashSet<>();
		}
		if (!votes.contains(vote)) {
			votes.add(vote);
			if (vote.getDebate() != null) {
				vote.getDebate().getVotes().remove(vote);
			}
			vote.setDebate(this);
		}
	}

	public void removeVote(Vote vote) {
		vote.setDebate(null);
		if (votes != null) {
			votes.remove(vote);
		}
	}

	public Set<Performance> getPerformances() {
		return performances;
	}

	public void setPerformances(Set<Performance> performances) {
		this.performances = performances;
	}

	public Issue getIssue() {
		return issue;
	}

	public void setIssue(Issue issue) {
		this.issue = issue;
	}

	public Set<Vote> getVotes() {
		return votes;
	}

	public void setVotes(Set<Vote> votes) {
		this.votes = votes;
	}

	public Rules getRules() {
		return rules;
	}

	public void setRules(Rules rules) {
		this.rules = rules;
	}

//	public Performance getWinner() {
//		return winner;
//	}
//
//	public void setWinner(Performance winner) {
//		this.winner = winner;
//	}

	public int getId() {
		return id;
	}
}
