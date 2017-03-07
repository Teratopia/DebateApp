package entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Performance {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	@JoinColumn(name = "debate_id")
	@JsonBackReference(value = "deb_per")
	private Debate debate;
	@ManyToOne
	@JoinColumn(name = "team_id")
	private Team team;
	private String stance;
	@OneToMany(mappedBy = "performance", fetch = FetchType.EAGER)
	private Set<PerformanceMember> perfMembers;

	

	public Set<PerformanceMember> getPerfMembers() {
		return perfMembers;
	}
	
	public void setPerfMembers(Set<PerformanceMember> perfMembers) {
		this.perfMembers = perfMembers;
	}

	public void addPerfMember(PerformanceMember perfMember) {
		if (perfMembers == null) {
			perfMembers = new HashSet<>();
		}
		if (!perfMembers.contains(perfMember)) {
			perfMembers.add(perfMember);
			if (perfMember.getPerformance() != null) {
				perfMember.getPerformance().getPerfMembers().remove(perfMember);
			}
			perfMember.setPerformance(this);
		}
	}

	public void removePerformanceMember(PerformanceMember perfMember) {
		perfMember.setPerformance(null);
		if (perfMembers != null) {
			perfMembers.remove(perfMember);
		}
	}
	
	public String getStance() {
		return stance;
	}

	public void setStance(String stance) {
		this.stance = stance;
	}

	public Debate getDebate() {
		return debate;
	}

	public void setDebate(Debate debate) {
		this.debate = debate;
	}

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}

	public int getId() {
		return id;
	}

}
