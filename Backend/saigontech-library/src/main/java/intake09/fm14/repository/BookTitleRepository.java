package intake09.fm14.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import intake09.fm14.entity.Book;
import intake09.fm14.entity.BookTitle;
 
@Repository
public interface BookTitleRepository extends JpaRepository<BookTitle, Long> {
	@Query("FROM BookTitle WHERE id_ISBN = ?1")
	List<BookTitle> findOneById(Long id_ISBN);
	
	@Query("select w from BookTitle w where w.tenDS like %?1%")
	List<BookTitle> findByContainingName(String tenDS);
}