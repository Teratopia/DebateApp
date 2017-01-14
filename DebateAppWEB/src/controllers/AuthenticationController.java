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
		System.out.println("IN AUTH CONTROLLER SIGNUP 1");

		User user = userDao.create(userJson);
		System.out.println("IN AUTH CONTROLLER SIGNUP. USER:");
		System.out.println(user);
		String jws = jwtGen.generateUserJwt(user);
		System.out.println("IN AUTH CONTROLLER SIGNUP. JWT:");
		System.out.println(jws);
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
