package intake09.fm14.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "DAUSACH")
public class Book {
	@Id
	@Column(name = "ID_ISBN")
	String id_ISBN;
	
	@NotNull
	@Column(name = "ID_LOAISACH")
	String id_LoaiSach;
	
	@Column(name = "ID_NXB")
	String id_NXB;
	
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
	@Column(name = "NAMXUATBAN")
	Date namXuatBan;

	//GETTER, SETTER
	public String getId_ISBN() {
		return id_ISBN;
	}

	public void setId_ISBN(String id_ISBN) {
		this.id_ISBN = id_ISBN;
	}

	public String getId_LoaiSach() {
		return id_LoaiSach;
	}

	public void setId_LoaiSach(String id_LoaiSach) {
		this.id_LoaiSach = id_LoaiSach;
	}

	public String getId_NXB() {
		return id_NXB;
	}

	public void setId_NXB(String id_NXB) {
		this.id_NXB = id_NXB;
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
		return KhoSach;
	}

	public void setKhoSach(String khoSach) {
		KhoSach = khoSach;
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
}
