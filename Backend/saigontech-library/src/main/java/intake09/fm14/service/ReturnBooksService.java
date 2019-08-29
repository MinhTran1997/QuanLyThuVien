package intake09.fm14.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import intake09.fm14.entity.ReturnBooks;
import intake09.fm14.repository.ReturnBooksRepository;

@Service
public class ReturnBooksService {
	@Autowired
	ReturnBooksRepository returnBooksRepository;
 
    public List<ReturnBooks> getAll() {
        return (List<ReturnBooks>) returnBooksRepository.findAll();
    }
 
    public ReturnBooks createReturnBooks(ReturnBooks returnBooks) {
        return returnBooksRepository.save(returnBooks);
    }
    
    public ReturnBooks updateReturnBooks(long id_PhieuTra, ReturnBooks returnBooksEntity) {
    	ReturnBooks update;
    	Optional<ReturnBooks> searchEntity = returnBooksRepository.findById(id_PhieuTra);
    	if (searchEntity.isPresent()) {
    		ReturnBooks returnBooks = searchEntity.get();
    		returnBooks.setNgayLapPT(returnBooksEntity.getNgayLapPT());
    		update = returnBooksRepository.save(returnBooks);
    	} else {
            throw new EntityNotFoundException();
        }
    	return update;
    }
    
    public ResponseEntity<Object> deleteReturnBooks(Long id_PhieuTra) {
        Optional<ReturnBooks> returnBooksEntity = returnBooksRepository.findById(id_PhieuTra);
        if (returnBooksEntity.isPresent()) {
        	ReturnBooks returnBooks = returnBooksEntity.get();
        	returnBooksRepository.delete(returnBooks);
        } else {
            throw new EntityNotFoundException();
        }
        return ResponseEntity.ok().build();
    }
}
