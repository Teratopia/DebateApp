package tests;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Argument;
import entities.Category;
import entities.Comment;
import entities.Debate;
import entities.Rules;
import entities.Team;
import entities.User;
import entities.Vote;

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
		Vote v = em.find(Vote.class, 2);
		
		User u = em.find(User.class, 1);
		assertEquals(u.getUsername(), "testu1");
		
		Team te = em.find(Team.class, 1);
		assertEquals(te.getName(), "testTeam1");
		
		Rules r = em.find(Rules.class, 1);
		assertEquals(r.getCharsPerArg(), 280);
		
		Debate d = em.find(Debate.class, 1);
		
		Comment c = em.find(Comment.class, 1);
		assertEquals(c.getText(), "illogical.");
		
		Category ca = em.find(Category.class, 1);
		
		Argument a = em.find(Argument.class, 1);
		assertEquals(a.getText(), "The govt dont need no ethics committee");
	}

}
