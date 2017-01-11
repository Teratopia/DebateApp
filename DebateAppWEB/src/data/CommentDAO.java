package data;

import java.util.Collection;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EntityManager;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Comment;
import entities.Debate;
import entities.User;

@Repository
@Transactional
public class CommentDAO implements CommentDAOI {
	@PersistenceContext
	private EntityManager em;
	

	public Collection<Comment> index() {
		String query = "Select c from Comment c";
		return em.createQuery(query, Comment.class).getResultList();
	}

	public Comment show(int id) {
		return em.find(Comment.class, id);
	}

	public Comment update(int id, String commentJson) {
		ObjectMapper mapper = new ObjectMapper();
		Comment updatedComment = null;
		try {
			updatedComment = mapper.readValue(commentJson, Comment.class);
			System.out.println(commentJson);
			System.out.println(updatedComment);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		Comment oldComment = em.find(Comment.class, id);
		oldComment.setUser(updatedComment.getUser());
		oldComment.setDebate(updatedComment.getDebate());
		oldComment.setText(updatedComment.getText());
		oldComment.setTimeStamp(updatedComment.getTimeStamp());

		em.flush();
		return em.find(Comment.class, oldComment.getId());
	}

	public Comment create(String commentJson) {
		ObjectMapper mapper = new ObjectMapper();
		Comment newComment = null;
		try {
			newComment = mapper.readValue(commentJson, Comment.class);
			System.out.println(commentJson);
			System.out.println(newComment);
		} catch (Exception e) {
			e.printStackTrace();
		}

		em.persist(newComment);
		em.flush();
		System.out.println(newComment);
		return em.find(Comment.class, newComment.getId());
	}

	public Comment destroy(int id) {
		
		Comment deletedComment = em.find(Comment.class, id);
		try {
			em.remove(deletedComment);
			em.flush();
			return deletedComment;
		} catch (IllegalArgumentException iae) {
			iae.printStackTrace();
			return null;
		}
	}
}
