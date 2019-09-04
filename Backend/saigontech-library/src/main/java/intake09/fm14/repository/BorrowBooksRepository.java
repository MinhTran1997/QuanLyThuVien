package intake09.fm14.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import intake09.fm14.entity.BorrowBooks;

@Repository
public interface BorrowBooksRepository extends JpaRepository<BorrowBooks, Long> {
	@Query("SELECT id_PhieuMuon FROM BorrowBooks WHERE reader.id_TheDG = ?1")
	List<Long> findIdByReader(Long id_TheDG);
}
