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
@Table(name = "LOAISACH")
public class Subject {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_LOAISACH")
	Long id_LoaiSach;
	
	@NotNull
	@Column(name = "TENLOAISACH")
	String tenLoaiSach;
	
	public Long getId_LoaiSach() {
		return id_LoaiSach;
	}

	public void setId_LoaiSach(Long id_LoaiSach) {
		this.id_LoaiSach = id_LoaiSach;
	}

	public String getTenLoaiSach() {
		return tenLoaiSach;
	}

	public void setTenLoaiSach(String tenLoaiSach) {
		this.tenLoaiSach = tenLoaiSach;
	}
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "subject")
	private Collection<BookTitle> bookTitle;
}
