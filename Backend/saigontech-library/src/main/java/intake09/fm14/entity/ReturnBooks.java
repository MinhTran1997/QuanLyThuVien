package intake09.fm14.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "PHIEUTRA")
public class ReturnBooks {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_PHIEUTRA")
	Long id_PhieuTra;

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
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Column(name = "NGAYLAPPT")
	Date ngayLapPT;

	public Long getId_PhieuTra() {
		return id_PhieuTra;
	}

	public void setId_PhieuTra(Long id_PhieuTra) {
		this.id_PhieuTra = id_PhieuTra;
	}

	public Date getNgayLapPT() {
		return ngayLapPT;
	}

	public void setNgayLapPT(Date ngayLapPT) {
		this.ngayLapPT = ngayLapPT;
	}
}
