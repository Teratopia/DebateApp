package data;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import entities.User;


@Repository
@Transactional
public class UserDAO implements UserDAOI {
  @PersistenceContext
  EntityManager em;

  @Autowired
  BCryptPasswordEncoder passwordEncoder;

  public User create(User user) {
    // extract raw password
    String rawPassword = user.getPassword();
    // encode raw password
    String encodedPassword = passwordEncoder.encode(rawPassword);
    // reset the user's password to the encoded one
    user.setPassword(encodedPassword);
    // persist the user
    em.persist(user);
    // force EntityManager to persist immediately
    em.flush();
    // return the persisted user
    return user;
  }

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
}