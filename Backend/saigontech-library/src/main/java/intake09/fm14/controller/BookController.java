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
    @RequestMapping(value = "/bookByISBN/{id_ISBN}", method = RequestMethod.GET)
    public List<Book> bookByISBN(@PathVariable(value = "id_ISBN") Long id_ISBN) {
        return bookService.getAllByISBN(id_ISBN);
    }
    
    @CrossOrigin
    @RequestMapping(value = "/deleteBook/{barcode}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteBook(@PathVariable(value = "barcode") Long barcode) {
        return bookService.deleteBook(barcode);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/updateBook/{barcode}", method = RequestMethod.PUT)
    public Book updateBook(@PathVariable(value = "barcode") Long barcode, @Valid @RequestBody Book book) {
        return bookService.updateBook(barcode, book);
    }
}
