package controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.UserDAO;
import entities.User;
import security.JsonWebTokenGenerator;

@RestController
public class AuthenticationController implements AuthenticationControllerI{
	  @Autowired
	  JsonWebTokenGenerator jwtGen;
	  
	  // inject autowired UserDao: this DAO handles the creation and authentication requests to the mySQL DB
	  @Autowired
	  UserDAO userDao;  // Instantiate userDAO

	  // 
	  @RequestMapping(value = "/login", method = RequestMethod.POST) // tell Spring to route request coming from 'api/login' via a POST request method
	  public Map<String,String> login(HttpServletRequest req, HttpServletResponse res, @RequestBody String userJsonString) { // instantiate a String 'userJsonString' containing JSON information from request body
	    ObjectMapper mapper = new ObjectMapper(); // Instantiate a new request mapper for the conversion from user JSON String into user java object
	    User user = null; // Instantiate a new null user object to hold mapped JSON data
	    // Parse User from JSON
	    try {
	      System.out.println("USER JSON STRING: " + userJsonString); // print user JSON string for testing and confirmation purposes
	      user = mapper.readValue(userJsonString, User.class); // Convert JSON String user data to user object
	    } catch (Exception e) {
	      e.printStackTrace(); // Print stack trace in case of mapping failure
	    }
	    try {
	      user = userDao.authenticateUser(user);  // Find managed User, return it if password is correct. authenticateUser throws error if nothing is found.
	    } catch (Exception e) {
	      // User not authenticated. Return 401
	      e.printStackTrace();
	      res.setStatus(401);
	      return null;
	    }

	    // Create encoded JavaWebToken for User
	    String jws = jwtGen.generateUserJwt(user); // Assign WebToken to JWS (As a String)
	    Map<String, String> responseJson = new HashMap<>(); // Create a new HashMap for passing back to $Http request
	    responseJson.put("jwt", jws); // Put String JWS into responseJson HashMap
	    return responseJson; //Return case fur successful authentication
	  }

	  // 
	  @RequestMapping(value = "/register", method = RequestMethod.POST) // tell Spring to route request coming from 'api/registration' via a POST request method
	  public User signup(HttpServletRequest req, HttpServletResponse res, @RequestBody String userJson) { // 
	    ObjectMapper mapper = new ObjectMapper(); // Instantiate a new request mapper for the conversion from user JSON String into user java object
	    User user = null; // Instantiate a new null user object to hold mapped JSON data
	    try {
	      user = mapper.readValue(userJson, User.class); // Convert JSON String user data to user object
	    } catch (IOException ie) {
	      ie.printStackTrace();
	      res.setStatus(422); // Set to status 422 in event of failure
	      return null;
	    }
	    res.setStatus(201); // Set status to 201 for success
	    return userDao.create(user); // return persisted User object with encrypted password
	  }

	  // 
	  @RequestMapping(value = "/logout/{id}", method = RequestMethod.POST) // tell Spring to route request coming from 'api/registration' via a POST request method
	  public User logout(HttpServletRequest req, HttpServletResponse res, @RequestBody String userJson) { // 
	    ObjectMapper mapper = new ObjectMapper(); // Instantiate a new request mapper for the conversion from user JSON String into user java object
	    User user = null; // Instantiate a new null user object to hold mapped JSON data
	    try {
	      user = mapper.readValue(userJson, User.class); // Convert JSON String user data to user object
	    } catch (IOException ie) {
	      ie.printStackTrace();
	      res.setStatus(422); // Set to status 422 in event of failure
	      return null;
	    }
	    res.setStatus(201); // Set status to 201 for success
	    return userDao.create(user); // return persisted User object with encrypted password
	  }
}
