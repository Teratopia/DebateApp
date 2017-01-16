package data;

import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Issue;
import entities.Rules;

public class RulesDAO implements RulesDAOI{
	
	@PersistenceContext
	EntityManager em;

	@Override
	public Collection<Rules> index() {
		String query = "select t from Rules t where t.id > 0";
		Collection<Rules> Ruless = em.createQuery(query, Rules.class).getResultList();
		return Ruless;
	}

	@Override
	public Rules show(int id) {
		Rules t = em.find(Rules.class, id);
		return t;
	}

	@Override
	@Transactional
	public Rules update(int id, String RulesJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Rules t = null;
		try{
			t = mapper.readValue(RulesJson, Rules.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		Rules t2 = show(id);
		t2.setArgPerTurn(t.getArgPerTurn());
		t2.setCharsPerArg(t.getCharsPerArg());
		t2.setCommentsView(t.isCommentsView());
		t2.setOpeningStatements(t.isOpeningStatements());
		t2.setPrivateDebate(t.isPrivateDebate());
		t2.setPublicFlag(t.isPublicFlag());
		t2.setReferencesOn(t.isReferencesOn());
		t2.setViewersFlag(t.isViewersFlag());
		
		em.flush();
		
		return em.find(Rules.class, id);
	}

	@Override
	@Transactional
	public Rules create(String catJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Rules t = null;
		try{
			t = mapper.readValue(catJson, Rules.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		em.persist(t);
		em.flush();
		
		String query = "select i from Rules i where i.id=(select max(id) from Rules)";
		t = em.createQuery(query, Rules.class).getSingleResult();

		return t;
	}

	@Override
	@Transactional
	public Rules destroy(int id) {
		
		Rules t = em.find(Rules.class, id);
		
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
