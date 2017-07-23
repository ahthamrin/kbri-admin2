import validation from 'utils/validation'
import SELECTIONS from './selections'

export const LAPOR_DIRI_FORM_LIST = [
{ 'formId': 20, // formId 20 - 39 are for lapor diri related
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
          name: 'jnsKelamin',
          uiType: 'select',
          label: 'Jenis Kelamin',
          selections: SELECTIONS.jenisKelamin,
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
          name: 'menikah',
          uiType: 'select',
          label: 'Status Pernikahan',
          selections: SELECTIONS.statusNikah,
          validator: validation.nonempty,
        },
        {
          name: 'agama',
          uiType: 'select',
          label: 'Agama',
          selections: SELECTIONS.agama,
          validator: validation.nonempty,
        },
        { 
          name: 'divider',
          uiType: 'divider',
        },
        { 
          name: 'sub-paspor',
          uiType: 'subheader',
          label: 'Paspor',
        },
        {
          name: 'paspor',
          uiType: 'text',
          label: 'No Paspor/SPLP',
          placeholder: 'Nomor paspor',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'noregPaspor',
          uiType: 'text',
          label: 'No Registrasi',
          placeholder: 'Nomor registrasi',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'tempatPaspor',
          uiType: 'text',
          label: 'Dikeluarkan di',
          placeholder: 'Tempat dikeluarkan',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'tglPaspor',
          uiType: 'text',
          // type: 'tel',
          label: 'Tanggal Habis Berlaku',
          placeholder: 'DD/MM/YYYY',
          validator: validation.dateDDMMYYYY,
        },
        { 
          name: 'divider',
          uiType: 'divider',
        },
        { 
          name: 'sub-visa',
          uiType: 'subheader',
          label: 'Visa Jepang',
        },
        {
          name: 'jnsVisa',
          uiType: 'select', // TODO Use select. Get from server
          label: 'Jenis Visa Tinggal',
          placeholder: 'Jenis visa lebih dari 90 hari',
          selections: SELECTIONS.jenisVisa,
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'jnsVisaLain',
          uiType: 'text',
          // type: 'tel',
          label: 'Jenis Visa Tinggal (lain)',
          placeholder: 'Jenis visa lain',
          validator: validation.nonempty,
          useIf: { 
            testProperty: 'jnsVisa',
            testOperator: '==',
            testValue: SELECTIONS.jenisVisa[SELECTIONS.jenisVisa.length-1],
          },
        },
        {
          name: 'tglVisa',
          uiType: 'text',
          // type: 'tel',
          label: 'Tanggal Habis Berlaku',
          placeholder: 'DD/MM/YYYY',
          validator: validation.dateDDMMYYYY,
        },
        {
          name: 'tglDatang',
          uiType: 'text',
          // type: 'tel',
          label: 'Tanggal Tiba di Jepang',
          placeholder: 'DD/MM/YYYY',
          validator: validation.dateDDMMYYYY,
        },
        {
          name: 'rencanaKeluarJp',
          uiType: 'select',
          label: 'Rencana Meninggalkan Jepang',
          maxHeight: 100,
          selections: ['', 'Belum Tahu/Menetap'].concat([0,1,2,3,4,5,6,7,8,9,10].map( (i) => { return (new Date()).getFullYear()+i; })),
          // validator: validation.nonempty,
        },
      ],
},
{ 'formId': 21,
  'name': 'Alamat',
  'schema':
      [ 
        { 
          name: 'subh-alamat-jp',
          uiType: 'subheader',
          label: 'Alamat di Jepang',
        },
        {
          name: 'almtJpKodepos',
          uiType: 'text',
          // type: 'tel',
          label: 'Kode Pos',
          placeholder: '123-4567',
          validator: validation.postalCodeJp,
        },
        {
          name: 'almtJpProv',
          uiType: 'select',
          maxHeight: 200,
          label: 'Provinsi',
          selections: SELECTIONS.prefecture,
          validator: validation.nonempty,
        },
        {
          name: 'almtJpKota',
          uiType: 'text',
          label: 'Kota dan Kecamatan',
          placeholder: 'Mis: Chiba-shi Naka-ku',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'almtJpDaerah',
          uiType: 'text',
          label: 'Daerah dan Nomor',
          placeholder: 'Mis: Honcho 1-23-4',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'almtJpKamar',
          uiType: 'text',
          label: 'Nama Gedung dan No Kamar',
          placeholder: 'Mis: Gaia Biru 1023',
          fullWidth: true,
        },
        {
          name: 'almtJpNotel',
          uiType: 'text',
          // type: 'tel',
          label: 'Nomor Telepon/HP',
          placeholder: 'Mis: 080-1234-5678',
          validator: validation.phoneNoJp,
        },
        { 
          name: 'divider',
          uiType: 'divider',
        },
        { 
          name: 'sub-alamat-id',
          uiType: 'subheader',
          label: 'Alamat di Indonesia',
        },
        {
          name: 'almtIdKamar',
          uiType: 'text',
          label: 'Nama Gedung dan No Kamar (bila ada)',
          placeholder: 'Mis: Apartemen Graha 1034',
          fullWidth: true,
        },
        {
          name: 'almtIdJalan',
          uiType: 'text',
          label: 'Jalan dan Nomor, RT/RW',
          placeholder: 'Mis: Jl. Imam Bonjol 10',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'almtIdDaerah',
          uiType: 'text',
          label: 'Kelurahan, Kecamatan',
          placeholder: 'Mis: Jagakarsa, Pasar Minggu',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'almtIdKota',
          uiType: 'text',
          label: 'Kota',
          placeholder: 'Mis: Jakarta Selatan',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'almtIdProv',
          uiType: 'select',
          maxHeight: 200,
          label: 'Provinsi',
          selections: SELECTIONS.provinsi,
          validator: validation.nonempty,
        },
        {
          name: 'almtIdKodepos',
          uiType: 'text',
          // type: 'tel',
          label: 'Kode Pos',
          placeholder: 'Mis: 12530',
          validator: validation.postalCodeId,
        },
        { 
          name: 'divider',
          uiType: 'divider',
        },
        { 
          name: 'sub-kontak-id',
          uiType: 'subheader',
          label: 'Kontak di Indonesia',
        },
        {
          name: 'kontakIdNama',
          uiType: 'text',
          label: 'Nama',
          placeholder: 'Nama orang yang bisa dihubungi',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'kontakIdHub',
          uiType: 'text',
          label: 'Hubungan dengan Anda',
          placeholder: 'Mis: Ayah kandung',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'kontakIdNotel',
          uiType: 'text',
          // type: 'tel',
          label: 'Nomor Telepon/HP',
          placeholder: 'Mis: +62-800-1234-5678',
          validator: validation.phoneNoId,
        },
      ],
},
{ 'formId': 12,
  'name': 'Unggah Dokumen Identitas',
  'schema':
      [ 
        { 
          name: 'sub-dokumen',
          uiType: 'subheader',
          label: 'Unggah Dokumen Identitas',
        },
        {
          name: 'imgIdentPasfoto',
          label: 'Pas Foto',
          uiType: 'imagepicker',
          placeholder: 'Unggah pas foto',
          validator: validation.nonemptyFile,
        },
        {
          name: 'imgIdentPasporImg',
          label: 'Halaman Data Paspor',
          uiType: 'imagepicker',
          placeholder: 'Unggah halaman data paspor',
          validator: validation.nonemptyFile,
        },
        {
          name: 'imgIdentJpDepan',
          label: 'Residence Card (depan)',
          uiType: 'imagepicker',
          placeholder: 'Unggah halaman depan kartu identitas Jepang',
          validator: validation.nonemptyFile,
        },
        {
          name: 'imgIdentJpBlkg',
          label: 'Residence Card (belakang)',
          uiType: 'imagepicker',
          placeholder: 'Unggah halaman belakang kartu identitas Jepang',
          validator: validation.nonemptyFile,
        },
      ],
},
];


export default LAPOR_DIRI_FORM_LIST