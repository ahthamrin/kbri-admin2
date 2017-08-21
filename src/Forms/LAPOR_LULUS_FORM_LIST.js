import validation from 'utils/validation'
import SELECTIONS from './selections'

export const LAPOR_LULUS_FORM_LIST = [
{ 'formId': 210, // formId 200 - 220 for lapor belajar related
  'name': 'Data Diri',
  'schema': // order is as they appear on the form
      [
        { 
          name: 'sub-datadiri', 
          uiType: 'subheader',
          label: 'Data Diri',
        },
        {
          name: 'nama',
          uiType: 'text',
          label: 'Nama Lengkap',
          placeholder: 'Nama sesuai paspor',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'tempatLahir',
          uiType: 'text',
          label: 'Tempat Lahir',
          placeholder: 'Tempat lahir sesuai paspor',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'tglLahir',
          uiType: 'text',
          // type: 'tel',
          label: 'Tanggal lahir',
          placeholder: 'DD/MM/YYYY',
          validator: validation.dateDDMMYYYY,
        },
        {
          name: 'instNama',
          uiType: 'text',
          label: 'Nama Instansi di Indonesia',
          placeholder: 'Kementerian/lembaga/universitas',
          fullWidth: true,
          // validator: validation.nonempty,
        },
        {
          name: 'tempatDatangJepang',
          uiType: 'text',
          label: 'Tempat Tiba di Jepang',
          placeholder: 'Tempat tiba di Jepang',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'tglDatangJepang',
          uiType: 'text',
          // type: 'tel',
          label: 'Tanggal Tiba di Jepang',
          placeholder: 'DD/MM/YYYY',
          validator: validation.dateDDMMYYYY,
        },
        { 
          name: 'divider',
          uiType: 'divider',
        },
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
          name: 'seklTingkat',
          uiType: 'select',
          maxHeight: 200,
          label: 'Program Studi',
          selections: SELECTIONS.tingkatStudi,
          validator: validation.nonempty,
        },
        {
          name: 'seklJurusan',
          uiType: 'text',
          label: 'Bidang Studi',
          placeholder: 'Nama jurusan dan bidang studi',
          fullWidth: true,
          // validator: validation.nonempty,
        },
        {
          name: 'seklThesis',
          uiType: 'textarea',
          label: 'Judul Tesis/Disertasi',
          placeholder: 'Tulis judul tesis/disertasi',
          fullWidth: true,
        },
        {
          name: 'seklBiaya',
          uiType: 'text',
          label: 'Biaya/Beasiswa dari',
          placeholder: 'beasiswa MEXT/Pemerintah RI/yayasan/biaya sendiri...',
          fullWidth: true,
          validator: validation.alphanum,
        },
      ],
},
{ 'formId': 211,
  'name': 'Rencana Pasca Lulus',
  'schema': // order is as they appear on the form
      [
        { 
          name: 'sub-pascalulus', 
          uiType: 'subheader',
          label: 'Rencana Pasca Lulus (Isi Salah Satu)',
        },
        { 
          name: 'divider',
          uiType: 'divider',
        },
        { 
          name: 'sub-pascakembali', 
          uiType: 'subheader',
          label: 'Kembali ke Indonesia',
        },
        {
          name: 'tglKembali',
          uiType: 'text',
          // type: 'tel',
          label: 'Tanggal Pulang',
          placeholder: 'DD/MM/YYYY',
          validator: validation.dateDDMMYYYY,
        },
        {
          name: 'almtIdLulus',
          uiType: 'textarea',
          label: 'Alamat di Indonesia',
          placeholder: 'Tulis alamat lengkap di Indonesia',
          fullWidth: true,
        },
        {
          name: 'telIdLulus',
          uiType: 'textarea',
          label: 'Telepon',
          placeholder: 'Mis: +62-21-1234-5678',
          fullWidth: true,
        },
        { 
          name: 'divider',
          uiType: 'divider',
        },
        { 
          name: 'sub-pascalulus', 
          uiType: 'subheader',
          label: 'Melanjutkan Studi di Jepang',
        },

        {
          name: 'seklNamaLanjut',
          uiType: 'text',
          label: 'Universitas',
          placeholder: 'Nama universitas/lembaga training',
          fullWidth: true,
          validator: validation.nonempty,
        },
       {
          name: 'seklJurusanLanjut',
          uiType: 'text',
          label: 'Bidang Studi',
          placeholder: 'Nama jurusan dan bidang studi',
          fullWidth: true,
          // validator: validation.nonempty,
        },
         {
          name: 'seklTingkatLanjut',
          uiType: 'select',
          maxHeight: 200,
          label: 'Program Studi',
          selections: SELECTIONS.tingkatStudi,
          validator: validation.nonempty,
        },
        {
          name: 'seklSelesaiLanjut',
          uiType: 'text',
          label: 'Rencana Belajar s.d.',
          placeholder: 'Bulan dan tahun rencana selesai belajar',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'seklBiayaLanjut',
          uiType: 'text',
          label: 'Biaya/Beasiswa dari',
          placeholder: 'beasiswa MEXT/Pemerintah RI/yayasan/biaya sendiri...',
          fullWidth: true,
          validator: validation.alphanum,
        },
        {
          name: 'almtJpLanjut',
          uiType: 'textarea',
          label: 'Alamat di Indonesia',
          placeholder: 'Tulis alamat lengkap di Indonesia',
          fullWidth: true,
        },
        {
          name: 'telJpLanjut',
          uiType: 'textarea',
          label: 'Telepon',
          placeholder: 'Mis: 080-1234-5678',
          fullWidth: true,
        },
      ]
},
];


export default LAPOR_LULUS_FORM_LIST