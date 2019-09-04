package intake09.fm14.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import intake09.fm14.entity.BorrowBooksDetail;
import intake09.fm14.entity.Reader;

@Repository
public interface BorrowBooksDetailRepository extends JpaRepository<BorrowBooksDetail, Long> {
	@Query("FROM BorrowBooksDetail WHERE id.id_PhieuMuon = ?1")
	List<BorrowBooksDetail> findAll(Long id_PhieuMuon);
	
	@Query("FROM BorrowBooksDetail WHERE id.id_PhieuMuon = ?1 AND id.barcode = ?2")
	Optional<BorrowBooksDetail> findByIdAndBarcode(Long id_PhieuMuon, Long barcode);
	
	@Query("SELECT t1.id.barcode FROM BorrowBooksDetail t1 JOIN BorrowBooks t2 ON t1.id.id_PhieuMuon = t2.id_PhieuMuon JOIN Book t3 ON t1.id.barcode = t3.barcode WHERE t3.trangThai = 'Borrowed' and t1.id.barcode = ?1")
	Long checkExistBarcode(Long barcode);
	
	@Query("FROM BorrowBooksDetail t1 JOIN BorrowBooks t2 ON t1.id.id_PhieuMuon = t2.id_PhieuMuon JOIN Book t3 ON t1.id.barcode = t3.barcode WHERE t1.id.id_PhieuMuon IN(?1)")
	List<Object> findByManyId(List<Long> id_PhieuMuon);
	
	@Query("FROM BorrowBooksDetail t1 JOIN BorrowBooks t2 ON t1.id.id_PhieuMuon = t2.id_PhieuMuon JOIN Book t3 ON t1.id.barcode = t3.barcode WHERE t2.reader.id_TheDG = "
			+ "(SELECT t2.reader.id_TheDG FROM BorrowBooksDetail t1 JOIN BorrowBooks t2 ON t1.id.id_PhieuMuon = t2.id_PhieuMuon WHERE t1.id.barcode = ?1)")
	List<Object> findByBarcode(Long barcode);
	
	@Query("SELECT t1.reader FROM BorrowBooks t1 JOIN BorrowBooksDetail t2 ON t1.id_PhieuMuon = t2.id.id_PhieuMuon WHERE t2.id.barcode = ?1")
	Reader findReaderByBarcode(Long barcode);
}
