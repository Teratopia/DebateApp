package data;

import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Issue;

public class IssueDAO implements IssueDAOI {

	@PersistenceContext
	EntityManager em;
	
	@Override
	public Collection<Issue> index() {
		String query = "select t from Issue t where t.id > 0";
		Collection<Issue> issues = em.createQuery(query, Issue.class).getResultList();
		return issues;
	}

	@Override
	public Issue show(int id) {
		Issue issue = em.find(Issue.class, id);
		return issue;
	}

	@Override
	@Transactional
	public Issue update(int id, String issueJson) {

		ObjectMapper mapper = new ObjectMapper();
		Issue updateIssue = null;
		try {
			updateIssue = mapper.readValue(issueJson, Issue.class);
		} catch (Exception e) {
			System.out.println(e);
		}

		Issue oldIssue = em.find(Issue.class, id);
		oldIssue.setIssCats(updateIssue.getIssCats());
		oldIssue.setTitle(updateIssue.getTitle());
		oldIssue.setDescription(updateIssue.getDescription());
		oldIssue.setLinkRef(updateIssue.getLinkRef());

		em.flush();

		return em.find(Issue.class, id);
	}

	@Override
	@Transactional
	public Issue create(String catJson) {

		ObjectMapper mapper = new ObjectMapper();
		Issue newIssue = null;
		try {
			newIssue = mapper.readValue(catJson, Issue.class);
		} catch (Exception e) {
			System.out.println(e);
		}

		em.persist(newIssue);
		em.flush();
		
		String query = "select i from Issue i where i.id=(select max(id) from Issue)";
		newIssue = em.createQuery(query, Issue.class).getSingleResult();

		return newIssue;
	}

	@Override
	@Transactional
	public Issue destroy(int id) {

		Issue deleteIssue = em.find(Issue.class, id);

		try {
			em.remove(deleteIssue);
			em.flush();
			return deleteIssue;
		} catch (IllegalArgumentException iae) {
			iae.printStackTrace();
			return null;
		}

	}

}
