package data;

import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.User;


@Repository
@Transactional
public class UserDAO implements UserDAOI {
  @PersistenceContext
  EntityManager em;

  @Autowired
  BCryptPasswordEncoder passwordEncoder;

//  public User create(User user) {
//    String rawPassword = user.getPassword();     // extract raw password
//    String encodedPassword = passwordEncoder.encode(rawPassword);   // encode raw password
//    user.setPassword(encodedPassword); // reset the user's password to the encoded one
//    em.persist(user); // persist the user
//    em.flush(); // force EntityManager to persist immediately
//    return user; // return the persisted user
//  }

  public User authenticateUser(User user) throws NoResultException { // NoResultException can be caught front end and handled to present error message.
    // Find the managed user by its username
    User u = em.createQuery("SELECT u FROM User u where username = :username", User.class)
        .setParameter("username", user.getUsername())
        .getSingleResult();
    // One-way encrypt the provided password, see if the result matches the persisted password value
    if (passwordEncoder.matches(user.getPassword(), u.getPassword())) {
      return u;
    }
    return null;
  }

	@Override
	public Collection<User> index() {
		String query = "select t from User t where t.id > 0";
		Collection<User> Users = em.createQuery(query, User.class).getResultList();
		return Users;
	}

	@Override
	public User show(int id) {
		User User = em.find(User.class, id);
		return User;
	}

	@Override
	@Transactional
	public User update(int id, String UserJson) {
		
		ObjectMapper mapper = new ObjectMapper();
		User updateUser = null;
		try{
			updateUser = mapper.readValue(UserJson, User.class);
		}catch(Exception e){
			System.out.println(e);
		}
		
		User oldUser = show(id);
		oldUser.setArguments(updateUser.getArguments());
		oldUser.setComments(updateUser.getComments());
		oldUser.setGoodevil(updateUser.getGoodevil());
		oldUser.setLawfulchaotic(updateUser.getLawfulchaotic());
		oldUser.setPassword(updateUser.getPassword());
		oldUser.setTeams(updateUser.getTeams());
		oldUser.setType(updateUser.getType());
		oldUser.setUsername(updateUser.getUsername());
		oldUser.setPerfMember(updateUser.getPerfMember());
		
		em.flush();
		return em.find(User.class, id);
	}
	
	@Override
	@Transactional
	public User deactivate(int id) {
		
		User oldUser = show(id);
		oldUser.setType("DEACT");
		oldUser.setUsername("DeactAcct");
		
		em.flush();
		return em.find(User.class, id);
	}
	
	@Override
	@Transactional
	public User create(String userJson) {
		
		User newUser = null;
		ObjectMapper mapper = new ObjectMapper();
		try{
			newUser = mapper.readValue(userJson, User.class);
		}catch(Exception e){
			System.out.println(e);
		      return null;
		}

	    String rawPassword = newUser.getPassword();
	    String encodedPassword = passwordEncoder.encode(rawPassword);
	    newUser.setPassword(encodedPassword);
	    em.persist(newUser);
	    em.flush();

	    return newUser;
	  }
	
	@Override
	public User login(User user) throws NoResultException {
		 User u = em.createQuery("SELECT u FROM User u where username = :username", User.class)
			        .setParameter("username", user.getUsername())
			        .getSingleResult();
			    // One-way encrypt the provided password, see if the result matches the persisted password value
			    if (passwordEncoder.matches(user.getPassword(), u.getPassword())) {
			      return u;
			    }
		return new User();
	}

	@Override
	@Transactional
	public User destroy(int id) {
		
		User t = em.find(User.class, id);
		
		try {
			em.remove(t);
			em.flush();
			return t;
		} catch (IllegalArgumentException iae) {
			iae.printStackTrace();
			return null;
		}
		
	}
}