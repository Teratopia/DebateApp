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
	private boolean references;
	private int winValue;
	private boolean publicFlag;
	private boolean viewersFlag;
	private boolean commentsView;
	private boolean privateDebate;
	
	public Rules(){}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getApt() {
		return apt;
	}

	public void setApt(int apt) {
		this.apt = apt;
	}

	public int getCpa() {
		return cpa;
	}

	public void setCpa(int cpa) {
		this.cpa = cpa;
	}

	public int getTimeLimit() {
		return timeLimit;
	}

	public void setTimeLimit(int timeLimit) {
		this.timeLimit = timeLimit;
	}

	public boolean isoStatements() {
		return oStatements;
	}

	public void setoStatements(boolean oStatements) {
		this.oStatements = oStatements;
	}

	public boolean isReferences() {
		return references;
	}

	public void setReferences(boolean references) {
		this.references = references;
	}

	public int getWinValue() {
		return winValue;
	}

	public void setWinValue(int winValue) {
		this.winValue = winValue;
	}

	public boolean isPublicFlag() {
		return publicFlag;
	}

	public void setPublicFlag(boolean publicFlag) {
		this.publicFlag = publicFlag;
	}

	public boolean isViewersFlag() {
		return viewersFlag;
	}

	public void setViewersFlag(boolean viewersFlag) {
		this.viewersFlag = viewersFlag;
	}

	public boolean isCommentsView() {
		return commentsView;
	}

	public void setCommentsView(boolean commentsView) {
		this.commentsView = commentsView;
	}

	public boolean isPrivateDebate() {
		return privateDebate;
	}

	public void setPrivateDebate(boolean privateDebate) {
		this.privateDebate = privateDebate;
	}

	@Override
	public String toString() {
		return "Rules [id=" + id + ", apt=" + apt + ", cpa=" + cpa + ", winValue=" + winValue + ", privateDebate="
				+ privateDebate + "]";
	}
	
}
