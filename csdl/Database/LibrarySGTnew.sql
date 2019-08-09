/*==============================================================*/
/* DBMS name:      Microsoft SQL Server 2008                    */
/* Created on:     8/9/2019 9:15:39 PM                          */
/*==============================================================*/


if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DAUSACH') and o.name = 'FK_DAUSACH_LS_DS_LOAISACH')
alter table DAUSACH
   drop constraint FK_DAUSACH_LS_DS_LOAISACH
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DAUSACH') and o.name = 'FK_DAUSACH_NXB_DS_NXB')
alter table DAUSACH
   drop constraint FK_DAUSACH_NXB_DS_NXB
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DS_TG') and o.name = 'FK_DS_TG_DS_TG_DAUSACH')
alter table DS_TG
   drop constraint FK_DS_TG_DS_TG_DAUSACH
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DS_TG') and o.name = 'FK_DS_TG_DS_TG2_TACGIA')
alter table DS_TG
   drop constraint FK_DS_TG_DS_TG2_TACGIA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('PHIEUMUON') and o.name = 'FK_PHIEUMUO_DG_PM_DOCGIA')
alter table PHIEUMUON
   drop constraint FK_PHIEUMUO_DG_PM_DOCGIA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('PHIEUMUON') and o.name = 'FK_PHIEUMUO_TT_PM_THUTHU')
alter table PHIEUMUON
   drop constraint FK_PHIEUMUO_TT_PM_THUTHU
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('PHIEUTRA') and o.name = 'FK_PHIEUTRA_DG_PT_DOCGIA')
alter table PHIEUTRA
   drop constraint FK_PHIEUTRA_DG_PT_DOCGIA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('PHIEUTRA') and o.name = 'FK_PHIEUTRA_TT_PT_THUTHU')
alter table PHIEUTRA
   drop constraint FK_PHIEUTRA_TT_PT_THUTHU
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('PM_S') and o.name = 'FK_PM_S_PM_S_PHIEUMUO')
alter table PM_S
   drop constraint FK_PM_S_PM_S_PHIEUMUO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('PM_S') and o.name = 'FK_PM_S_PM_S2_SACH')
alter table PM_S
   drop constraint FK_PM_S_PM_S2_SACH
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('PT_S') and o.name = 'FK_PT_S_PT_S_PHIEUTRA')
alter table PT_S
   drop constraint FK_PT_S_PT_S_PHIEUTRA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('PT_S') and o.name = 'FK_PT_S_PT_S2_SACH')
alter table PT_S
   drop constraint FK_PT_S_PT_S2_SACH
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('SACH') and o.name = 'FK_SACH_DS_S_DAUSACH')
alter table SACH
   drop constraint FK_SACH_DS_S_DAUSACH
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DAUSACH')
            and   name  = 'LS_DS_FK'
            and   indid > 0
            and   indid < 255)
   drop index DAUSACH.LS_DS_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DAUSACH')
            and   name  = 'NXB_DS_FK'
            and   indid > 0
            and   indid < 255)
   drop index DAUSACH.NXB_DS_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DAUSACH')
            and   type = 'U')
   drop table DAUSACH
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DOCGIA')
            and   type = 'U')
   drop table DOCGIA
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DS_TG')
            and   name  = 'DS_TG2_FK'
            and   indid > 0
            and   indid < 255)
   drop index DS_TG.DS_TG2_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DS_TG')
            and   name  = 'DS_TG_FK'
            and   indid > 0
            and   indid < 255)
   drop index DS_TG.DS_TG_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DS_TG')
            and   type = 'U')
   drop table DS_TG
go

