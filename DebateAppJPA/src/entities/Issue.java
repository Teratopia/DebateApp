//+-----------+--------------+------+-----+---------+----------------+
//| Field     | Type         | Null | Key | Default | Extra          |
//+-----------+--------------+------+-----+---------+----------------+
//| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
//| category     | int(11)      | NO   | MUL | NULL    |                |
//| title     | varchar(256) | NO   |     | NULL    |                |
//| stance1   | varchar(256) | NO   |     | NULL    |                |
//| stance2   | varchar(256) | NO   |     | NULL    |                |
//| rules_id  | int(11)      | NO   | MUL | NULL    |                |
//| debate_id | int(11)      | NO   | MUL | NULL    |                |
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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
public class Issue {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "issue_category", joinColumns = @JoinColumn(name = "issue_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
//	@JsonBackReference(value="iss_cat")
	private Set<Category> categories;
	private String title;
	private String description;
	private String linkRef;
	@OneToMany(mappedBy = "issue")
	@JsonIgnore
	private Set<Debate> debates;

	public Set<Category> getCategories() {
		return categories;
	}

	public void setCategories(Set<Category> categories) {
		this.categories = categories;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLinkRef() {
		return linkRef;
	}

	public void setLinkRef(String linkRef) {
		this.linkRef = linkRef;
	}

	public Set<Debate> getDebates() {
		return debates;
	}

	public void setDebates(Set<Debate> debates) {
		this.debates = debates;
	}

	public int getId() {
		return id;
	}

	public Issue() {
	}

	public void addDebate(Debate debate) {
		if (debates == null) {
			debates = new HashSet<>();
		}
		if (!debates.contains(debate)) {
			debates.add(debate);
			if (debate.getIssue() != null) {
				debate.getIssue().getDebates().remove(debate);
			}
			debate.setIssue(this);
		}
	}

	public void removeDebate(Debate debate) {
		debate.setIssue(null);
		if (debates != null) {
			debates.remove(debate);
		}
	}

	public void addCategory(Category category) {
		if (categories == null) {
			categories = new HashSet<>();
		}
		if (!categories.contains(category)) {
			categories.add(category);
			category.addIssue(this);
		}
	}

	public void removeCategory(Category category) {
		if (categories != null && categories.contains(category)) {
			categories.remove(category);
			category.removeIssue(this);
		}
	}
}