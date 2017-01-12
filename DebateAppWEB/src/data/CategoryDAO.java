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
		List<Category> cats = em.createQuery(query, Category.class).getResultList();
		return cats;
	}

	@Override
	public Category show(int id) {
		Category category= em.find(Category.class, id);
		return category;
	}

	@Override
	public Category update(int id, String catJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Category updateCategory= null;
		try{
			updateCategory = mapper.readValue(catJson, Category.class);
		}catch(Exception e){
			System.out.println(e);
		}

		Category oldCategory = show(id);
		oldCategory.setTitle(updateCategory.getTitle());
		oldCategory.setDescription(updateCategory.getDescription());
		oldCategory.setIssues(updateCategory.getIssues());
		
		em.flush();
		return em.find(Category.class, id);
	}

	@Override
	public Category create(String catJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		Category newCategory= null;
		try{
			newCategory = mapper.readValue(catJson, Category.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		em.persist(newCategory);
		em.flush();
		
		return newCategory;
	}

	@Override
	public Category destroy(int id) {
		
		Category deleteCategory= em.find(Category.class, id);
		
		try {
			em.remove(deleteCategory);
			em.flush();
			return deleteCategory;
		} catch (IllegalArgumentException iae) {
			iae.printStackTrace();
			return null;
		}
		
	}

}
