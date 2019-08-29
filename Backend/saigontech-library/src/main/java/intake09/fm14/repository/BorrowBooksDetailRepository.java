package intake09.fm14.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import intake09.fm14.entity.BorrowBooksDetail;

@Repository
public interface BorrowBooksDetailRepository extends JpaRepository<BorrowBooksDetail, Long> {
	@Query("FROM BorrowBooksDetail WHERE id.id_PhieuMuon = ?1")
	List<BorrowBooksDetail> findAll(Long id_PhieuMuon);
	
	@Query("FROM BorrowBooksDetail WHERE id.id_PhieuMuon = ?1 AND id.barcode = ?2")
	Optional<BorrowBooksDetail> findByIdAndBarcode(Long id_PhieuMuon, Long barcode);
}
