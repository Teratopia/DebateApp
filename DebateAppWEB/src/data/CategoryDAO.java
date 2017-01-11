package data;

import java.util.Collection;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Category;

public class CategoryDAO implements CategoryDAOI{
	
	@PersistenceContext
	EntityManager em;

	@Override
	public Collection<Category> index() {
		String query = "select c from Category c where c.id > 0";
		List<Category> todos = em.createQuery(query, Category.class).getResultList();
		return todos;
	}

	@Override
	public Category show(int id) {
		Category c = em.find(Category.class, id);
		return c;
	}

	@Override
	public Category update(int id, String catJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Category c = null;
		try{
			c = mapper.readValue(catJson, Category.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		Category c2 = show(id);
		c2.setName(c.getName());
		em.flush();
		
		return em.find(Category.class, id);
	}

	@Override
	public Category create(String catJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Category c = null;
		try{
			c = mapper.readValue(catJson, Category.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		em.persist(c);
		em.flush();
		
		return c;
	}

	@Override
	public Category destroy(int id) {
		
		Category c = em.find(Category.class, id);
		
		em.remove(c);
				
		return c;
	}

}
