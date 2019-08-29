package intake09.fm14.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import intake09.fm14.entity.BorrowBooksDetail;
import intake09.fm14.repository.BorrowBooksDetailRepository;

@Service
public class BorrowBooksDetailService {
	@Autowired
    BorrowBooksDetailRepository borrowBooksDetailRepo;
 
    public List<BorrowBooksDetail> getAll() {
        return (List<BorrowBooksDetail>) borrowBooksDetailRepo.findAll();
    }
 
    public List<BorrowBooksDetail> getAllById(Long id_PhieuMuon)
    {
    	return (List<BorrowBooksDetail>) borrowBooksDetailRepo.findAll(id_PhieuMuon);
    }
    
    public BorrowBooksDetail createBorrowBooksDetail(BorrowBooksDetail borrowBooksDetail) {
        return borrowBooksDetailRepo.save(borrowBooksDetail);
    }
    
    public BorrowBooksDetail updateBorrowBooksDetail(Long id_PhieuMuon, Long barcode, BorrowBooksDetail borrowBooksDetailEntity) {
    	BorrowBooksDetail updatedBorrowBooks;
        Optional<BorrowBooksDetail> searchEntity = borrowBooksDetailRepo.findByIdAndBarcode(id_PhieuMuon, barcode);
        if (searchEntity.isPresent()) {
        	BorrowBooksDetail borrowBooksDetail = searchEntity.get();
        	borrowBooksDetail.setNgayHuaTra(borrowBooksDetailEntity.getNgayHuaTra());
            updatedBorrowBooks = borrowBooksDetailRepo.save(borrowBooksDetail);
        } else {
            throw new EntityNotFoundException();
        }
        return updatedBorrowBooks;
    }
    
    public ResponseEntity<Object> deleteBorrowBooksDetail(Long id_PhieuMuon, Long barcode) {
        Optional<BorrowBooksDetail> borrowBooksDetailEntity = borrowBooksDetailRepo.findByIdAndBarcode(id_PhieuMuon, barcode);
        if (borrowBooksDetailEntity.isPresent()) {
        	BorrowBooksDetail borrowBooksDetail = borrowBooksDetailEntity.get();
        	borrowBooksDetailRepo.delete(borrowBooksDetail);
        } else {
            throw new EntityNotFoundException();
        }
        return ResponseEntity.ok().build();
    }
}
