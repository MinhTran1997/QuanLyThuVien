package intake09.fm14.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import intake09.fm14.entity.ReturnBooksDetail;

public interface ReturnBooksDetailRepository extends JpaRepository<ReturnBooksDetail, Long> {
	@Query("FROM ReturnBooksDetail WHERE id.id_PhieuTra = ?1")
	List<ReturnBooksDetail> findAll(Long id_PhieuMuon);
	
	@Query("FROM ReturnBooksDetail WHERE id.id_PhieuTra = ?1 AND id.barcode = ?2")
	Optional<ReturnBooksDetail> findByIdAndBarcode(Long id_PhieuTra, Long barcode);
}
