package intake09.fm14.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import intake09.fm14.entity.BorrowBooks;
import intake09.fm14.repository.BorrowBooksRepository;

@Service
public class BorrowBooksService {
	@Autowired
    BorrowBooksRepository borrowBooksRepo;
 
    public List<BorrowBooks> getAll() {
        return (List<BorrowBooks>) borrowBooksRepo.findAll();
    }
 
    public BorrowBooks createBorrowBooks(BorrowBooks BorrowBooks) {
        return borrowBooksRepo.save(BorrowBooks);
    }
    
    public BorrowBooks updateBorrowBooks(Long id_PHIEUMUON, BorrowBooks BorrowBooksEntity) {
    	BorrowBooks updatedSample;
        Optional<BorrowBooks> searchEntity = borrowBooksRepo.findById(id_PHIEUMUON);
        if (searchEntity.isPresent()) {
        	BorrowBooks borrowBooks = searchEntity.get();
        	borrowBooks.setNgayLapPM(BorrowBooksEntity.getNgayLapPM());
            updatedSample = borrowBooksRepo.save(borrowBooks);
        } else {
            throw new EntityNotFoundException();
        }
        return updatedSample;
    }
    
    public ResponseEntity<Object> deleteBorrowBooks(Long id_PHIEUMUON) {
        Optional<BorrowBooks> borrowBooksEntity = borrowBooksRepo.findById(id_PHIEUMUON);
        if (borrowBooksEntity.isPresent()) {
            BorrowBooks borrowBooks = borrowBooksEntity.get();
            borrowBooksRepo.delete(borrowBooks);
        } else {
            throw new EntityNotFoundException();
        }
        return ResponseEntity.ok().build();
    }
}
