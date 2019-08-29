package intake09.fm14.entity;

import java.util.Collection;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "THUTHU")
public class Librarian {
	@Id
	@Column(name = "ID_THUTHU")
	Long id_ThuThu;
	
	@NotNull
	@Column(name = "HOTENTT")
	String hoTenTT;
	
	@NotNull
	@Column(name = "SDTTT")
	String sdt;
	
	@NotNull
	@Column(name = "EMAILTT")
	String emailTT;
	
	@NotNull
	@Column(name = "DIACHITT")
	String diaChiTT;
	
	@NotNull
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Column(name = "NGAYSINHTT")
	Date ngaySinhTT;
	
	@NotNull
	@Column(name = "GIOITINHTT")
	String gioiTinhTT;
	
	@NotNull
	@Column(name = "USERNAME_TT")
	String username_TT;
	
	@NotNull
	@Column(name = "PASSWORD_TT")
	String password_TT;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "librarian")
	private Collection<BorrowBooks> borrowBooks;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "librarian")
	private Collection<ReturnBooks> returnBooks;
	
	
	public Long getId_ThuThu() {
		return id_ThuThu;
	}

	public void setId_ThuThu(Long id_ThuThu) {
		this.id_ThuThu = id_ThuThu;
	}

	public String getHoTenTT() {
		return hoTenTT;
	}

	public void setHoTenTT(String hoTenTT) {
		this.hoTenTT = hoTenTT;
	}

	public String getSdt() {
		return sdt;
	}

	public void setSdt(String sdt) {
		this.sdt = sdt;
	}

	public String getEmailTT() {
		return emailTT;
	}

	public void setEmailTT(String emailTT) {
		this.emailTT = emailTT;
	}

	public String getDiaChiTT() {
		return diaChiTT;
	}

	public void setDiaChiTT(String diaChiTT) {
		this.diaChiTT = diaChiTT;
	}

	public Date getNgaySinhTT() {
		return ngaySinhTT;
	}

	public void setNgaySinhTT(Date ngaySinhTT) {
		this.ngaySinhTT = ngaySinhTT;
	}

	public String getGioiTinhTT() {
		return gioiTinhTT;
	}

	public void setGioiTinhTT(String gioiTinhTT) {
		this.gioiTinhTT = gioiTinhTT;
	}

	public String getUsername_TT() {
		return username_TT;
	}

	public void setUsername_TT(String username_TT) {
		this.username_TT = username_TT;
	}

	public String getPassword_TT() {
		return password_TT;
	}

	public void setPassword_TT(String password_TT) {
		this.password_TT = password_TT;
	}
	
}
