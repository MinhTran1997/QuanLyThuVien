package intake09.fm14.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "PHIEUMUON")
public class BorrowBooks {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_PHIEUMUON")
	Long id_PhieuMuon;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "id_ThuTHu")
	private Librarian librarian;
	
	public Librarian getLibrarian() {
		return librarian;
	}

	public void setLibrarian(Librarian librarian) {
		this.librarian = librarian;
	}

	@NotNull
	@ManyToOne
	@JoinColumn(name = "id_TheDG")
	private Reader reader;
	
	public Reader getReader() {
		return reader;
	}

	public void setReader(Reader reader) {
		this.reader = reader;
	}

	@NotNull
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Column(name = "NGAYLAPPM")
	Date ngayLapPM;

	public Long getId_PhieuMuon() {
		return id_PhieuMuon;
	}

	public void setId_PhieuMuon(Long id_PhieuMuon) {
		this.id_PhieuMuon = id_PhieuMuon;
	}

	public Date getNgayLapPM() {
		return ngayLapPM;
	}

	public void setNgayLapPM(Date ngayLapPM) {
		this.ngayLapPM = ngayLapPM;
	}
	
}
