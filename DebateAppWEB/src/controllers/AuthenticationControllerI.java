
package controllers;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestBody;

public interface AuthenticationControllerI {

	public Map<String, String> login(HttpServletRequest req, HttpServletResponse res, @RequestBody String userJsonString);
	public Map<String, String> signup(HttpServletRequest req, HttpServletResponse res, @RequestBody String userJson);
	public Map<String, String> unauthorized(HttpServletRequest req, HttpServletResponse res);
}
