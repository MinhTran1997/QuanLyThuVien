package intake09.fm14.service;

import java.util.List;
import java.util.Optional;
 
import javax.persistence.EntityNotFoundException;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import intake09.fm14.entity.Reader;
import intake09.fm14.repository.ReaderRepository;

@Service
public class ReaderService {
	@Autowired
	ReaderRepository readerRepo;
 
    public List<Reader> getAll() {
        return (List<Reader>) readerRepo.findAll();
    }
 
    public Reader createReader(Reader reader) {
        return readerRepo.save(reader);
    }
    
    public Reader updateReader(long id_THEDG, Reader readerEntity) {
    	Reader update;
    	Optional<Reader> searchEntity = readerRepo.findById(id_THEDG);
    	if (searchEntity.isPresent()) {
    		Reader reader = searchEntity.get();
    		reader.setHotenDG(readerEntity.getHotenDG());
    		reader.setSdt(readerEntity.getSdt());
    		reader.setEmailDG(readerEntity.getEmailDG());
    		reader.setDiaChi(readerEntity.getDiaChi());
    		reader.setNgaysinhDG(readerEntity.getNgaysinhDG());
    		reader.setGioiTinhDG(readerEntity.getGioiTinhDG());
    		reader.setHsdThe(readerEntity.getHsdThe());
//    		reader.setUsername_DG(reader.getUsername_DG());
//    		reader.setPassword_DG(readerEntity.getPassword_DG());
    		update = readerRepo.save(reader);
    	} else {
            throw new EntityNotFoundException();
        }
    	return update;
    }
    
    public ResponseEntity<Object> deleteReader(Long id_DG) {
        Optional<Reader> readerEntity = readerRepo.findById(id_DG);
        if (readerEntity.isPresent()) {
        	Reader reader = readerEntity.get();
        	readerRepo.delete(reader);
        } else {
            throw new EntityNotFoundException();
        }
        return ResponseEntity.ok().build();
    }
}
