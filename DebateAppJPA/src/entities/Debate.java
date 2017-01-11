//+-----------+--------------+------+-----+---------+----------------+
//| Field     | Type         | Null | Key | Default | Extra          |
//+-----------+--------------+------+-----+---------+----------------+
//| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
//| topic     | int(11)      | NO   | MUL | NULL    |                |
//| title     | varchar(256) | NO   |     | NULL    |                |
//| stance1   | varchar(256) | NO   |     | NULL    |                |
//| stance2   | varchar(256) | NO   |     | NULL    |                |
//| rules_id  | int(11)      | NO   | MUL | NULL    |                |
//| result_id | int(11)      | NO   | MUL | NULL    |                |
//+-----------+--------------+------+-----+---------+----------------+

package entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Debate {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@OneToOne
	@JoinColumn(name = "topic_id")
	private Topic topic;
	private String title;
	private String debateRef;
	@OneToMany(mappedBy = "debate", fetch = FetchType.EAGER)
	@JsonIgnore
	private Set<Result> results;
	private int instanceCount;

	public Debate() {
	}

	public void addResult(Result result) {
		if (results == null) {
			results = new HashSet<>();
		}
		if (!results.contains(result)) {
			results.add(result);
			if (result.getDebate() != null) {
				result.getDebate().getResults().remove(result);
			}
			result.setDebate(this);
		}
	}

	public void removeResult(Result result) {
		result.setDebate(null);
		if (results != null) {
			results.remove(result);
		}
	}

	public Topic getTopic() {
		return topic;
	}

	public void setTopic(Topic topic) {
		this.topic = topic;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDebateRef() {
		return debateRef;
	}

	public void setDebateRef(String debateRef) {
		this.debateRef = debateRef;
	}

	public Set<Result> getResults() {
		return results;
	}

	public void setResults(Set<Result> results) {
		this.results = results;
	}

	public int getInstanceCount() {
		return instanceCount;
	}

	public void setInstanceCount(int instanceCount) {
		this.instanceCount = instanceCount;
	}

	public int getId() {
		return id;
	}

}