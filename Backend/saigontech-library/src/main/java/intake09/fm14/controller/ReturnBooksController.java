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

import intake09.fm14.entity.ReturnBooks;
import intake09.fm14.service.ReturnBooksService;

@RestController
public class ReturnBooksController {
	@Autowired
	ReturnBooksService returnBooksService;
 
    @CrossOrigin
    @RequestMapping(value = "/returnBooks")
    public List<ReturnBooks> ReturnBooks() {
        return returnBooksService.getAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/createReturnBooks", method = RequestMethod.POST)
    public ReturnBooks createPublisher(@Valid @RequestBody ReturnBooks returnBooks) {
        return returnBooksService.createReturnBooks(returnBooks);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/deleteReturnBooks/{id_PhieuTra}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteReturnBooks(@PathVariable(value = "id_PhieuTra") Long id_PhieuTra) {
        return returnBooksService.deleteReturnBooks(id_PhieuTra);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/updateReturnBooks/{id_PhieuTra}", method = RequestMethod.PUT)
    public ReturnBooks updateReturnBooks(@PathVariable(value = "id_PhieuTra") Long id_PhieuTra, @Valid @RequestBody ReturnBooks returnBooks) {
        return returnBooksService.updateReturnBooks(id_PhieuTra, returnBooks);
    }
}
