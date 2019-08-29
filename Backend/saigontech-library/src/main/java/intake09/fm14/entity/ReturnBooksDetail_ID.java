package intake09.fm14.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

@Embeddable
public class ReturnBooksDetail_ID implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@NotNull
	@Column(name = "ID_PHIEUTRA")
	Long id_PhieuTra;
	
	@NotNull
	@Column(name = "BARCODE")
	Long barcode;
	
	public ReturnBooksDetail_ID() {
		
	}
	
	public ReturnBooksDetail_ID(Long id_PhieuTra, Long barcode)
	{
		this.id_PhieuTra = id_PhieuTra;
		this.barcode = barcode;
	}

	public Long getId_PhieuTra() {
		return id_PhieuTra;
	}

	public void setId_PhieuTra(Long id_PhieuTra) {
		this.id_PhieuTra = id_PhieuTra;
	}

	public Long getBarcode() {
		return barcode;
	}

	public void setBarcode(Long barcode) {
		this.barcode = barcode;
	}
}
