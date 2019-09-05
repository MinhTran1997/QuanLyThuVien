package intake09.fm14.controller;

import java.util.List;

import javax.validation.Valid;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import intake09.fm14.entity.BookTitle;
import intake09.fm14.service.BookTitleService;

@RestController
public class BookTitleController {
 
    @Autowired
    BookTitleService bookTitleService;
 
    @CrossOrigin
    @RequestMapping(value = "/bookTitle")
    public List<BookTitle> bookTitle() {
        return bookTitleService.getAll();
    }
    
    @CrossOrigin
    @RequestMapping(value = "/bookTitleDetail/{id_ISBN}", method = RequestMethod.GET)
    public List<BookTitle> bookTitleById(@PathVariable(value = "id_ISBN") Long id_ISBN) {
        return bookTitleService.getOneById(id_ISBN);
    }
    
    @CrossOrigin
    @RequestMapping(value = "/searchByContain/{name}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<BookTitle> searchByContainWork(@PathVariable String name)
    {
    	return bookTitleService.findByNameContainingWorks(name); }

    @CrossOrigin
    @RequestMapping(value = "/createBookTitle", method = RequestMethod.POST)
    public BookTitle createBookTitle(@Valid @RequestBody BookTitle bookTitle) {
        return bookTitleService.createBookTitle(bookTitle);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/deleteBookTitle/{id_ISBN}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteBookTitle(@PathVariable(value = "id_ISBN") Long id_ISBN) {
        return bookTitleService.deleteBookTitle(id_ISBN);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/updateBookTitle/{id_ISBN}", method = RequestMethod.PUT)
    public BookTitle updateBook(@PathVariable(value = "id_ISBN") Long id_ISBN, @Valid @RequestBody BookTitle bookTitle) {
        return bookTitleService.updateBookTitle(id_ISBN, bookTitle);
    }
    
}