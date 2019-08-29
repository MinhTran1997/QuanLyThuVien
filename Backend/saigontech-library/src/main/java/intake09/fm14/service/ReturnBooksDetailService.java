package intake09.fm14.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import intake09.fm14.entity.ReturnBooksDetail;
import intake09.fm14.repository.ReturnBooksDetailRepository;

@Service
public class ReturnBooksDetailService {
	@Autowired
    ReturnBooksDetailRepository returnBooksDetailRepo;
 
    public List<ReturnBooksDetail> getAll() {
        return (List<ReturnBooksDetail>) returnBooksDetailRepo.findAll();
    }
 
    public List<ReturnBooksDetail> getAllById(Long id_PhieuTra)
    {
    	return (List<ReturnBooksDetail>) returnBooksDetailRepo.findAll(id_PhieuTra);
    }
    
    public ReturnBooksDetail createReturnBooksDetail(ReturnBooksDetail returnBooksDetail) {
        return returnBooksDetailRepo.save(returnBooksDetail);
    }
    
    public ReturnBooksDetail updateReturnBooksDetail(Long id_PhieuMuon, Long barcode, ReturnBooksDetail returnBooksDetailEntity) {
    	ReturnBooksDetail updatedReturnBooks;
        Optional<ReturnBooksDetail> searchEntity = returnBooksDetailRepo.findByIdAndBarcode(id_PhieuMuon, barcode);
        if (searchEntity.isPresent()) {
        	ReturnBooksDetail returnBooksDetail = searchEntity.get();
        	returnBooksDetail.setNgayTra(returnBooksDetailEntity.getNgayTra());
            updatedReturnBooks = returnBooksDetailRepo.save(returnBooksDetail);
        } else {
            throw new EntityNotFoundException();
        }
        return updatedReturnBooks;
    }
    
    public ResponseEntity<Object> deleteReturnBooksDetail(Long id_PhieuMuon, Long barcode) {
        Optional<ReturnBooksDetail> returnBooksDetailEntity = returnBooksDetailRepo.findByIdAndBarcode(id_PhieuMuon, barcode);
        if (returnBooksDetailEntity.isPresent()) {
        	ReturnBooksDetail returnBooksDetail = returnBooksDetailEntity.get();
        	returnBooksDetailRepo.delete(returnBooksDetail);
        } else {
            throw new EntityNotFoundException();
        }
        return ResponseEntity.ok().build();
    }
}
