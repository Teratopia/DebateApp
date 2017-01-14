package entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Argument {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
//	commented b/c persistence errors and accessable via perfMember
//	@ManyToOne
//	@JoinColumn(name = "debate_id")
//	private Debate debate;
	@ManyToOne
	@JoinColumn(name = "pm_id")
	private PerformanceMember perfMember;
	private String text;
	@Column(name = "time_stamp")
	private Date timeStamp;
	@Column(name = "linkref")
	private String linkRef;
	@ManyToOne
	@JoinColumn(name = "team_id")
	private Team team;

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}

	public PerformanceMember getPerfMember() {
		return perfMember;
	}

	public void setPerfMember(PerformanceMember perfMember) {
		this.perfMember = perfMember;
	}
	
	public Argument() {
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
//
//	public Debate getDebate() {
//		return debate;
//	}
//
//	public void setDebate(Debate debate) {
//		this.debate = debate;
//	}

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

	public String getLinkRef() {
		return linkRef;
	}

	public void setLinkRef(String linkRef) {
		this.linkRef = linkRef;
	}

	public int getId() {
		return id;
	}

}