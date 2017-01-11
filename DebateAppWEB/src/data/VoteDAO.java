package data;

import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.fasterxml.jackson.databind.ObjectMapper;

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
	public Vote show(int id) {
		Vote t = em.find(Vote.class, id);
		return t;
	}

	@Override
	public Vote update(int id, String voteJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Vote v = null;
		try{
			v = mapper.readValue(voteJson, Vote.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		Vote v2 = show(id);
		v2.setInstanceNum(v.getInstanceNum());
		v2.setResult(v.getResult());
		v2.setTeam(v.getTeam());
		v2.setTimeStamp(v.getTimeStamp());
		v2.setUser(v.getUser());
		
		em.flush();
		
		return em.find(Vote.class, id);
	}

	@Override
	public Vote create(String catJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Vote t = null;
		try{
			t = mapper.readValue(catJson, Vote.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		em.persist(t);
		em.flush();
		
		return t;
	}

	@Override
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
