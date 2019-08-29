package intake09.fm14.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import intake09.fm14.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
	@Query("FROM Book WHERE id_ISBN = ?1")
	List<Book> findAll(Long id_ISBN);
	
	@Query("FROM Book WHERE barcode = ?1")
	List<Book> findAllByBarcode(Long barcode);
	
	@Query("FROM Book WHERE trangThai = ?1")
	List<Book> findAllBorrowedBooks(String trangThai);
}