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
 
import intake09.fm14.entity.Book;
import intake09.fm14.service.BookService;
 
@RestController
public class BookController {
 
    @Autowired
    BookService bookService;
 
    @CrossOrigin
    @RequestMapping(value = "/book")
    public List<Book> book() {
        return bookService.getAll();
    }
 
    @CrossOrigin
    @RequestMapping(value = "/createBook", method = RequestMethod.POST)
    public Book createBook(@Valid @RequestBody Book book) {
        return bookService.createBook(book);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/deleteBook/{id_ISBN}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteBook(@PathVariable(value = "id_ISBN") Long id_ISBN) {
        return bookService.deleteBook(id_ISBN);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/updateBook/{id_ISBN}", method = RequestMethod.PUT)
    public Book updateBook(@PathVariable(value = "id_ISBN") Long id_ISBN,
            @Valid @RequestBody Book book) {
        return bookService.updateBook(id_ISBN, book);
    }
 
}
