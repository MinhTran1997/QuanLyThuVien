create trigger trigger_Them_PMS on PM_S after insert as
begin
	update SACH set TRANGTHAI = 'Borrowed'
	where BARCODE = (select BARCODE from inserted)
end

go

create trigger trigger_Xoa_PMS on PM_S for delete as
begin
	update SACH set TRANGTHAI = 'In Stock'
	where BARCODE = (select BARCODE from deleted)
end

go

create trigger trigger_Them_PTS on PT_S after insert as
begin
	update SACH set TRANGTHAI = 'In Stock'
	where BARCODE = (select BARCODE from inserted)
end

go

create trigger trigger_Xoa_PTS on PT_S for delete as
begin
	update SACH set TRANGTHAI = 'Borrowed'
	where BARCODE = (select BARCODE from deleted)
end

go

DBCC CHECKIDENT ('PHIEUMUON', RESEED, 0)
DBCC CHECKIDENT ('PHIEUTRA', RESEED, 0)

go

create trigger trigger_Xoa_PHIEUMUON on PHIEUMUON for delete as
begin
	DBCC CHECKIDENT ('PHIEUMUON', RESEED, 0)
end

go

create trigger trigger_Xoa_PHIEUTRA on PHIEUTRA for delete as
begin
	DBCC CHECKIDENT ('PHIEUTRA', RESEED, 0)
end
