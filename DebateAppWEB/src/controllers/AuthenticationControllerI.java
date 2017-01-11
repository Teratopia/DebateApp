
package controllers;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestBody;

import entities.User;

public interface AuthenticationControllerI {

	public Map<String, String> login(HttpServletRequest req, HttpServletResponse res, String userJsonString);
	public User signup(HttpServletRequest req, HttpServletResponse res, @RequestBody String userJson);
}
