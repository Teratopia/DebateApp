package data;

import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Issue;

public class IssueDAO implements IssueDAOI{

	@PersistenceContext
	EntityManager em;

	@Override
	public Collection<Issue> index() {
		String query = "select t from Issue t where t.id > 0";
		Collection<Issue> issues = em.createQuery(query, Issue.class).getResultList();
		return issues;
	}

	@Override
	public Issue show(int id) {
		Issue d = em.find(Issue.class, id);
		return d;
	}

	@Override
	public Issue update(int id, String issueJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Issue t = null;
		try{
			t = mapper.readValue(issueJson, Issue.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		Issue t2 = em.find(Issue.class, id);
		t2.setIssueRef(t.getIssueRef());
		t2.setInstanceCount(t.getInstanceCount());
		t2.setResults(t.getResults());
		t2.setTitle(t.getTitle());
		t2.setTopic(t.getTopic());
		
		em.flush();
		
		return em.find(Issue.class, id);
	}

	@Override
	public Issue create(String catJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Issue t = null;
		try{
			t = mapper.readValue(catJson, Issue.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		em.persist(t);
		em.flush();
		
		return t;
	}

	@Override
	public Issue destroy(int id) {
		
		Issue t = em.find(Issue.class, id);
		
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
