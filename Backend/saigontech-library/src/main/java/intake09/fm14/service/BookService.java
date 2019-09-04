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
 
    public List<Book> getAllByISBN(Long id_ISBN)
    {
    	return (List<Book>) bookRepo.findAll(id_ISBN);
    }
    
    public List<Book> getAllByBarcode(Long barcode)
    {
    	return (List<Book>) bookRepo.findAllByBarcode(barcode);
    }
    
    public List<Book> getAllBorrowedBooks(String trangThai)
    {
    	return (List<Book>) bookRepo.findAllBorrowedBooks(trangThai);
    }
    
    public Long checkExistBarcodeByStatus(Long barcode)
    {
    	return (Long) bookRepo.checkExistBarcodeByStatus(barcode);
    }
    
    public Book createBook(Book book) {
        return bookRepo.save(book);
    }
    
    public Book updateBook(Long barcode, Book bookEntity) {
    	Book updatedBook;
        Optional<Book> searchEntity = bookRepo.findById(barcode);
        if (searchEntity.isPresent()) {
        	Book book = searchEntity.get();
        	book.setTrangThai(bookEntity.getTrangThai());
            updatedBook = bookRepo.save(book);
        } else {
            throw new EntityNotFoundException();
        }
        return updatedBook;
    }
    
    public ResponseEntity<Object> deleteBook(Long barcode) {
        Optional<Book> bookEntity = bookRepo.findById(barcode);
        if (bookEntity.isPresent()) {
        	Book book = bookEntity.get();
        	bookRepo.delete(book);
        } else {
            throw new EntityNotFoundException();
        }
        return ResponseEntity.ok().build();
    }
}
