package data;

import java.util.Collection;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Debate;
import entities.InstPAM;
import entities.Performance;
import entities.PerformanceMember;
import entities.Team;
import entities.User;

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
	public Collection<Performance> indexByUser(int id) {
		String query = "select p from Performance p join Team t on p.team.id = t.id join team_roster r on t.id = r.team_id join User u on r.user_id = u.id where u.id = "+id;
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
		
		String query = "select i from Performance i where i.id=(select max(id) from Performance)";
		newPerformance = em.createQuery(query, Performance.class).getSingleResult();
		
		return newPerformance;
	}
	
	@Override
	@Transactional
	public void instPAM(String catJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		InstPAM ipam= null;
		try{
			ipam = mapper.readValue(catJson, InstPAM.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		Performance per = new Performance();
		PerformanceMember pm = new PerformanceMember();
		
		per.setDebate(em.find(Debate.class, ipam.getDebateId()));
		per.setStance(ipam.getStance());
		per.setTeam(em.find(Team.class, ipam.getTeamId()));
		em.persist(per);
		
		String query = "select i from Performance i where i.id=(select max(id) from Performance)";
		Performance newPerformance = em.createQuery(query, Performance.class).getSingleResult();
		
		pm.setUser(em.find(User.class, ipam.getUserId()));
		pm.setRole(ipam.getRole());
		pm.setPerformance(newPerformance);
		em.persist(pm);
		
	}
		
//		String performanceQuery = "insert into Performance (debate_id, team_id, stance) VALUES ("+
//		ipam.getDebateId()+", "+
//		ipam.getTeamId()+", '"+
//		ipam.getStance()+"')";
//		em.createNativeQuery(performanceQuery);
//		
//		em.createNativeQuery(performanceQuery);
//		
//		
//		String pmQuery = "insert into Performance_member (performance_id, user_id) VALUES ("+
//		newPerformance.getId()+", "+
//		ipam.getUserId()+")";
//		em.createNativeQuery(pmQuery);
//		
//		em.createNativeQuery(pmQuery);
		
		
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
