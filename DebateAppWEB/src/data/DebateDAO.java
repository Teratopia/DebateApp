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
		String query = "select t from Debate t where t.id > 0";
		Collection<Debate> debates = em.createQuery(query, Debate.class).getResultList();
		return debates;
	}

	@Override
	public Debate show(int id) {
		Debate d = em.find(Debate.class, id);
		return d;
	}

	@Override
	public Debate update(int id, String debateJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Debate t = null;
		try{
			t = mapper.readValue(debateJson, Debate.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		Debate t2 = em.find(Debate.class, id);
		t2.setDebateRef(t.getDebateRef());
		t2.setInstanceCount(t.getInstanceCount());
		t2.setResults(t.getResults());
		t2.setTitle(t.getTitle());
		t2.setTopic(t.getTopic());
		
		em.flush();
		
		return em.find(Debate.class, id);
	}

	@Override
	public Debate create(String catJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Debate t = null;
		try{
			t = mapper.readValue(catJson, Debate.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		em.persist(t);
		em.flush();
		
		return t;
	}

	@Override
	public Debate destroy(int id) {
		
		Debate t = em.find(Debate.class, id);
		
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
