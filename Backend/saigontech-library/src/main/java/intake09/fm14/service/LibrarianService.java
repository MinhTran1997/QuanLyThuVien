package intake09.fm14.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import intake09.fm14.entity.Librarian;
import intake09.fm14.repository.LibrarianRepository;

@Service
public class LibrarianService {
	@Autowired
	LibrarianRepository librarianRepo;
 
    public List<Librarian> getAll() {
        return (List<Librarian>) librarianRepo.findAll();
    }
}
