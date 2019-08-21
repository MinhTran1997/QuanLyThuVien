package intake09.fm14.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "TACGIA")
public class Author {
	@Id
	@Column(name = "ID_TACGIA")
	Long id_TacGia;
	
	@NotNull
	@Column(name = "HOTENTG")
	String hoTenTG;
	
	@NotNull
	@Column(name = "SDTTG")
	String sdtTG;
	
	@NotNull
	@Column(name = "EMAILTG")
	String emailTG;
	
	@NotNull
	@Column(name = "TRINHDO")
	String trinhDo;

	public Long getId_TacGia() {
		return id_TacGia;
	}

	public void setId_TacGia(Long id_TacGia) {
		this.id_TacGia = id_TacGia;
	}

	public String getHoTenTG() {
		return hoTenTG;
	}

	public void setHoTenTG(String hoTenTG) {
		this.hoTenTG = hoTenTG;
	}

	public String getSdtTG() {
		return sdtTG;
	}

	public void setSdtTG(String sdtTG) {
		this.sdtTG = sdtTG;
	}

	public String getEmailTG() {
		return emailTG;
	}

	public void setEmailTG(String emailTG) {
		this.emailTG = emailTG;
	}

	public String getTrinhDo() {
		return trinhDo;
	}

	public void setTrinhDo(String trinhDo) {
		this.trinhDo = trinhDo;
	}
	
	
}
