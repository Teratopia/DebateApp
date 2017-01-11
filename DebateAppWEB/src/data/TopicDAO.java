package data;

import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Topic;

public class TopicDAO implements TopicDAOI{
	
	@PersistenceContext
	EntityManager em;

	@Override
	public Collection<Topic> index() {
		String query = "select t from Topic t where t.id > 0";
		Collection<Topic> topics = em.createQuery(query, Topic.class).getResultList();
		return topics;
	}

	@Override
	public Topic show(int id) {
		Topic t = em.find(Topic.class, id);
		return t;
	}

	@Override
	public Topic update(int id, String topicJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Topic t = null;
		try{
			t = mapper.readValue(topicJson, Topic.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		Topic t2 = show(id);
		t2.setCategory(t.getCategory());
		t2.setText(t.getText());
		
		em.flush();
		
		return em.find(Topic.class, id);
	}

	@Override
	public Topic create(String catJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Topic t = null;
		try{
			t = mapper.readValue(catJson, Topic.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		em.persist(t);
		em.flush();
		
		return t;
	}

	@Override
	public Topic destroy(int id) {
		
		Topic t = em.find(Topic.class, id);
		
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
