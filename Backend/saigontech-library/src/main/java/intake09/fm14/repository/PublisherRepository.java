package intake09.fm14.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import intake09.fm14.entity.Publisher;
 
@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long> {
	@Query("FROM Publisher WHERE id_NXB = ?1")
	List<Publisher> publisherById(Long id_NXB);
}