if exists (select 1
            from  sysobjects
           where  id = object_id('LOAISACH')
            and   type = 'U')
   drop table LOAISACH
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NXB')
            and   type = 'U')
   drop table NXB
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('PHIEUMUON')
            and   name  = 'DG_PM_FK'
            and   indid > 0
            and   indid < 255)
   drop index PHIEUMUON.DG_PM_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('PHIEUMUON')
            and   name  = 'TT_PM_FK'
            and   indid > 0
            and   indid < 255)
   drop index PHIEUMUON.TT_PM_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PHIEUMUON')
            and   type = 'U')
   drop table PHIEUMUON
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('PHIEUTRA')
            and   name  = 'TT_PT_FK'
            and   indid > 0
            and   indid < 255)
   drop index PHIEUTRA.TT_PT_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('PHIEUTRA')
            and   name  = 'DG_PT_FK'
            and   indid > 0
            and   indid < 255)
   drop index PHIEUTRA.DG_PT_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PHIEUTRA')
            and   type = 'U')
   drop table PHIEUTRA
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('PM_S')
            and   name  = 'PM_S2_FK'
            and   indid > 0
            and   indid < 255)
   drop index PM_S.PM_S2_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('PM_S')
            and   name  = 'PM_S_FK'
            and   indid > 0
            and   indid < 255)
   drop index PM_S.PM_S_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PM_S')
            and   type = 'U')
   drop table PM_S
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('PT_S')
            and   name  = 'PT_S2_FK'
            and   indid > 0
            and   indid < 255)
   drop index PT_S.PT_S2_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('PT_S')
            and   name  = 'PT_S_FK'
            and   indid > 0
            and   indid < 255)
   drop index PT_S.PT_S_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PT_S')
            and   type = 'U')
   drop table PT_S
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('SACH')
            and   name  = 'DS_S_FK'
            and   indid > 0
            and   indid < 255)
   drop index SACH.DS_S_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('SACH')
            and   type = 'U')
   drop table SACH
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TACGIA')
            and   type = 'U')
   drop table TACGIA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('THUTHU')
            and   type = 'U')
   drop table THUTHU
go

/*==============================================================*/
/* Table: DAUSACH                                               */
/*==============================================================*/
create table DAUSACH (
   ID_ISBN              bigint               not null,
   ID_LOAISACH          bigint               null,
   ID_NXB               bigint               null,
   TENDS                nvarchar(50)         null,
   TOMLUOCNOIDUNG       nvarchar(300)        null,
   KHOSACH              nchar(20)            null,
   SOTRANG              int                  null,
   DINHKEM              nvarchar(300)        null,
   VITRI                nchar(20)            null,
   NGONNGU              nvarchar(50)         null,
   PHIENBAN             int                  null,
   NAMXUATBAN           date                 null,
   constraint PK_DAUSACH primary key nonclustered (ID_ISBN)
)
go

/*==============================================================*/
/* Index: NXB_DS_FK                                             */
/*==============================================================*/
create index NXB_DS_FK on DAUSACH (
ID_NXB ASC
)
go

/*==============================================================*/
/* Index: LS_DS_FK                                              */
/*==============================================================*/
create index LS_DS_FK on DAUSACH (
ID_LOAISACH ASC
)
go

/*==============================================================*/
/* Table: DOCGIA                                                */
/*==============================================================*/
create table DOCGIA (
   ID_THEDG             bigint               not null,
   HOTENDG              nvarchar(50)         null,
   SDTDG                numeric(11)          null,
   EMAILDG              nvarchar(50)         null,
   DIACHIDG             nvarchar(50)         null,
   NGAYSINHDG           date                 null,
   GIOITINHDG           bit                  null,
   HSDTHE               date                 null,
   USERNAME_DG          nvarchar(50)         null,
   PASSWORD_DG          nvarchar(50)         null,
   constraint PK_DOCGIA primary key nonclustered (ID_THEDG)
)
go

/*==============================================================*/
/* Table: DS_TG                                                 */
/*==============================================================*/
create table DS_TG (
   ID_ISBN              bigint               not null,
   ID_TACGIA            bigint               not null,
   constraint PK_DS_TG primary key (ID_ISBN, ID_TACGIA)
)
go

