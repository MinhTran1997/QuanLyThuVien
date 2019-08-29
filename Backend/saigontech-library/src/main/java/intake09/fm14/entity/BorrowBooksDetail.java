package intake09.fm14.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "PM_S")
public class BorrowBooksDetail {
	@EmbeddedId
	private BorrowBooksDetail_ID id;
	
	@NotNull
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Column(name = "NGAYHUATRA")
	Date ngayHuaTra;

	public BorrowBooksDetail_ID getId() {
		return id;
	}

	public void setId(BorrowBooksDetail_ID id) {
		this.id = id;
	}

	public Date getNgayHuaTra() {
		return ngayHuaTra;
	}

	public void setNgayHuaTra(Date ngayHuaTra) {
		this.ngayHuaTra = ngayHuaTra;
	}
}
