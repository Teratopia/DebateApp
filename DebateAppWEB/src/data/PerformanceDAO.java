package data;

import java.util.Collection;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Performance;

public class PerformanceDAO implements PerformanceDAOI {

	@PersistenceContext
	EntityManager em;

	@Override
	public Collection<Performance> index() {
		String query = "select c from Performance c where c.id > 0";
		List<Performance> cats = em.createQuery(query, Performance.class).getResultList();
		return cats;
	}

	@Override
	public Performance show(int id) {
		Performance Performance= em.find(Performance.class, id);
		return Performance;
	}

	@Override
	@Transactional
	public Performance update(int id, String catJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Performance updatePerformance= null;
		try{
			updatePerformance = mapper.readValue(catJson, Performance.class);
		}catch(Exception e){
			System.out.println(e);
		}

		Performance oldPerformance = show(id);
		oldPerformance.setDebate(updatePerformance.getDebate());
		oldPerformance.setStance(updatePerformance.getStance());
		oldPerformance.setTeam(updatePerformance.getTeam());
		
		em.flush();
		return em.find(Performance.class, id);
	}

	@Override
	@Transactional
	public Performance create(String catJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Performance newPerformance= null;
		try{
			newPerformance = mapper.readValue(catJson, Performance.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		em.persist(newPerformance);
		em.flush();
		
		return newPerformance;
	}

	@Override
	@Transactional
	public Performance destroy(int id) {
		
		Performance deletePerformance= em.find(Performance.class, id);
		
		try {
			em.remove(deletePerformance);
			em.flush();
			return deletePerformance;
		} catch (IllegalArgumentException iae) {
			iae.printStackTrace();
			return null;
		}
		
	}

	
}
