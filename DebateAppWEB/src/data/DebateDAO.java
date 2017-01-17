package data;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Argument;
import entities.Debate;

public class DebateDAO implements DebateDAOI{

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
		String query = "SELECT a "  
					+ "FROM Argument AS a " 
					+ "JOIN a.perfMember AS pm " 
					+ "JOIN pm.performance AS p " 
					+ "WHERE p.debate.id = ?1";
		Collection<Argument> arguments = em.createQuery(query, Argument.class).setParameter(1, id).getResultList();
		Map<String, Object> responseJson = new HashMap<>();
		responseJson.put("debate", debate);
		responseJson.put("arguments", arguments);
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
		try{
			updateDebate = mapper.readValue(debateJson, Debate.class);
		}catch(Exception e){
			System.out.println(e);
		}

		Debate oldDebate = em.find(Debate.class, id);
		oldDebate.setPerformances(updateDebate.getPerformances());
		oldDebate.setVotes(updateDebate.getVotes());
		oldDebate.setComments(updateDebate.getComments());
		oldDebate.setRules(updateDebate.getRules());
		oldDebate.setIssue(updateDebate.getIssue());
//		oldDebate.setWinner(updateDebate.getWinner());
		oldDebate.setTimeStamp(updateDebate.getTimeStamp());
		
		em.flush();
		
		return em.find(Debate.class, id);
	}

	@Override
	@Transactional
	public Debate create(String ruleJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Debate r = null;
		try{
			r = mapper.readValue(ruleJson, Debate.class);
		}catch(Exception e){
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
