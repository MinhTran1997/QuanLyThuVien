package intake09.fm14.service;

import java.util.List;
import java.util.Optional;
 
import javax.persistence.EntityNotFoundException;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import intake09.fm14.entity.BookTitle;
import intake09.fm14.repository.BookTitleRepository;

@Service
public class BookTitleService {
	@Autowired
    BookTitleRepository bookTitleRepo;
 
    public List<BookTitle> getAll() {
        return (List<BookTitle>) bookTitleRepo.findAll();
    }
 
    public BookTitle createBookTitle(BookTitle bookTitle) {
        return bookTitleRepo.save(bookTitle);
    }
    
    public BookTitle updateBookTitle(Long id_ISBN, BookTitle bookTitleEntity) {
    	BookTitle updatedSample;
        Optional<BookTitle> searchEntity = bookTitleRepo.findById(id_ISBN);
        if (searchEntity.isPresent()) {
        	BookTitle bookTitle = searchEntity.get();
        	bookTitle.setId_LoaiSach(bookTitleEntity.getId_LoaiSach());
        	bookTitle.setPublisher(bookTitleEntity.getPublisher());
        	bookTitle.setTenDS(bookTitleEntity.getTenDS());
            bookTitle.setTomLuocNoiDung(bookTitleEntity.getTomLuocNoiDung());
            bookTitle.setKhoSach(bookTitleEntity.getKhoSach());
            bookTitle.setSoTrang(bookTitleEntity.getSoTrang());
            bookTitle.setDinhKem(bookTitleEntity.getDinhKem());
            bookTitle.setViTri(bookTitleEntity.getViTri());
            bookTitle.setNgonNgu(bookTitleEntity.getNgonNgu());
            bookTitle.setPhienBan(bookTitleEntity.getPhienBan());
            bookTitle.setNamXuatBan(bookTitleEntity.getNamXuatBan());
            bookTitle.setHinhAnh(bookTitleEntity.getHinhAnh());
            updatedSample = bookTitleRepo.save(bookTitle);
        } else {
            throw new EntityNotFoundException();
        }
        return updatedSample;
    }
    
    public BookTitle updateImage(Long id_ISBN, BookTitle bookTitleEntity) {
    	BookTitle updatedSample;
        Optional<BookTitle> searchEntity = bookTitleRepo.findById(id_ISBN);
        if (searchEntity.isPresent()) {
        	BookTitle bookTitle = searchEntity.get();
            bookTitle.setHinhAnh(bookTitleEntity.getHinhAnh());
            updatedSample = bookTitleRepo.save(bookTitle);
        } else {
            throw new EntityNotFoundException();
        }
        return updatedSample;
    }
    
    public ResponseEntity<Object> deleteBookTitle(Long id_ISBN) {
        Optional<BookTitle> bookTitleEntity = bookTitleRepo.findById(id_ISBN);
        if (bookTitleEntity.isPresent()) {
            BookTitle bookTitle = bookTitleEntity.get();
            bookTitleRepo.delete(bookTitle);
        } else {
            throw new EntityNotFoundException();
        }
        return ResponseEntity.ok().build();
    }
    
    public List<BookTitle> getOneById(Long id_ISBN)
    {
    	return (List<BookTitle>) bookTitleRepo.findOneById(id_ISBN);
    }
}
