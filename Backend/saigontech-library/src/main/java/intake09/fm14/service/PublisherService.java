package intake09.fm14.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import intake09.fm14.entity.Publisher;
import intake09.fm14.repository.PublisherRepository;

@Service
public class PublisherService {
	@Autowired
    PublisherRepository publisherRepo;
 
    public List<Publisher> getAll() {
        return (List<Publisher>) publisherRepo.findAll();
    }
    
    public List<Publisher> getNameById(Long id_NXB)
    {
    	return (List<Publisher>) publisherRepo.publisherById(id_NXB);
    }
 
    public Publisher createPublisher(Publisher publisher) {
        return publisherRepo.save(publisher);
    }
    
    public Publisher updatePublisher(Long id_NXB, Publisher publisherEntity) {
    	Publisher updatedPublisher;
        Optional<Publisher> searchEntity = publisherRepo.findById(id_NXB);
        if (searchEntity.isPresent()) {
        	Publisher publisher = searchEntity.get();
        	publisher.setTenNXB(publisherEntity.getTenNXB());
        	publisher.setDiaChiNXB(publisherEntity.getDiaChiNXB());
        	publisher.setSdtNXB(publisherEntity.getSdtNXB());
        	publisher.setEmailNXB(publisherEntity.getEmailNXB());
            updatedPublisher = publisherRepo.save(publisher);
        } else {
            throw new EntityNotFoundException();
        }
        return updatedPublisher;
    }
    
    public ResponseEntity<Object> deletePublisher(Long id_NXB) {
        Optional<Publisher> publisherEntity = publisherRepo.findById(id_NXB);
        if (publisherEntity.isPresent()) {
        	Publisher publisher = publisherEntity.get();
            publisherRepo.delete(publisher);
        } else {
            throw new EntityNotFoundException();
        }
        return ResponseEntity.ok().build();
    }
}
