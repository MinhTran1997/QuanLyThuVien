package intake09.fm14.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import intake09.fm14.entity.Librarian;
import intake09.fm14.service.LibrarianService;

@RestController
public class LibrarianController {
	
	@Autowired
	LibrarianService librarianService;
	
	 @CrossOrigin
	 @RequestMapping(value = "/librarians")
	 public List<Librarian> book() {
		 return librarianService.getAll();
	 }
}
