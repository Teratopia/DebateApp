package data;

import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Debate;
import entities.Vote;

public class VoteDAO implements VoteDAOI{

	@PersistenceContext
	EntityManager em;

	@Override
	public Collection<Vote> index() {
		String query = "select t from Vote t where t.id > 0";
		Collection<Vote> Votes = em.createQuery(query, Vote.class).getResultList();
		return Votes;
	}

	@Override
	public Collection<Vote> indexByDebate(int debId) {
		
		Debate d = em.find(Debate.class, debId);
		
		String query = "select t from Vote t where t.debate = "+debId;
		Collection<Vote> Votes = em.createQuery(query, Vote.class).getResultList();
		return Votes;
	}

	@Override
	public Vote show(int id) {
		Vote vote = em.find(Vote.class, id);
		return vote;
	}

	@Override
	@Transactional
	public Vote update(int id, String voteJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Vote updateVote = null;
		try{
			updateVote = mapper.readValue(voteJson, Vote.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		Vote oldVote = show(id);
		oldVote.setUser(updateVote.getUser());
		oldVote.setDebate(updateVote.getDebate());
		oldVote.setPerformance(updateVote.getPerformance());
		oldVote.setTimeStamp(updateVote.getTimeStamp());
		
		em.flush();
		return em.find(Vote.class, id);
	}

	@Override
	@Transactional
	public Vote create(String catJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Vote newVote = null;
		try{
			newVote = mapper.readValue(catJson, Vote.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		em.persist(newVote);
		em.flush();
		
		String query = "select i from Vote i where i.id=(select max(id) from Vote)";
		newVote = em.createQuery(query, Vote.class).getSingleResult();
		
		return newVote;
	}

	@Override
	@Transactional
	public Vote destroy(int id) {
		
		Vote t = em.find(Vote.class, id);
		
		try {
			em.remove(t);
			em.flush();
			return t;
		} catch (IllegalArgumentException iae) {
			iae.printStackTrace();
			return null;
		}
		
	}
	
}
