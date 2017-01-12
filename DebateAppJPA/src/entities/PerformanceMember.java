package entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class PerformanceMember {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	@JoinColumn(name = "performance_id")
	private Performance performance;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	@OneToMany(mappedBy = "perfMember")
	@JsonIgnore
	private Set<Argument> arguments;

	public PerformanceMember() {
	}

	public Performance getPerformance() {
		return performance;
	}

	public void setPerformance(Performance performance) {
		this.performance = performance;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Argument> getArguments() {
		return arguments;
	}

	public void setArguments(Set<Argument> arguments) {
		this.arguments = arguments;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public int getId() {
		return id;
	}

	private String role;

}
