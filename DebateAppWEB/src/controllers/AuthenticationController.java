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

import data.UserDAOI;
import entities.User;
import security.JsonWebTokenGenerator;

@RestController
public class AuthenticationController implements AuthenticationControllerI {
	@Autowired
	JsonWebTokenGenerator jwtGen;

	@Autowired
	UserDAOI userDao;

//	@Override
//	@RequestMapping(value = "/login", method = RequestMethod.POST)
//	public Map<String, String> login(HttpServletRequest req, HttpServletResponse res,
//			@RequestBody String userJsonString) {
//		ObjectMapper mapper = new ObjectMapper();
//		User user = null;
//		try {
//			System.out.println("USER JSON STRING: " + userJsonString);
//			user = mapper.readValue(userJsonString, User.class);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//
//		try {
//			user = userDao.authenticateUser(user);
//		} catch (Exception e) {
//			e.printStackTrace();
//			res.setStatus(401);
//			return null;
//		}
//
//		String jws = jwtGen.generateUserJwt(user);
//		Map<String, String> responseJson = new HashMap<>();
//		responseJson.put("jwt", jws);
//		return responseJson;
//	}

	// @RequestMapping(value = "/register", method = RequestMethod.POST)
	// public User signup(HttpServletRequest req, HttpServletResponse res,
	// @RequestBody String userJson) { //
	// ObjectMapper mapper = new ObjectMapper(); // Instantiate a new request
	// // mapper for the conversion
	// // from user JSON String
	// // into user java object
	// User user = null; // Instantiate a new null user object to hold mapped
	// // JSON data
	// try {
	// user = mapper.readValue(userJson, User.class); // Convert JSON
	// // String user data
	// // to user object
	// } catch (IOException ie) {
	// ie.printStackTrace();
	// res.setStatus(422); // Set to status 422 in event of failure
	// return null;
	// }
	// res.setStatus(201); // Set status to 201 for success
	// return userDao.create(user); // return persisted User object with
	// // encrypted password
	// }

	@Override
	@RequestMapping(path = "/auth", method = RequestMethod.POST)
	public Map<String, String> login(HttpServletRequest req, HttpServletResponse res, @RequestBody String userJson) {

		ObjectMapper mapper = new ObjectMapper();
		User u = null;

		try {
			u = mapper.readValue(userJson, User.class);
		} catch (Exception e) {
			System.out.println(e);
		}

		try {
			u = userDao.login(u);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(401);
			return null;
		}

		String jws = jwtGen.generateUserJwt(u);
		Map<String, String> responseJson = new HashMap<>();
		responseJson.put("jwt", jws);
		return responseJson;
	}

	@Override
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public Map<String, String> signup(HttpServletRequest req, HttpServletResponse res, @RequestBody String userJson) {

		User user = userDao.create(userJson);
		String jws = jwtGen.generateUserJwt(user);
		Map<String, String> responseJson = new HashMap<>();
		responseJson.put("jwt", jws);
		return responseJson;
	}

	@Override
	@RequestMapping("/unauthorized")
	public Map<String, String> unauthorized(HttpServletRequest req, HttpServletResponse res) {
		res.setStatus(401);
		Map<String, String> errorJson = new HashMap<>();
		errorJson.put("error", "your request lacks the proper authorization");
		return errorJson;
	}

}
