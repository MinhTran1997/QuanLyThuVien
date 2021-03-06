package intake09.fm14.entity;

import java.util.Collection;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "DOCGIA")
public class Reader {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_THEDG")
	Long id_TheDG;
	
	@NotNull
	@Column(name = "HOTENDG")
	String hotenDG;
	
	@Column(name = "SDTDG")
	String sdt;
	
	@NotNull
	@Column(name = "EMAILDG")
	String emailDG;
	
	@NotNull
	@Column(name = "DIACHIDG")
	String diaChi;
	
	@NotNull
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Column(name = "NGAYSINHDG")
	Date ngaysinhDG;
	
	@NotNull
	@Column(name = "GIOITINHDG")
	String gioiTinhDG;
	
	@NotNull
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Column(name = "HSDTHE")
	Date hsdThe;
	
	@NotNull
	@Column(name = "USERNAME_DG")
	String username_DG;
	
	@NotNull
	@Column(name = "PASSWORD_DG")
	String password_DG;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "reader")
	private Collection<BorrowBooks> borrowBooks;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "reader")
	private Collection<ReturnBooks> returnBooks;

	public Long getId_TheDG() {
		return id_TheDG;
	}

	public void setId_TheDG(Long id_TheDG) {
		this.id_TheDG = id_TheDG;
	}

	public String getHotenDG() {
		return hotenDG;
	}

	public void setHotenDG(String hotenDG) {
		this.hotenDG = hotenDG;
	}

	public String getSdt() {
		return sdt;
	}

	public void setSdt(String sdt) {
		this.sdt = sdt;
	}

	public String getEmailDG() {
		return emailDG;
	}

	public void setEmailDG(String emailDG) {
		this.emailDG = emailDG;
	}

	public String getDiaChi() {
		return diaChi;
	}

	public void setDiaChi(String diaChi) {
		this.diaChi = diaChi;
	}

	public Date getNgaysinhDG() {
		return ngaysinhDG;
	}

	public void setNgaysinhDG(Date ngaysinhDG) {
		this.ngaysinhDG = ngaysinhDG;
	}
	
	public String getGioiTinhDG() {
		return gioiTinhDG;
	}

	public void setGioiTinhDG(String gioiTinhDG) {
		this.gioiTinhDG = gioiTinhDG;
	}
	
	public Date getHsdThe() {
		return hsdThe;
	}

	public void setHsdThe(Date hsdThe) {
		this.hsdThe = hsdThe;
	}
	
	public String getUsername_DG() {
		return username_DG;
	}

	public void setUsername_DG(String username_DG) {
		this.username_DG = username_DG;
	}
	
	public String getPassword_DG() {
		return password_DG;
	}

	public void setPassword_DG(String password_DG) {
		this.password_DG = password_DG;
	}
}
