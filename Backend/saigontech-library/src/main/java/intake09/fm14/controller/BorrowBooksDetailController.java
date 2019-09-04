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

import intake09.fm14.entity.BorrowBooksDetail;
import intake09.fm14.entity.Reader;
import intake09.fm14.service.BorrowBooksDetailService;

@RestController
public class BorrowBooksDetailController {
	@Autowired
	BorrowBooksDetailService borrowBookDetailService;
 
    @CrossOrigin
    @RequestMapping(value = "/borrowBooksDetail")
    public List<BorrowBooksDetail> BorrowBooksDetail() {
        return borrowBookDetailService.getAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/createBorrowBooksDetail", method = RequestMethod.POST)
    public BorrowBooksDetail createBorrowBooksDetail(@Valid @RequestBody BorrowBooksDetail borrowBooksDetail) {
        return borrowBookDetailService.createBorrowBooksDetail(borrowBooksDetail);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/borrowBooksDetailById/{id_PhieuMuon}", method = RequestMethod.GET)
    public List<BorrowBooksDetail> borrowBooksDetailById(@PathVariable(value = "id_PhieuMuon") Long id_PhieuMuon) {
        return borrowBookDetailService.getAllById(id_PhieuMuon);
    }
    
    @CrossOrigin
    @RequestMapping(value = "/borrowBooksDetailByManyId/{id_PhieuMuon}", method = RequestMethod.GET)
    public List<Object> borrowBooksDetailById(@PathVariable(value = "id_PhieuMuon") List<Long> id_PhieuMuon) {
        return borrowBookDetailService.getAllByManyId(id_PhieuMuon);
    }
    
    @CrossOrigin
    @RequestMapping(value = "/borrowBooksDetailByBarcode/{barcode}", method = RequestMethod.GET)
    public List<Object> borrowBooksDetailByReader(@PathVariable(value = "barcode") Long barcode) {
        return borrowBookDetailService.getAllByBarcode(barcode);
    }
    
    @CrossOrigin
    @RequestMapping(value = "/readerByBarcode/{barcode}", method = RequestMethod.GET)
    public Reader readerByBarcode(@PathVariable(value = "barcode") Long barcode) {
        return borrowBookDetailService.getReaderByBarcode(barcode);
    }
    
    @CrossOrigin
    @RequestMapping(value = "/checkExistBarcode/{barcode}", method = RequestMethod.GET)
    public Long checkExistBarcode(@PathVariable(value = "barcode") Long barcode) {
        return borrowBookDetailService.checkExistBarcode(barcode);
    }
    
    @CrossOrigin
    @RequestMapping(value = "/deleteBorrowBooksDetail/{id_PhieuMuon}&{barcode}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteBorrowBooksDetail(@PathVariable(value = "id_PhieuMuon") Long id_PhieuMuon, @PathVariable(value = "barcode") Long barcode) {
        return borrowBookDetailService.deleteBorrowBooksDetail(id_PhieuMuon, barcode);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/updateBorrowBooksDetail/{id_PhieuMuon}&{barcode}", method = RequestMethod.PUT)
    public BorrowBooksDetail updateBorrowBooksDetail(@PathVariable(value = "id_PhieuMuon") Long id_PhieuMuon, @PathVariable(value = "barcode") Long barcode, @Valid @RequestBody BorrowBooksDetail borrowBooksDetail) {
        return borrowBookDetailService.updateBorrowBooksDetail(id_PhieuMuon, barcode, borrowBooksDetail);
    }
}
