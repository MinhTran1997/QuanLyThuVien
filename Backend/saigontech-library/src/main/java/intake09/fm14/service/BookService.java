package intake09.fm14.service;

import java.util.List;
import java.util.Optional;
 
import javax.persistence.EntityNotFoundException;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import intake09.fm14.entity.Book;
import intake09.fm14.repository.BookRepository;

@Service
public class BookService {
	@Autowired
    BookRepository bookRepo;
 
    public List<Book> getAll() {
        return (List<Book>) bookRepo.findAll();
    }
 
    public Book createBook(Book book) {
        return bookRepo.save(book);
    }
    
    public Book updateBook(Long Id, Book bookEntity) {
    	Book updatedSample;
        Optional<Book> searchEntity = bookRepo.findById(Id);
        if (searchEntity.isPresent()) {
        	Book book = searchEntity.get();
            book.setTenDS(bookEntity.getTenDS());
            book.setTomLuocNoiDung(bookEntity.getTomLuocNoiDung());
            book.setKhoSach(bookEntity.getKhoSach());
            book.setSoTrang(bookEntity.getSoTrang());
            book.setSoTrang(bookEntity.getSoTrang());
            book.setDinhKem(bookEntity.getDinhKem());
            book.setViTri(bookEntity.getViTri());
            book.setNgonNgu(bookEntity.getNgonNgu());
            book.setPhienBan(bookEntity.getPhienBan());
            book.setNamXuatBan(bookEntity.getNamXuatBan());
            updatedSample = bookRepo.save(book);
        } else {
            throw new EntityNotFoundException();
        }
        return updatedSample;
    }
    
    public ResponseEntity<Object> deleteBook(Long Id) {
        Optional<Book> bookEntity = bookRepo.findById(Id);
        if (bookEntity.isPresent()) {
            Book book = bookEntity.get();
            bookRepo.delete(book);
        } else {
            throw new EntityNotFoundException();
        }
        return ResponseEntity.ok().build();
    }
}
