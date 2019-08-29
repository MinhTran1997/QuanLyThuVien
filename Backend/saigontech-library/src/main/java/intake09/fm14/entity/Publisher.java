package intake09.fm14.entity;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "NXB")
public class Publisher {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_NXB")
	Long id_NXB;

	@NotNull
	@Column(name = "TENNXB")
	String tenNXB;
	
	@NotNull
	@Column(name = "DIACHINXB")
	String diaChiNXB;
	
	@NotNull
	@Column(name = "SDTNXB")
	String sdtNXB;
	
	@NotNull
	@Column(name = "EMAILNXB")
	String emailNXB;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "publisher")
	private Collection<BookTitle> bookTitle;
	
	public Long getId_NXB() {
		return id_NXB;
	}

	public void setId_NXB(Long id_NXB) {
		this.id_NXB = id_NXB;
	}
	
	public String getTenNXB() {
		return tenNXB;
	}

	public void setTenNXB(String tenNXB) {
		this.tenNXB = tenNXB;
	}

	public String getDiaChiNXB() {
		return diaChiNXB;
	}

	public void setDiaChiNXB(String diaChiNXB) {
		this.diaChiNXB = diaChiNXB;
	}

	public String getSdtNXB() {
		return sdtNXB;
	}

	public void setSdtNXB(String sdtNXB) {
		this.sdtNXB = sdtNXB;
	}

	public String getEmailNXB() {
		return emailNXB;
	}

	public void setEmailNXB(String emailNXB) {
		this.emailNXB = emailNXB;
	}
}
