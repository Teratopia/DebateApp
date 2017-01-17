package entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
//@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
//@JsonTypeInfo(use = JsonTypeInfo.Id.NONE)
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String title;
	private String description;
//	@ManyToMany(fetch = FetchType.EAGER)
//	@JoinTable(name = "issue_category", joinColumns = @JoinColumn(name = "category_id"), inverseJoinColumns = @JoinColumn(name = "issue_id"))
////	@JsonManagedReference(value="iss_cat")
//	private Set<Issue> issues;
	@OneToMany(mappedBy = "category", fetch = FetchType.EAGER)
	@JsonManagedReference(value="issCat_category")
	private Set<IssCat> issCats;

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

//	public Set<Issue> getIssues() {
//		return issues;
//	}
//
//	public void setIssues(Set<Issue> issues) {
//		this.issues = issues;
//	}

	public int getId() {
		return id;
	}

	public Set<IssCat> getIssCats() {
		return issCats;
	}

	public void setIssCats(Set<IssCat> issCat) {
		this.issCats = issCat;
	}

//	public void addIssue(Issue issue) {
//		if (issues == null) {
//			issues = new HashSet<>();
//		}
//		if (!issues.contains(issue)) {
//			issues.add(issue);
//			issue.addCategory(this);
//		}
//	}
//
//	public void removeIssue(Issue issue) {
//		if (issues != null && issues.contains(issue)) {
//			issues.remove(issue);
//			issue.removeCategory(this);
//		}
//	}

}
