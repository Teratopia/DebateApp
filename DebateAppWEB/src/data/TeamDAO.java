package data;

import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Team;

@Repository
@Transactional
public class TeamDAO implements TeamDAOI {
	@PersistenceContext
	private EntityManager em;

	public Collection<Team> index() {
		String query = "Select c from Team c";
		return em.createQuery(query, Team.class).getResultList();
	}

	public Collection<Team> index_result(int resultId) {
		String query = "Select c from Team c JOIN Result r ON r.debate_id = c.debate_id WHERE r.instanceNum = ?1";
		return em.createQuery(query, Team.class).setParameter(1, resultId).getResultList();
	}

	public Team show(int id) {
		return em.find(Team.class, id);
	}

	public Team update(int id, String teamJson) {
		ObjectMapper mapper = new ObjectMapper();
		Team updatedTeam = null;
		try {
			updatedTeam = mapper.readValue(teamJson, Team.class);
			System.out.println(teamJson);
			System.out.println(updatedTeam);
		} catch (Exception e) {
			e.printStackTrace();
		}

		Team oldTeam = em.find(Team.class, id);
		oldTeam.setName(updatedTeam.getName());
		oldTeam.setPerformances(updatedTeam.getPerformances());
		oldTeam.setUsers(updatedTeam.getUsers());

		em.flush();
		return em.find(Team.class, oldTeam.getId());
	}

	public Team create(String teamJson) {
		ObjectMapper mapper = new ObjectMapper();
		Team newTeam = null;
		try {
			newTeam = mapper.readValue(teamJson, Team.class);
			System.out.println(teamJson);
			System.out.println(newTeam);
		} catch (Exception e) {
			e.printStackTrace();
		}

		em.persist(newTeam);
		em.flush();
		System.out.println(newTeam);
		return em.find(Team.class, newTeam.getId());
	}

	public Team destroy(int id) {
		Team deletedTeam = em.find(Team.class, id);
		try {
			em.remove(deletedTeam);
			em.flush();
			return deletedTeam;
		} catch (IllegalArgumentException iae) {
			iae.printStackTrace();
			return null;
		}
	}
}
