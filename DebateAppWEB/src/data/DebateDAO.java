package data;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Argument;
import entities.Debate;
import entities.Performance;
import entities.PerformanceMember;

public class DebateDAO implements DebateDAOI {

	@PersistenceContext
	EntityManager em;

	@Override
	public Collection<Debate> index() {
		String query = "select r from Debate r where r.id > 0";
		Collection<Debate> debates = em.createQuery(query, Debate.class).getResultList();
		return debates;
	}

	@Override
	public Map<String, Object> indexArgs(int id) {
		Debate debate = em.find(Debate.class, id);
		String queryArgs = "SELECT a " 
					+ "FROM Argument AS a " 
					+ "JOIN a.perfMember AS pm "
					+ "JOIN pm.performance AS p " 
					+ "WHERE p.debate.id = ?1";
		Collection<Argument> arguments = em.createQuery(queryArgs, Argument.class).setParameter(1, id).getResultList();
		String queryPerformanceMembers = "SELECT pm " 
					+ "FROM PerformanceMember AS pm " 
					+ "JOIN pm.performance AS p "
					+ "WHERE p.debate.id = ?1";
		Collection<PerformanceMember> performanceMembers = em.createQuery(queryPerformanceMembers, PerformanceMember.class).setParameter(1, id).getResultList();

		List<List> roster = new ArrayList<>();
		for (Performance performance : debate.getPerformances()) {
			List<Integer> members = new ArrayList<>();
			for (PerformanceMember performanceMember : performanceMembers) {
				System.out.println("Performance ID: " + performance.getId());
				System.out.println("Performance Member's Performance ID: " + performanceMember.getPerformance().getId());
				if(performance.getId() == performanceMember.getPerformance().getId()){
					members.add(performanceMember.getId());
					System.out.println("added");
				}
			}
			roster.add(members);
			members = new ArrayList<>();
		}
		Map<String, Object> responseJson = new HashMap<>();
		responseJson.put("debate", debate);
		responseJson.put("roster", roster);
		responseJson.put("arguments", arguments);
		responseJson.put("performance_members", performanceMembers);
		return responseJson;
	}

	@Override
	public Debate show(int id) {
		Debate debate = em.find(Debate.class, id);
		return debate;
	}

	@Override
	@Transactional
	public Debate update(int id, String debateJson) {

		ObjectMapper mapper = new ObjectMapper();
		Debate updateDebate = null;
		try {
			updateDebate = mapper.readValue(debateJson, Debate.class);
		} catch (Exception e) {
			System.out.println(e);
		}

		Debate oldDebate = em.find(Debate.class, id);
		oldDebate.setPerformances(updateDebate.getPerformances());
		oldDebate.setVotes(updateDebate.getVotes());
		oldDebate.setComments(updateDebate.getComments());
		oldDebate.setRules(updateDebate.getRules());
		oldDebate.setIssue(updateDebate.getIssue());
		// oldDebate.setWinner(updateDebate.getWinner());
		oldDebate.setTimeStamp(updateDebate.getTimeStamp());
		oldDebate.setTurnCount(updateDebate.getTurnCount());

		em.flush();

		return em.find(Debate.class, id);
	}

	@Override
	@Transactional
	public Debate create(String ruleJson) {

		ObjectMapper mapper = new ObjectMapper();
		Debate r = null;
		try {
			r = mapper.readValue(ruleJson, Debate.class);
		} catch (Exception e) {
			System.out.println(e);
		}

		em.persist(r);
		em.flush();

		String query = "select i from Debate i where i.id=(select max(id) from Debate)";
		r = em.createQuery(query, Debate.class).getSingleResult();

		return r;
	}

	@Override
	@Transactional
	public Debate destroy(int id) {

		Debate r = em.find(Debate.class, id);

		try {
			em.remove(r);
			em.flush();
			return r;
		} catch (IllegalArgumentException iae) {
			iae.printStackTrace();
			return null;
		}

	}

}
