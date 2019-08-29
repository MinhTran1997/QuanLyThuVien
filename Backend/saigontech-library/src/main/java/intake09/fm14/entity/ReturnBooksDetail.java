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
@Table(name = "PT_S")
public class ReturnBooksDetail {
	@EmbeddedId
	private ReturnBooksDetail_ID id;
	
	@NotNull
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Column(name = "NGAYTRA")
	Date ngayTra;

	public ReturnBooksDetail_ID getId() {
		return id;
	}

	public void setId(ReturnBooksDetail_ID id) {
		this.id = id;
	}

	public Date getNgayTra() {
		return ngayTra;
	}

	public void setNgayTra(Date ngayTra) {
		this.ngayTra = ngayTra;
	}
}
