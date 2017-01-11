package data;

import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Result;

public class ResultDAO implements ResultDAOI{

	@PersistenceContext
	EntityManager em;

	@Override
	public Collection<Result> index() {
		String query = "select r from Result r where r.id > 0";
		Collection<Result> Results = em.createQuery(query, Result.class).getResultList();
		return Results;
	}

	@Override
	public Result show(int id) {
		Result r = em.find(Result.class, id);
		return r;
	}

	@Override
	public Result update(int id, String resultJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Result r = null;
		try{
			r = mapper.readValue(resultJson, Result.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		Result r2 = em.find(Result.class, id);
		r2.setDebate(r.getDebate());
		r2.setInstanceNum(r.getInstanceNum());
		r2.setRules(r.getRules());
		r2.setStance(r.getStance());
		r2.setTeam(r.getTeam());
		r2.setTeamPoints(r.getTeamPoints());
		r2.setTeamTime(r.getTeamTime());
		r2.setWinner(r.isWinner());
		
		em.flush();
		
		return em.find(Result.class, id);
	}

	@Override
	public Result create(String ruleJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Result r = null;
		try{
			r = mapper.readValue(ruleJson, Result.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		em.persist(r);
		em.flush();
		
		return r;
	}

	@Override
	public Result destroy(int id) {
		
		Result r = em.find(Result.class, id);
		
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
