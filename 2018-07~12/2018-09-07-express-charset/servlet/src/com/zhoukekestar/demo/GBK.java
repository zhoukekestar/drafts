package com.zhoukekestar.demo;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.connector.Request;

/**
 * Servlet implementation class HelloWorld
 */
@WebServlet("/GBK")
public class GBK extends HttpServlet {

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 设置为 GBK 编码
		request.setCharacterEncoding("GBK");

		String name =request.getParameter("name");

		response.setContentType("text/html; charset=utf-8");
		response.getWriter().append("Hello " + name);
	}
}
