package intake09.fm14.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import intake09.fm14.entity.Subject;
import intake09.fm14.repository.SubjectRepository;

@Service
public class SubjectService {
	@Autowired
	SubjectRepository subjectRepo;
 
    public List<Subject> getAll() {
        return (List<Subject>) subjectRepo.findAll();
    }
    
    public List<Subject> getNameById(Long id_LoaiSach)
    {
    	return (List<Subject>) subjectRepo.subjectById(id_LoaiSach);
    }
 
    public Subject createPublisher(Subject subject) {
        return subjectRepo.save(subject);
    }
    
    public Subject updatePublisher(Long id_TenLoaiSach, Subject subjectEntity) {
    	Subject updatedSubject;
        Optional<Subject> searchEntity = subjectRepo.findById(id_TenLoaiSach);
        if (searchEntity.isPresent()) {
        	Subject subject = searchEntity.get();
        	subject.setTenLoaiSach(subjectEntity.getTenLoaiSach());
            updatedSubject = subjectRepo.save(subject);
        } else {
            throw new EntityNotFoundException();
        }
        return updatedSubject;
    }
    
    public ResponseEntity<Object> deletePublisher(Long id_TenLoaiSach) {
        Optional<Subject> subjectEntity = subjectRepo.findById(id_TenLoaiSach);
        if (subjectEntity.isPresent()) {
        	Subject subject = subjectEntity.get();
        	subjectRepo.delete(subject);
        } else {
            throw new EntityNotFoundException();
        }
        return ResponseEntity.ok().build();
    }
}
