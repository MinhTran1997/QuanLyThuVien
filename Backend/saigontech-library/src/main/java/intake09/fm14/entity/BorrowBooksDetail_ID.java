package intake09.fm14.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

@Embeddable
public class BorrowBooksDetail_ID implements Serializable {
	private static final long serialVersionUID = 1L;

	@NotNull
	@Column(name = "ID_PHIEUMUON")
	Long id_PhieuMuon;
	
	@NotNull
	@Column(name = "BARCODE")
	Long barcode;
	
	public BorrowBooksDetail_ID() {
		
	}
	
	public BorrowBooksDetail_ID(Long id_PhieuMuon, Long barcode)
	{
		this.id_PhieuMuon = id_PhieuMuon;
		this.barcode = barcode;
	}

	public Long getId_PhieuMuon() {
		return id_PhieuMuon;
	}

	public void setId_PhieuMuon(Long id_PhieuMuon) {
		this.id_PhieuMuon = id_PhieuMuon;
	}

	public Long getBarcode() {
		return barcode;
	}

	public void setBarcode(Long barcode) {
		this.barcode = barcode;
	}
}
