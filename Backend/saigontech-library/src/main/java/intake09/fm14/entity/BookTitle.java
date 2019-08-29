package intake09.fm14.entity;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "DAUSACH")
public class BookTitle {
	@Id
	@Column(name = "ID_ISBN")
	Long id_ISBN;
	
	@ManyToOne
	@JoinColumn(name = "ID_LOAISACH")
	private Subject subject;
	
	public Subject getSubject() {
		return subject;
	}

	public void setSubject(Subject subject) {
		this.subject = subject;
	}

	@ManyToOne
	@JoinColumn(name = "id_NXB")
	private Publisher publisher;

	public Publisher getPublisher() {
		return publisher;
	}

	public void setPublisher(Publisher publisher) {
		this.publisher = publisher;
	}

	@NotNull
	@Column(name = "TENDS")
	String tenDS;
	
	@NotNull
	@Column(name = "TOMLUOCNOIDUNG")
	String tomLuocNoiDung;
	
	@NotNull
	@Column(name = "KHOSACH")
	String khoSach;
	
	@NotNull
	@Column(name = "SOTRANG")
	Integer soTrang;
	
	@Column(name = "DINHKEM")
	String dinhKem;
	
	@NotNull
	@Column(name = "VITRI")
	String viTri;
	
	@NotNull
	@Column(name = "NGONNGU")
	String ngonNgu;
	
	@NotNull
	@Column(name = "PHIENBAN")
	Integer phienBan;
	
	@NotNull
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Column(name = "NAMXUATBAN")
	Date namXuatBan;
	
	@Column(name = "HINHANH")
	String hinhAnh;
	
	public String getHinhAnh() {
		return hinhAnh;
	}

	public void setHinhAnh(String hinhAnh) {
		this.hinhAnh = hinhAnh;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "bookTitle")
	private Collection<Book> book;

	//GETTER, SETTER
	public Long getId_ISBN() {
		return id_ISBN;
	}

	public void setId_ISBN(Long id_ISBN) {
		this.id_ISBN = id_ISBN;
	}
	
	public String getTenDS() {
		return tenDS;
	}

	public void setTenDS(String tenDS) {
		this.tenDS = tenDS;
	}

	public String getTomLuocNoiDung() {
		return tomLuocNoiDung;
	}

	public void setTomLuocNoiDung(String tomLuocNoiDung) {
		this.tomLuocNoiDung = tomLuocNoiDung;
	}

	public String getKhoSach() {
		return khoSach;
	}

	public void setKhoSach(String khoSach) {
		this.khoSach = khoSach;
	}

	public Integer getSoTrang() {
		return soTrang;
	}

	public void setSoTrang(Integer soTrang) {
		this.soTrang = soTrang;
	}

	public String getDinhKem() {
		return dinhKem;
	}

	public void setDinhKem(String dinhKem) {
		this.dinhKem = dinhKem;
	}

	public String getViTri() {
		return viTri;
	}

	public void setViTri(String viTri) {
		this.viTri = viTri;
	}

	public String getNgonNgu() {
		return ngonNgu;
	}

	public void setNgonNgu(String ngonNgu) {
		this.ngonNgu = ngonNgu;
	}

	public Integer getPhienBan() {
		return phienBan;
	}

	public void setPhienBan(Integer phienBan) {
		this.phienBan = phienBan;
	}

	public Date getNamXuatBan() {
		return namXuatBan;
	}

	public void setNamXuatBan(Date namXuatBan) {
		this.namXuatBan = namXuatBan;
	}
	
	@ManyToMany(mappedBy="bookTitles")
    private Set<Author> authors = new HashSet<Author>();

	public Set<Author> getAuthors() {
		return authors;
	}

	public void setAuthors(Set<Author> authors) {
		this.authors = authors;
	}
}
