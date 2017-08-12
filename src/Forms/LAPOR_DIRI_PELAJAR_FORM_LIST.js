import validation from 'utils/validation'
import SELECTIONS from './selections'

export const LAPOR_DIRI_PELAJAR_FORM_LIST = [
{ 'formId': 100,
  'name': 'Data Keluarga',
  'schema': // order is as they appear on the form
      [
        { 
          name: 'sub-datapelajar', 
          uiType: 'subheader',
          label: 'Data Keluarga Pelajar',
        },
        {
          name: 'pelBapak',
          uiType: 'text',
          label: 'Nama Bapak',
          placeholder: 'Nama lengkap',
          fullWidth: true,
          validator: validation.alphanum,
        },
        {
          name: 'pelIbu',
          uiType: 'text',
          label: 'Nama Ibu',
          placeholder: 'Nama lengkap',
          fullWidth: true,
          validator: validation.alphanum,
        },
        {
          name: 'pelWali',
          uiType: 'text',
          label: 'Nama Wali',
          placeholder: 'Nama lengkap',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'pelPasangan',
          uiType: 'text',
          label: 'Nama Isteri/Suami',
          placeholder: 'Nama lengkap',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'pelAnak',
          uiType: 'textarea', // must be textarea
          label: 'Jumlah dan Nama Anak',
          placeholder: '(yang masih hidup) Misal:\nAdi (lahir 2000)\nBayu (lahir 2002)',
          fullWidth: true,
          // validator: validation.alphanum,
        },
      ]
},
{ 'formId': 101,
  'name': 'Sekolah & Biaya',
  'schema': // order is as they appear on the form
      [
        { 
          name: 'sub-datapelajar', 
          uiType: 'subheader',
          label: 'Tempat Belajar',
        },
        {
          name: 'seklNama',
          uiType: 'text',
          label: 'Lembaga Pendidikan',
          placeholder: 'Nama universitas/lembaga training',
          fullWidth: true,
          validator: validation.alphanum,
        },
         {
          name: 'seklStatus',
          uiType: 'select',
          maxHeight: 200,
          label: 'Status Lembaga',
          selections: SELECTIONS.statusSekolah,
          validator: validation.alphanum,
        },
        {
          name: 'seklJurusan',
          uiType: 'text',
          label: 'Jurusan',
          placeholder: 'Nama Jurusan',
          fullWidth: true,
          // validator: validation.alphanum,
        },
         {
          name: 'seklTingkat',
          uiType: 'select',
          maxHeight: 200,
          label: 'Tingkat Studi',
          selections: SELECTIONS.tingkatStudi,
          validator: validation.alphanum,
        },
        { 
          name: 'divider',
          uiType: 'divider',
        },
        { 
          name: 'sub-beasiswa-id',
          uiType: 'subheader',
          label: 'Sumber Biaya',
        },
        {
          name: 'seklBiaya',
          uiType: 'text',
          label: 'Sumber Biaya',
          placeholder: 'beasiswa MEXT/Pemerintah RI/yayasan/biaya sendiri...',
          fullWidth: true,
          validator: validation.alphanum,
        },
        {
          name: 'seklBulanan',
          uiType: 'text',
          type: 'number',
          label: 'Jumlah Tunjangan/Beasiswa',
          placeholder: 'jumlah per bulan',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'seklSponsor',
          uiType: 'text',
          label: 'Nama Sponsor di Jepang',
          placeholder: 'Nama sponsor',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'seklAlmtSponsor',
          uiType: 'textarea',
          label: 'Alamat Sponsor di Jepang',
          placeholder: 'Mis: 1-2-3 Honcho, Naka-ku, Tokyo 123-4567',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'seklTelSponsor',
          uiType: 'text',
          type: 'tel',
          label: 'Telepon Sponsor di Jepang',
          placeholder: 'Mis: 03-1234-5678',
          fullWidth: true,
          // validator: validation.alphanum,
        },
      ]
},
{ 'formId': 102,
  'name': 'Instansi di Indonesia',
  'schema': // order is as they appear on the form
      [
        { 
          name: 'sub-instansi', 
          uiType: 'subheader',
          label: 'Instansi di Indonesia',
        },
        {
          name: 'instNama',
          uiType: 'text',
          label: 'Nama Instansi dan Jabatan',
          placeholder: 'Kementerian/Lembaga, jabatan',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'instNIP',
          uiType: 'text',
          label: 'NIP/NOPEG',
          placeholder: 'Nomor pegawai',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'instSKPemerintah',
          uiType: 'text',
          label: 'Surat Keputusan Pemerintah',
          placeholder: 'Nomor SK dan lampirkan',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'imgSKPemerintah',
          label: 'Dokumen SK Pemerintah',
          uiType: 'imagepicker',
          placeholder: 'Unggah SK',
          // validator: validation.nonemptyFile,
          // useIf: { 
          //   testProperty: 'instSKPemerintah',
          //   testOperator: '==',
          //   testValue: 'nonempty', // should be a regex
          // },

        },
        { 
          name: 'divider',
          uiType: 'divider',
        },
        { 
          name: 'sub-alamat-inst',
          uiType: 'subheader',
          label: 'Alamat Instansi',
        },
        {
          name: 'almtInstGedung',
          uiType: 'text',
          label: 'Nama Gedung',
          placeholder: 'Mis: Gedung Utama',
          fullWidth: true,
        },
        {
          name: 'almtInstJalan',
          uiType: 'text',
          label: 'Jalan dan Nomor, RT/RW',
          placeholder: 'Mis: Jl. Imam Bonjol 10',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'almtInstKota',
          uiType: 'text',
          label: 'Kota',
          placeholder: 'Mis: Jakarta Selatan',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'almtInstProv',
          uiType: 'select',
          maxHeight: 200,
          label: 'Provinsi',
          selections: SELECTIONS.provinsi,
          // validator: validation.alphanum,
        },
        {
          name: 'almtInstKodepos',
          uiType: 'text',
          // type: 'tel',
          label: 'Kode Pos',
          placeholder: 'Mis: 12530',
          // validator: validation.postalCodeId,
        },
      ]
},
{ 'formId': 103,
  'name': 'Riwayat Pendidikan, Pekerjaan, Organisasi',
  'schema': // order is as they appear on the form
      [
         { 
          name: 'sub-pendidikan',
          uiType: 'subheader',
          label: 'Riwayat Pendidikan',
        },
        {
          name: 'pendSDNama',
          uiType: 'text',
          label: 'Sekolah Dasar',
          placeholder: 'Nama Sekolah Dasar',
          fullWidth: true,
          validator: validation.alphanum,
        },
        {
          name: 'pendSDTempat',
          uiType: 'text',
          label: 'Alamat SD',
          placeholder: 'Kota, provinsi/negara jika luar negeri',
          fullWidth: true,
          validator: validation.alphanum,
        },
        {
          name: 'pendSDTahun',
          uiType: 'text',
          label: 'Tahun SD (awal s.d. akhir)',
          placeholder: 'mis: 2000-2006',
          fullWidth: true,
          validator: validation.alphanum,
        },
        {
          name: 'pendSDTamat',
          uiType: 'select',
          maxHeight: 200,
          label: 'Tamat',
          selections: SELECTIONS.statusTamat,
          validator: validation.alphanum,
        },
        
        {
          name: 'pendSMPNama',
          uiType: 'text',
          label: 'Sekolah Menengah Pertama',
          placeholder: 'Nama SMP',
          fullWidth: true,
          validator: validation.alphanum,
        },
        {
          name: 'pendSMPTempat',
          uiType: 'text',
          label: 'Alamat SMP',
          placeholder: 'Kota, provinsi/negara jika luar negeri',
          fullWidth: true,
          validator: validation.alphanum,
        },
        {
          name: 'pendSMPTahun',
          uiType: 'text',
          label: 'Tahun SMP (awal s.d. akhir)',
          placeholder: 'mis: 2000-2006',
          fullWidth: true,
          validator: validation.alphanum,
        },
        {
          name: 'pendSMPTamat',
          uiType: 'select',
          maxHeight: 200,
          label: 'Tamat',
          selections: SELECTIONS.statusTamat,
          validator: validation.alphanum,
        },
        
        {
          name: 'pendSMANama',
          uiType: 'text',
          label: 'Sekolah Menengah Atas',
          placeholder: 'Nama SMA',
          fullWidth: true,
          validator: validation.alphanum,
        },
        {
          name: 'pendSMATempat',
          uiType: 'text',
          label: 'Alamat SMA',
          placeholder: 'Kota, provinsi/negara jika luar negeri',
          fullWidth: true,
          validator: validation.alphanum,
        },
        {
          name: 'pendSMATahun',
          uiType: 'text',
          label: 'Tahun SMA (awal s.d. akhir)',
          placeholder: 'mis: 2000-2006',
          fullWidth: true,
          validator: validation.alphanum,
        },
        {
          name: 'pendSMATamat',
          uiType: 'select',
          maxHeight: 200,
          label: 'Tamat',
          selections: SELECTIONS.statusTamat,
          validator: validation.alphanum,
        },
        
        {
          name: 'pendUnivNama',
          uiType: 'text',
          label: 'Universitas/Akademi',
          placeholder: 'Nama Universitas/Akademi',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'pendUnivTempat',
          uiType: 'text',
          label: 'Alamat Univ',
          placeholder: 'Kota, provinsi/negara jika luar negeri',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'pendUnivTahun',
          uiType: 'text',
          label: 'Tahun Univ (awal s.d. akhir)',
          placeholder: 'mis: 2000-2006',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'pendUnivTamat',
          uiType: 'select',
          maxHeight: 200,
          label: 'Tamat',
          selections: SELECTIONS.statusTamat,
          // validator: validation.alphanum,
        },
        
        {
          name: 'pendMasterNama',
          uiType: 'text',
          label: 'Master',
          placeholder: 'Nama universitas S2',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'pendMasterTempat',
          uiType: 'text',
          label: 'Alamat Universitas',
          placeholder: 'Kota, provinsi/negara jika luar negeri',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'pendMasterTahun',
          uiType: 'text',
          label: 'Tahun Master (awal s.d. akhir)',
          placeholder: 'mis: 2000-2006',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'pendMasterTamat',
          uiType: 'select',
          maxHeight: 200,
          label: 'Tamat',
          selections: SELECTIONS.statusTamat,
          // validator: validation.alphanum,
        },
        { 
          name: 'divider',
          uiType: 'divider',
        },
        { 
          name: 'sub-pekerjaan',
          uiType: 'subheader',
          label: 'Riwayat Pekerjaan (dari baru ke lama)',
        },
        {
          name: 'pekNama1',
          uiType: 'textarea',
          label: 'Tempat Bekerja (1)',
          placeholder: 'Misal: PT XYZ\nJakarta\n2003-2004',
          fullWidth: true,
        },
        {
          name: 'pekNama2',
          uiType: 'textarea',
          label: 'Tempat Bekerja (2)',
          placeholder: 'Misal: PT ZYX\nCikarang\n2002-2003',
          fullWidth: true,
        },
        {
          name: 'pekNama3',
          uiType: 'textarea',
          label: 'Tempat Bekerja (3)',
          placeholder: 'Misal: PT ZYX\nJepang\n2001-2002',
          fullWidth: true,
        },
  
        { 
          name: 'divider',
          uiType: 'divider',
        },
        { 
          name: 'sub-organisasi',
          uiType: 'subheader',
          label: 'Organisasi di Jepang',
        },
        {
          name: 'orgNama',
          uiType: 'textarea',
          label: 'Nama Organisasi',
          placeholder: 'Nama organisasi. Ganti baris untuk setiap organisasi',
          fullWidth: true,
        }
     ]
},
];

export default LAPOR_DIRI_PELAJAR_FORM_LIST