package data;

import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Argument;

@Repository
@Transactional
public class ArgumentDAO implements ArgumentDAOI {
	@PersistenceContext
	private EntityManager em;

	public Collection<Argument> index() {
		String query = "Select c from Argument c";
		return em.createQuery(query, Argument.class).getResultList();
	}

	public Collection<Argument> index_result(int resultId) {
		String query = "Select c from Argument c JOIN Result r ON r.debate_id = c.debate_id WHERE r.instanceNum = ?1";
		return em.createQuery(query, Argument.class).setParameter(1, resultId).getResultList();
	}

	public Argument show(int id) {
		return em.find(Argument.class, id);
	}
	
	@Override
	@Transactional
	public Argument update(int id, String argumentJson) {
		ObjectMapper mapper = new ObjectMapper();
		Argument updatedArgument = null;
		try {
			updatedArgument = mapper.readValue(argumentJson, Argument.class);
			System.out.println(argumentJson);
			System.out.println(updatedArgument);
		} catch (Exception e) {
			e.printStackTrace();
		}

		Argument oldArgument = em.find(Argument.class, id);
		oldArgument.setUser(updatedArgument.getUser());
//		oldArgument.setDebate(updatedArgument.getDebate());
		oldArgument.setPerfMember(updatedArgument.getPerfMember());
		oldArgument.setText(updatedArgument.getText());
		oldArgument.setTimeStamp(updatedArgument.getTimeStamp());
		oldArgument.setLinkRef(updatedArgument.getLinkRef());

		em.flush();
		return em.find(Argument.class, oldArgument.getId());
	}

	@Override
	@Transactional
	public Argument create(String argumentJson) {
		ObjectMapper mapper = new ObjectMapper();
		Argument newArgument = null;
		try {
			newArgument = mapper.readValue(argumentJson, Argument.class);
			System.out.println(argumentJson);
			System.out.println(newArgument);
		} catch (Exception e) {
			e.printStackTrace();
		}

		em.persist(newArgument);
		em.flush();
		System.out.println(newArgument);
		return em.find(Argument.class, newArgument.getId());
	}

	@Override
	@Transactional
	public Argument destroy(int id) {
		Argument deletedArgument = em.find(Argument.class, id);
		try {
			em.remove(deletedArgument);
			em.flush();
			return deletedArgument;
		} catch (IllegalArgumentException iae) {
			iae.printStackTrace();
			return null;
		}
	}
}
