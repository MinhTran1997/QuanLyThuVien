package intake09.fm14.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "SACH")
public class Book {
	@Id
	@Column(name = "BARCODE")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long barcode;
	
	@ManyToOne
	@JoinColumn(name = "id_ISBN")
	private BookTitle bookTitle;
	
	@NotNull
	@Column(name = "TRANGTHAI")
	Boolean trangThai;

	public Long getBarcode() {
		return barcode;
	}

	public void setBarcode(Long barcode) {
		this.barcode = barcode;
	}

	public BookTitle getBookTitle() {
		return bookTitle;
	}

	public void setBookTitle(BookTitle bookTitle) {
		this.bookTitle = bookTitle;
	}

	public Boolean getTrangThai() {
		return trangThai;
	}

	public void setTrangThai(Boolean trangThai) {
		this.trangThai = trangThai;
	}
}
