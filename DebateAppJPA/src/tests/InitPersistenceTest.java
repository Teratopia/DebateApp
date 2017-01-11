package tests;

import static org.junit.Assert.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.User;

public class InitPersistenceTest {

	private EntityManagerFactory emf;
	private EntityManager em;
	
	@Before
	public void first(){
		emf = Persistence.createEntityManagerFactory("DebateAppJPA");
		em = emf.createEntityManager();
	}

	@After
	public void tearDown() throws Exception {
		em.close();
		emf.close();
	}

	@Test
	public void testEntitiesPersistence() {
		User u = em.find(User.class, 1);
		assertEquals(u.getId(), 1);
	}

}
