package data;

import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Debate;

public class DebateDAO implements DebateDAOI{

	@PersistenceContext
	EntityManager em;

	@Override
	public Collection<Debate> index() {
		String query = "select r from Debate r where r.id > 0";
		Collection<Debate> Debates = em.createQuery(query, Debate.class).getResultList();
		return Debates;
	}

	@Override
	public Debate show(int id) {
		Debate r = em.find(Debate.class, id);
		return r;
	}

	@Override
	public Debate update(int id, String debateJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Debate updateDebate = null;
		try{
			updateDebate = mapper.readValue(debateJson, Debate.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		Debate oldDebate = em.find(Debate.class, id);
		oldDebate.setDebate(updateDebate.getDebate());
		oldDebate.setInstanceNum(updateDebate.getInstanceNum());
		oldDebate.setRules(updateDebate.getRules());
		oldDebate.setStance(updateDebate.getStance());
		oldDebate.setTeam(updateDebate.getTeam());
		oldDebate.setVotes(updateDebate.getVotes());
		oldDebate.setTeamTime(updateDebate.getTeamTime());
		oldDebate.setWinner(updateDebate.isWinner());
		
		em.flush();
		
		return em.find(Debate.class, id);
	}

	@Override
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
		
		return r;
	}

	@Override
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
