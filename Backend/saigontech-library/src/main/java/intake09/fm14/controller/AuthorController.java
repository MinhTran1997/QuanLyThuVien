package intake09.fm14.controller;

import java.util.List;

import javax.validation.Valid;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import intake09.fm14.entity.Author;
import intake09.fm14.service.AuthorService;

@RestController
public class AuthorController {
	@Autowired
	AuthorService authorService;
 
    @CrossOrigin
    @RequestMapping(value = "/author")
    public List<Author> author() {
        return authorService.getAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/createAuthor", method = RequestMethod.POST)
    public Author createAuthor(@Valid @RequestBody Author author) {
        return authorService.createAuthor(author);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/deleteAuthor/{id_TG}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteAuthor(@PathVariable(value = "id_TG") Long id_TG) {
        return authorService.deleteAuthor(id_TG);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/updateAuthor/{id_TG}", method = RequestMethod.PUT)
    public Author updateAuthor(@PathVariable(value = "id_TG") Long id_TG, @Valid @RequestBody Author author) {
        return authorService.updateAuthor(id_TG, author);
    }
}
