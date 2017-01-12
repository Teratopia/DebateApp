package entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String title;
	private String description;
	@ManyToMany
	@JoinTable(name = "issue_category", joinColumns = @JoinColumn(name = "category_id"), inverseJoinColumns = @JoinColumn(name = "issue_id"))
	List<Issue> issues;

	public Category() {
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

	public List<Issue> getIssues() {
		return issues;
	}

	public void setIssues(List<Issue> issues) {
		this.issues = issues;
	}

	public int getId() {
		return id;
	}

	public void addIssue(Issue issue) {
		if (issues == null) {
			issues = new ArrayList<>();
		}
		if (!issues.contains(issue)) {
			issues.add(issue);
			issue.addCategory(this);
		}
	}

	public void removeIssue(Issue issue) {
		if (issues != null && issues.contains(issue)) {
			issues.remove(issue);
			issue.removeCategory(this);
		}
	}

}
