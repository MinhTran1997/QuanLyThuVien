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

import intake09.fm14.entity.BorrowBooks;
import intake09.fm14.service.BorrowBooksService;

@RestController
public class BorrowBooksController {
	@Autowired
    BorrowBooksService BorrowBooksService;
 
    @CrossOrigin
    @RequestMapping(value = "/borrowBooks")
    public List<BorrowBooks> BorrowBooks() {
        return BorrowBooksService.getAll();
    }
    
    @CrossOrigin
    @RequestMapping(value = "/borrowBooksIdByReader/{id_TheDG}", method = RequestMethod.GET)
    public List<Long> borrowBooksIdByReader(@PathVariable(value = "id_TheDG") Long id_TheDG) {
        return BorrowBooksService.getIdByReader(id_TheDG);
    }

    @CrossOrigin
    @RequestMapping(value = "/createBorrowBooks", method = RequestMethod.POST)
    public BorrowBooks createBorrowBooks(@Valid @RequestBody BorrowBooks BorrowBooks) {
        return BorrowBooksService.createBorrowBooks(BorrowBooks);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/deleteBorrowBooks/{id_phieuMuon}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteBorrowBooks(@PathVariable(value = "id_phieuMuon") Long id_phieuMuon) {
        return BorrowBooksService.deleteBorrowBooks(id_phieuMuon);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/updateBorrowBooks/{id_phieuMuon}", method = RequestMethod.PUT)
    public BorrowBooks updateBook(@PathVariable(value = "id_phieuMuon") Long id_phieuMuon, @Valid @RequestBody BorrowBooks BorrowBooks) {
        return BorrowBooksService.updateBorrowBooks(id_phieuMuon, BorrowBooks);
    }
}
