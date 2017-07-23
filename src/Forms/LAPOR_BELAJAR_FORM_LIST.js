import validation from 'utils/validation'

export const LAPOR_BELAJAR_FORM_LIST = [
{ 'formId': 200, // formId 200 - 220 for lapor belajar related
  'name': 'Data Diri',
  'schema': // order is as they appear on the form
      [
        { 
          name: 'sub-datalapor', 
          uiType: 'subheader',
          label: 'Periode Lapor',
        },
        {
          name: 'triwulanLapor',
          uiType: 'select',
          label: 'Laporan Triwulan Periode',
          selections: ['', 'Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Okt-Des'], // selections must start with an empty string
          validator: validation.nonempty,
        },
        {
          name: 'tahunLapor',
          uiType: 'select',
          label: 'Laporan Triwulan Tahun',
          selections: [''].concat([-3,-2,-1,0].map( (i) => { return (new Date()).getFullYear()+i; })),
          validator: validation.nonempty,
        },
        {
          name: 'instNama',
          uiType: 'text',
          label: 'Nama Instansi',
          placeholder: 'Kementerian/Lembaga',
          fullWidth: true,
          // validator: validation.nonempty,
        },
        {
          name: 'instJabatan',
          uiType: 'text',
          label: 'Jabatan',
          placeholder: 'jabatan',
          fullWidth: true,
          // validator: validation.nonempty,
        },
        {
          name: 'instPangkat',
          uiType: 'text',
          label: 'Pangkat/Golongan',
          placeholder: 'pangkat/golongan',
          fullWidth: true,
          // validator: validation.nonempty,
        },
        {
          name: 'instNIP',
          uiType: 'text',
          label: 'NIP/NOPEG',
          placeholder: 'Nomor pegawai',
          fullWidth: true,
          // validator: validation.nonempty,
        },
        {
          name: 'instSKPemerintah',
          uiType: 'text',
          label: 'Surat Keputusan Pemerintah',
          placeholder: 'Nomor SK dan lampirkan',
          fullWidth: true,
          // validator: validation.nonempty,
        },
      ],
},
{ 'formId': 201,
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
          validator: validation.nonempty,
        },
        {
          name: 'seklJurusan',
          uiType: 'text',
          label: 'Jurusan',
          placeholder: 'Nama Jurusan',
          fullWidth: true,
          // validator: validation.nonempty,
        },
         {
          name: 'seklTingkat',
          uiType: 'select',
          maxHeight: 200,
          label: 'Tingkat Studi',
          selections: ['', 'Undergraduate', 'Master', 'Doctoral', 'Diploma', 'Training', 'Research', 'Sekolah', ],
          validator: validation.nonempty,
        },
        {
          name: 'seklMulai',
          uiType: 'text',
          label: 'Mulai Belajar',
          placeholder: 'Bulan dan tahun',
          fullWidth: true,
          // validator: validation.nonempty,
        },
        {
          name: 'seklSemester',
          uiType: 'select',
          maxHeight: 200,
          label: 'Semester',
          selections: ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
          validator: validation.nonempty,
        },
        {
          name: 'seklPembimbing',
          uiType: 'text',
          label: 'Nama Pembimbing',
          placeholder: 'Profesor yang membimbing',
          fullWidth: true,
          // validator: validation.nonempty,
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
          validator: validation.nonempty,
        },
        {
          name: 'seklNamaKontak',
          uiType: 'text',
          label: 'Nama Contact Person di Jepang',
          placeholder: 'Nama orang yang dapat dihubungi',
          fullWidth: true,
          // validator: validation.nonempty,
        },
        {
          name: 'seklAlmtKontak',
          uiType: 'textarea',
          label: 'Alamat Kontak di Jepang',
          placeholder: 'Mis: 1-2-3 Honcho, Naka-ku, Tokyo 123-4567',
          fullWidth: true,
          // validator: validation.nonempty,
        },
        {
          name: 'seklTelKontak',
          uiType: 'text',
          type: 'tel',
          label: 'Telepon Kontak di Jepang',
          placeholder: 'Mis: 03-1234-5678',
          fullWidth: true,
          // validator: validation.nonempty,
        },
      ]
},

{ 'formId': 201,
  'name': 'Laporan Belajar',
  'schema':
      [ 
        { 
          name: 'sub-lapbel', 
          uiType: 'subheader',
          label: 'Laporan Belajar',
        },
        {
          name: 'lapbelStatus',
          uiType: 'textarea',
          label: 'Uraian Ringkas Laporan Belajar',
          placeholder: 'Tulis mata kuliah/subjek yang diambil, hasil ujian, penyelesaian karya tulis/tesis, program yang diambil pada semster/tahun ini dll.',
          fullWidth: true,
        },
        {
          name: 'lapbelRencana',
          uiType: 'textarea',
          label: 'Rencana Triwulan Mendatang',
          placeholder: 'Tulis rencana tiga bulan ke depan.',
          fullWidth: true,
        },
        {
          name: 'lapbelMasalah',
          uiType: 'textarea',
          label: 'Hambatan/Masalah dan Saran',
          placeholder: 'Tulis hambatan atau masalah dalam belajar, serta saran-saran Anda',
          fullWidth: true,
        },
        { 
          name: 'divider',
          uiType: 'divider',
        },
        { 
          name: 'sub-lapbeldok', 
          uiType: 'subheader',
          label: 'Dokumen Pendukung Laporan Belajar',
        },
        {
          name: 'imgLapbelDok1',
          label: 'Dokumen Pendukung 1',
          uiType: 'imagepicker',
          placeholder: 'Unggah dokumen pendukung',
        },
        {
          name: 'imgLapbelDok2',
          label: 'Dokumen Pendukung 2',
          uiType: 'imagepicker',
          placeholder: 'Unggah dokumen pendukung',
        },
        {
          name: 'imgLapbelDok3',
          label: 'Dokumen Pendukung 3',
          uiType: 'imagepicker',
          placeholder: 'Unggah dokumen pendukung',
        },
        {
          name: 'imgLapbelDok4',
          label: 'Dokumen Pendukung 4',
          uiType: 'imagepicker',
          placeholder: 'Unggah dokumen pendukung',
        },
        {
          name: 'imgLapbelDok5',
          label: 'Dokumen Pendukung 5',
          uiType: 'imagepicker',
          placeholder: 'Unggah dokumen pendukung',
        },
      ],
},
];


export default LAPOR_BELAJAR_FORM_LIST