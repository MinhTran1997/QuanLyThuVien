package intake09.fm14.service;

import java.util.List;
import java.util.Optional;
 
import javax.persistence.EntityNotFoundException;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import intake09.fm14.entity.Author;
import intake09.fm14.repository.AuthorRepository;

@Service
public class AuthorService {
	@Autowired
	AuthorRepository authorRepo;
 
    public List<Author> getAll() {
        return (List<Author>) authorRepo.findAll();
    }
 
    public Author createAuthor(Author author) {
        return authorRepo.save(author);
    }
    
    public Author updateAuthor(Long id_ISBN, Author authorEntity) {
    	Author updatedSample;
        Optional<Author> searchEntity = authorRepo.findById(id_ISBN);
        if (searchEntity.isPresent()) {
        	Author author = searchEntity.get();
        	author.setId_TacGia(authorEntity.getId_TacGia());
        	author.setHoTenTG(authorEntity.getHoTenTG());
        	author.setSdtTG(authorEntity.getSdtTG());
        	author.setEmailTG(authorEntity.getEmailTG());
        	author.setTrinhDo(authorEntity.getTrinhDo());
            updatedSample = authorRepo.save(author);
        } else {
            throw new EntityNotFoundException();
        }
        return updatedSample;
    }
    
    public ResponseEntity<Object> deleteAuthor(Long id_ISBN) {
        Optional<Author> authorEntity = authorRepo.findById(id_ISBN);
        if (authorEntity.isPresent()) {
        	Author author = authorEntity.get();
        	authorRepo.delete(author);
        } else {
            throw new EntityNotFoundException();
        }
        return ResponseEntity.ok().build();
    }

}