/*==============================================================*/
/* Index: DS_TG_FK                                              */
/*==============================================================*/
create index DS_TG_FK on DS_TG (
ID_ISBN ASC
)
go

/*==============================================================*/
/* Index: DS_TG2_FK                                             */
/*==============================================================*/
create index DS_TG2_FK on DS_TG (
ID_TACGIA ASC
)
go

/*==============================================================*/
/* Table: LOAISACH                                              */
/*==============================================================*/
create table LOAISACH (
   ID_LOAISACH          bigint               not null,
   TENLOAISACH          nvarchar(50)         null,
   constraint PK_LOAISACH primary key nonclustered (ID_LOAISACH)
)
go

/*==============================================================*/
/* Table: NXB                                                   */
/*==============================================================*/
create table NXB (
   ID_NXB               bigint               not null,
   TENNXB               nvarchar(50)         null,
   DIACHINXB            nvarchar(50)         null,
   SDTNXB               numeric(11)          null,
   EMAILNXB             nvarchar(50)         null,
   constraint PK_NXB primary key nonclustered (ID_NXB)
)
go

/*==============================================================*/
/* Table: PHIEUMUON                                             */
/*==============================================================*/
create table PHIEUMUON (
   ID_PHIEUMUON         bigint               not null,
   ID_THUTHU            bigint               null,
   ID_THEDG             bigint               null,
   NGAYLAPPM            date                 null,
   constraint PK_PHIEUMUON primary key nonclustered (ID_PHIEUMUON)
)
go

/*==============================================================*/
/* Index: TT_PM_FK                                              */
/*==============================================================*/
create index TT_PM_FK on PHIEUMUON (
ID_THUTHU ASC
)
go

/*==============================================================*/
/* Index: DG_PM_FK                                              */
/*==============================================================*/
create index DG_PM_FK on PHIEUMUON (
ID_THEDG ASC
)
go

/*==============================================================*/
/* Table: PHIEUTRA                                              */
/*==============================================================*/
create table PHIEUTRA (
   ID_PHIEUTRA          bigint               not null,
   ID_THEDG             bigint               null,
   ID_THUTHU            bigint               null,
   NGAYLAPPT            date                 null,
   constraint PK_PHIEUTRA primary key nonclustered (ID_PHIEUTRA)
)
go

/*==============================================================*/
/* Index: DG_PT_FK                                              */
/*==============================================================*/
create index DG_PT_FK on PHIEUTRA (
ID_THEDG ASC
)
go

/*==============================================================*/
/* Index: TT_PT_FK                                              */
/*==============================================================*/
create index TT_PT_FK on PHIEUTRA (
ID_THUTHU ASC
)
go

/*==============================================================*/
/* Table: PM_S                                                  */
/*==============================================================*/
create table PM_S (
   ID_PHIEUMUON         bigint               not null,
   BARCODE              bigint               not null,
   NGAYHUATRA           date                 null,
   constraint PK_PM_S primary key (ID_PHIEUMUON, BARCODE)
)
go

/*==============================================================*/
/* Index: PM_S_FK                                               */
/*==============================================================*/
create index PM_S_FK on PM_S (
ID_PHIEUMUON ASC
)
go

/*==============================================================*/
/* Index: PM_S2_FK                                              */
/*==============================================================*/
create index PM_S2_FK on PM_S (
BARCODE ASC
)
go

/*==============================================================*/
/* Table: PT_S                                                  */
/*==============================================================*/
create table PT_S (
   ID_PHIEUTRA          bigint               not null,
   BARCODE              bigint               not null,
   NGAYTRA              date                 null,
   constraint PK_PT_S primary key (ID_PHIEUTRA, BARCODE)
)
go

/*==============================================================*/
/* Index: PT_S_FK                                               */
/*==============================================================*/
create index PT_S_FK on PT_S (
ID_PHIEUTRA ASC
)
go

/*==============================================================*/
/* Index: PT_S2_FK                                              */
/*==============================================================*/
create index PT_S2_FK on PT_S (
BARCODE ASC
)
go

