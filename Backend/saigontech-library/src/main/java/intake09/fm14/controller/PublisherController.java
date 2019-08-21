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

import intake09.fm14.entity.Publisher;
import intake09.fm14.service.PublisherService;

@RestController
public class PublisherController {

	@Autowired
    PublisherService publisherService;
 
    @CrossOrigin
    @RequestMapping(value = "/publisher")
    public List<Publisher> publisher() {
        return publisherService.getAll();
    }
    
    @CrossOrigin
    @RequestMapping(value = "/publisher/{id_NXB}", method = RequestMethod.GET)
    public List<Publisher> publisherNameById(@PathVariable(value = "id_NXB") Long id_NXB)
    {
    	return publisherService.getNameById(id_NXB);
    }

    @CrossOrigin
    @RequestMapping(value = "/createPublisher", method = RequestMethod.POST)
    public Publisher createPublisher(@Valid @RequestBody Publisher publisher) {
        return publisherService.createPublisher(publisher);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/deletePublisher/{id_NXB}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deletePublisher(@PathVariable(value = "id_NXB") Long id_NXB) {
        return publisherService.deletePublisher(id_NXB);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/updatePublisher/{id_NXB}", method = RequestMethod.PUT)
    public Publisher updatePublisher(@PathVariable(value = "id_NXB") Long id_NXB, @Valid @RequestBody Publisher publisher) {
        return publisherService.updatePublisher(id_NXB, publisher);
    }

}
