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

import intake09.fm14.entity.ReturnBooksDetail;
import intake09.fm14.service.ReturnBooksDetailService;

@RestController
public class ReturnBooksDetailController {
	@Autowired
	ReturnBooksDetailService returnBooksDetailService;
 
    @CrossOrigin
    @RequestMapping(value = "/returnBooksDetail")
    public List<ReturnBooksDetail> ReturnBooksDetail() {
        return returnBooksDetailService.getAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/createReturnBooksDetail", method = RequestMethod.POST)
    public ReturnBooksDetail createReturnBooksDetail(@Valid @RequestBody ReturnBooksDetail ReturnBooksDetail) {
        return returnBooksDetailService.createReturnBooksDetail(ReturnBooksDetail);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/returnBooksDetailById/{id_PhieuTra}", method = RequestMethod.GET)
    public List<ReturnBooksDetail> ReturnBooksDetailById(@PathVariable(value = "id_PhieuTra") Long id_PhieuTra) {
        return returnBooksDetailService.getAllById(id_PhieuTra);
    }
    
    @CrossOrigin
    @RequestMapping(value = "/deleteReturnBooksDetail/{id_PhieuTra}&{barcode}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteReturnBooksDetail(@PathVariable(value = "id_PhieuTra") Long id_PhieuTra, @PathVariable(value = "barcode") Long barcode) {
        return returnBooksDetailService.deleteReturnBooksDetail(id_PhieuTra, barcode);
    }
 
    @CrossOrigin
    @RequestMapping(value = "/updateReturnBooksDetail/{id_PhieuTra}&{barcode}", method = RequestMethod.PUT)
    public ReturnBooksDetail updateReturnBooksDetail(@PathVariable(value = "id_PhieuTra") Long id_PhieuTra, @PathVariable(value = "barcode") Long barcode, @Valid @RequestBody ReturnBooksDetail ReturnBooksDetail) {
        return returnBooksDetailService.updateReturnBooksDetail(id_PhieuTra, barcode, ReturnBooksDetail);
    }
}
