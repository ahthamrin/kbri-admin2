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
          label: 'Tingkat Studi',
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
          name: 'almtLulusId',
          uiType: 'textarea',
          label: 'Alamat di Indonesia',
          placeholder: 'Tulis alamat lengkap di Indonesia',
          fullWidth: true,
        },
        {
          name: 'telLulusId',
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
          selections: SELECTIONS.tingkatStudi,
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
      ]
},
];


export default LAPOR_LULUS_FORM_LIST