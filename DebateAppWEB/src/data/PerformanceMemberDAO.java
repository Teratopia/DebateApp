package data;

import java.util.Collection;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Performance;
import entities.PerformanceMember;

public class PerformanceMemberDAO implements PerformanceMemberDAOI {

	@PersistenceContext
	EntityManager em;

	@Override
	public Collection<PerformanceMember> index() {
		String query = "select c from PerformanceMember c where c.id > 0 AND c.id IS NOT NULL";
		List<PerformanceMember> cats = em.createQuery(query, PerformanceMember.class).getResultList();
		return cats;
	}

	@Override
	public PerformanceMember show(int id) {
		PerformanceMember PerformanceMember= em.find(PerformanceMember.class, id);
		return PerformanceMember;
	}

	@Override
	@Transactional
	public PerformanceMember update(int id, String catJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		PerformanceMember updatePerformanceMember= null;
		try{
			updatePerformanceMember = mapper.readValue(catJson, PerformanceMember.class);
		}catch(Exception e){
			System.out.println(e);
		}

		PerformanceMember oldPerformanceMember = show(id);
		oldPerformanceMember.setArguments(updatePerformanceMember.getArguments());
		oldPerformanceMember.setPerformance(updatePerformanceMember.getPerformance());
		oldPerformanceMember.setRole(updatePerformanceMember.getRole());
		oldPerformanceMember.setUser(updatePerformanceMember.getUser());
		
		em.flush();
		return em.find(PerformanceMember.class, id);
	}

	@Override
	@Transactional
	public PerformanceMember create(String catJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		PerformanceMember newPerformanceMember= null;
		try{
			newPerformanceMember = mapper.readValue(catJson, PerformanceMember.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		em.persist(newPerformanceMember);
		em.flush();
		
		String query = "select i from PerformanceMember i where i.id=(select max(id) from PerformanceMember)";
		newPerformanceMember = em.createQuery(query, PerformanceMember.class).getSingleResult();
		
		return newPerformanceMember;
	}

	@Override
	@Transactional
	public PerformanceMember destroy(int id) {
		
		PerformanceMember deletePerformanceMember= em.find(PerformanceMember.class, id);
		
		try {
			em.remove(deletePerformanceMember);
			em.flush();
			return deletePerformanceMember;
		} catch (IllegalArgumentException iae) {
			iae.printStackTrace();
			return null;
		}
		
	}
	
}