/*==============================================================*/
/* Table: SACH                                                  */
/*==============================================================*/
create table SACH (
   BARCODE              bigint               not null,
   ID_ISBN              bigint               null,
   TRANGTHAI            bit                  null,
   constraint PK_SACH primary key nonclustered (BARCODE)
)
go

/*==============================================================*/
/* Index: DS_S_FK                                               */
/*==============================================================*/
create index DS_S_FK on SACH (
ID_ISBN ASC
)
go

/*==============================================================*/
/* Table: TACGIA                                                */
/*==============================================================*/
create table TACGIA (
   ID_TACGIA            bigint               not null,
   HOTENTG              nvarchar(50)         null,
   SDTTG                numeric(11)          null,
   EMAILTG              nvarchar(50)         null,
   TRINHDO              nvarchar(50)         null,
   constraint PK_TACGIA primary key nonclustered (ID_TACGIA)
)
go

/*==============================================================*/
/* Table: THUTHU                                                */
/*==============================================================*/
create table THUTHU (
   ID_THUTHU            bigint               not null,
   HOTENTT              nvarchar(50)         null,
   SDTTT                numeric(11)          null,
   EMAILTT              nvarchar(50)         null,
   DIACHITT             nvarchar(50)         null,
   NGAYSINHTT           date                 null,
   GIOITINHTT           bit                  null,
   USERNAME_TT          nvarchar(50)         null,
   PASSWORD_TT          nvarchar(50)         null,
   constraint PK_THUTHU primary key nonclustered (ID_THUTHU)
)
go

alter table DAUSACH
   add constraint FK_DAUSACH_LS_DS_LOAISACH foreign key (ID_LOAISACH)
      references LOAISACH (ID_LOAISACH)
go

alter table DAUSACH
   add constraint FK_DAUSACH_NXB_DS_NXB foreign key (ID_NXB)
      references NXB (ID_NXB)
go

alter table DS_TG
   add constraint FK_DS_TG_DS_TG_DAUSACH foreign key (ID_ISBN)
      references DAUSACH (ID_ISBN)
go

alter table DS_TG
   add constraint FK_DS_TG_DS_TG2_TACGIA foreign key (ID_TACGIA)
      references TACGIA (ID_TACGIA)
go

alter table PHIEUMUON
   add constraint FK_PHIEUMUO_DG_PM_DOCGIA foreign key (ID_THEDG)
      references DOCGIA (ID_THEDG)
go

alter table PHIEUMUON
   add constraint FK_PHIEUMUO_TT_PM_THUTHU foreign key (ID_THUTHU)
      references THUTHU (ID_THUTHU)
go

alter table PHIEUTRA
   add constraint FK_PHIEUTRA_DG_PT_DOCGIA foreign key (ID_THEDG)
      references DOCGIA (ID_THEDG)
go

alter table PHIEUTRA
   add constraint FK_PHIEUTRA_TT_PT_THUTHU foreign key (ID_THUTHU)
      references THUTHU (ID_THUTHU)
go

alter table PM_S
   add constraint FK_PM_S_PM_S_PHIEUMUO foreign key (ID_PHIEUMUON)
      references PHIEUMUON (ID_PHIEUMUON)
go

alter table PM_S
   add constraint FK_PM_S_PM_S2_SACH foreign key (BARCODE)
      references SACH (BARCODE)
go

alter table PT_S
   add constraint FK_PT_S_PT_S_PHIEUTRA foreign key (ID_PHIEUTRA)
      references PHIEUTRA (ID_PHIEUTRA)
go

alter table PT_S
   add constraint FK_PT_S_PT_S2_SACH foreign key (BARCODE)
      references SACH (BARCODE)
go

alter table SACH
   add constraint FK_SACH_DS_S_DAUSACH foreign key (ID_ISBN)
      references DAUSACH (ID_ISBN)
go

