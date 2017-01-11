package controllers;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface ErrorControllerI {

    public Map<String,String> unauthorized(HttpServletRequest req, HttpServletResponse res);
}
