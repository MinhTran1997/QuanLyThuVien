package intake09.fm14.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import intake09.fm14.entity.Reader;

@Repository
public interface ReaderRepository extends JpaRepository<Reader, Long> {
	@Query( "		SELECT pm.id_PhieuMuon, dg.hotenDG, dg.username_DG, ds.tenDS, s.barcode, pm.ngayLapPM, ctpm.ngayHuaTra, ISNULL(CAST(ctpt. ngayTra as string),'Borrowing')" + 
			"		FROM Reader dg Full JOIN BorrowBooks pm ON dg.id_TheDG = pm.reader.id_TheDG" + 
			"				FULL JOIN BorrowBooksDetail ctpm ON pm.id_PhieuMuon = ctpm.id.id_PhieuMuon" + 
			"				FULL JOIN Book s ON ctpm.id.barcode = s.barcode" + 
			"				Full JOIN BookTitle ds ON ds.id_ISBN = s.bookTitle.id_ISBN" +
			"				Full JOIN ReturnBooksDetail ctpt ON s.barcode = ctpt.id.barcode" + 
			"				Full JOIN ReturnBooks pt ON ctpt.id.id_PhieuTra = pt.id_PhieuTra")
	List<Object> ThongKeDocGia(String username_DG);
}
