package intake09.fm14.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import intake09.fm14.entity.Reader;

@Repository
public interface ReaderRepository extends JpaRepository<Reader, Long> {
	@Query("FROM Reader WHERE id_THEDG = ?1")
	List<Reader> findOneById(Long id_THEDG);
}
