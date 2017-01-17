package data;

import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.IssCat;

public class IssCatDAO implements IssCatDAOI {

	@PersistenceContext
	EntityManager em;
	
	@Override
	public Collection<IssCat> index() {
		String query = "select t from IssCat t where t.id > 0";
		Collection<IssCat> IssCats = em.createQuery(query, IssCat.class).getResultList();
		return IssCats;
	}

	@Override
	public IssCat show(int id) {
		IssCat IssCat = em.find(IssCat.class, id);
		return IssCat;
	}

	@Override
	@Transactional
	public IssCat update(int id, String IssCatJson) {

		ObjectMapper mapper = new ObjectMapper();
		IssCat updateIssCat = null;
		try {
			updateIssCat = mapper.readValue(IssCatJson, IssCat.class);
		} catch (Exception e) {
			System.out.println(e);
		}

		IssCat oldIssCat = em.find(IssCat.class, id);
		oldIssCat.setCategory(updateIssCat.getCategory());
		oldIssCat.setIssue(updateIssCat.getIssue());

		em.flush();

		return em.find(IssCat.class, id);
	}

	@Override
	@Transactional
	public IssCat create(String catJson) {

		ObjectMapper mapper = new ObjectMapper();
		IssCat newIssCat = null;
		try {
			newIssCat = mapper.readValue(catJson, IssCat.class);
		} catch (Exception e) {
			System.out.println(e);
		}

		em.persist(newIssCat);
		em.flush();
		
		String query = "select i from IssCat i where i.id=(select max(id) from IssCat)";
		newIssCat = em.createQuery(query, IssCat.class).getSingleResult();

		return newIssCat;
	}

	@Override
	@Transactional
	public IssCat destroy(int id) {

		IssCat deleteIssCat = em.find(IssCat.class, id);

		try {
			em.remove(deleteIssCat);
			em.flush();
			return deleteIssCat;
		} catch (IllegalArgumentException iae) {
			iae.printStackTrace();
			return null;
		}

	}

}
