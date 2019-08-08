package intake09.fm14.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import intake09.fm14.entity.Book;
 
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
	
}