package intake09.fm14.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import intake09.fm14.entity.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
	@Query("FROM Subject WHERE id_LoaiSach = ?1")
	List<Subject> subjectById(Long id_LoaiSach);
}
