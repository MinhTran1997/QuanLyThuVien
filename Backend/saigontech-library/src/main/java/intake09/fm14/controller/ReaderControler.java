package intake09.fm14.controller;

import java.util.List;

import javax.validation.Valid;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import intake09.fm14.entity.Reader;
import intake09.fm14.service.ReaderService;
 
@RestController
public class ReaderControler {
    @Autowired
    ReaderService readerService;
 
    @CrossOrigin
    @RequestMapping(value = "/reader")
    public List<Reader> reader() {
        return readerService.getAll();
    }
    
    @CrossOrigin
    @RequestMapping(value = "/thongKeDG", method = RequestMethod.GET)
    public List<Object> thongKeDG(String username_DG) {
        return readerService.thongKeDG(username_DG);
    }

    @CrossOrigin
    @RequestMapping(value = "/createReader", method = RequestMethod.POST)
    public Reader createReader(@Valid @RequestBody Reader reader) {
        return readerService.createReader(reader);
    }
    
    @CrossOrigin
    @RequestMapping(value = "/deleteReader/{id_DG}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteAuthor(@PathVariable(value = "id_DG") Long id_DG) {
        return readerService.deleteReader(id_DG);
    }
    
 
    @CrossOrigin
    @RequestMapping(value = "/updateReader/{id_THEDG}", method = RequestMethod.PUT)
    public Reader updateReader(@PathVariable(value = "id_THEDG") Long id_THEDG, @Valid @RequestBody Reader reader) {
        return readerService.updateReader(id_THEDG, reader);
    }
 
}