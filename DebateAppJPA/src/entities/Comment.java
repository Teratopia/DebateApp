package entities;



import java.sql.Timestamp;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"comment"})
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
	@Column(name = "time_stamp")
	private Timestamp timeStamp;
	@Column(name = "linkref")
	private String linkRef;
    @ManyToOne
	@JoinColumn(name = "comref_id")
    private Comment comment;
	@OrderBy("time_stamp ASC")
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "comment", cascade = CascadeType.ALL)
	private Set<Comment> comments;



	public Comment getComment() {
		return comment;
	}

	public void setComment(Comment comment) {
		this.comment = comment;
	}

	public Set<Comment> getComments() {
		return comments;
	}

	public void setComments(Set<Comment> comments) {
		this.comments = comments;
	}

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

	public Timestamp getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(Timestamp timeStamp) {
		this.timeStamp = timeStamp;
	}

	@Override
	public String toString() {
		return "Comment [id=" + id + ", user=" + user + ", debate=" + debate + ", text=" + text + ", timeStamp="
				+ timeStamp + "]";
	}

}
