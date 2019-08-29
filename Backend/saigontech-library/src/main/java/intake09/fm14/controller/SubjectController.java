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

import intake09.fm14.entity.Subject;
import intake09.fm14.service.SubjectService;

@RestController
public class SubjectController {
	@Autowired
	SubjectService subjectService;
 
    @CrossOrigin
    @RequestMapping(value = "/subject")
    public List<Subject> publisher() {
        return subjectService.getAll();
    }
    
    @CrossOrigin
    @RequestMapping(value = "/subject/{id_TenLoaiSach}", method = RequestMethod.GET)
    public List<Subject> subjectNameById(@PathVariable(value = "id_TenLoaiSach") Long id_TenLoaiSach)
    {
    	return subjectService.getNameById(id_TenLoaiSach);
    }

    @CrossOrigin
    @RequestMapping(value = "/createSubject", method = RequestMethod.POST)
    public Subject createPublisher(@Valid @RequestBody Subject subject) {
        return subjectService.createPublisher(subject);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/deleteSubject/{id_TenLoaiSach}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteSubject(@PathVariable(value = "id_TenLoaiSach") Long id_TenLoaiSach) {
        return subjectService.deletePublisher(id_TenLoaiSach);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/updateSubject/{id_TenLoaiSach}", method = RequestMethod.PUT)
    public Subject updatePublisher(@PathVariable(value = "id_TenLoaiSach") Long id_NXB, @Valid @RequestBody Subject id_TenLoaiSach) {
        return subjectService.updatePublisher(id_NXB, id_TenLoaiSach);
    }

}
