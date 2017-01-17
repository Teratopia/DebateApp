package entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "issue_category")
public class IssCat {
	
	@Id
	private int id;
	@ManyToOne(fetch=FetchType.EAGER)
	@JsonBackReference(value="issCat_category")
	private Category category;
	@ManyToOne(fetch=FetchType.EAGER)
	@JsonBackReference(value="issCat_issue")
	private Issue issue;
	
	public IssCat(){}
	
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
	public Issue getIssue() {
		return issue;
	}
	public void setIssue(Issue issue) {
		this.issue = issue;
	}
	public int getId() {
		return id;
	}

	@Override
	public String toString() {
		return "IssCat [id=" + id + ", category=" + category + ", issue=" + issue + "]";
	}
	
	
}
