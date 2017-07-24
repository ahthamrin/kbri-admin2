import validation from 'utils/validation'

import SELECTIONS from './selections'


export const LAPOR_DIRI_PEKERJA_FORM_LIST = [
{ 'formId': 200,
  'name': 'Data Pekerjaan',
  'schema': // order is as they appear on the form
      [
        { 
          name: 'sub-datapekerja', 
          uiType: 'subheader',
          label: 'Data Pekerjaan',
        },
        {
          name: 'pekJpJenis',
          uiType: 'text',
          label: 'Jenis Pekerjaan',
          placeholder: 'Mis: trainee/karyawan',
          fullWidth: true,
          validator: validation.alphanum,
        },
        {
          name: 'pekJpNama',
          uiType: 'text',
          label: 'Nama Tempat Bekerja',
          placeholder: 'Nama perusahaan/rumah sakit/panti jompo/dll.',
          fullWidth: true,
          validator: validation.alphanum,
        },
        { 
          name: 'subh-alamat-pekJp',
          uiType: 'subheader',
          label: 'Alamat Tempat Kerja',
        },
        {
          name: 'almtPekJpKodepos',
          uiType: 'text',
          // type: 'tel',
          label: 'Kode Pos',
          placeholder: '123-4567',
          validator: validation.postalCodeJp,
        },
        {
          name: 'almtPekJpProv',
          uiType: 'select',
          maxHeight: 200,
          label: 'Provinsi',
          selections: SELECTIONS.prefecture,
          validator: validation.alphanum,
        },
        {
          name: 'almtPekJpKota',
          uiType: 'text',
          label: 'Kota dan Kecamatan',
          placeholder: 'Mis: Chiba-shi Naka-ku',
          fullWidth: true,
          validator: validation.alphanum,
        },
        {
          name: 'almtPekJpDaerah',
          uiType: 'text',
          label: 'Daerah dan Nomor',
          placeholder: 'Mis: Honcho 1-23-4',
          fullWidth: true,
          validator: validation.alphanum,
        },
        {
          name: 'almtPekJpKamar',
          uiType: 'text',
          label: 'Nama Gedung dan No Kamar',
          placeholder: 'Mis: Gaia Office Tower 1023',
          fullWidth: true,
        },
        {
          name: 'almtPekJpNotel',
          uiType: 'text',
          // type: 'tel',
          label: 'Nomor Telepon',
          placeholder: 'Mis: 045-1234-5678',
          validator: validation.phoneNoJp,
        },
        { 
          name: 'divider',
          uiType: 'divider',
        },
        { 
          name: 'sub-pekerjaan-kontak',
          uiType: 'subheader',
          label: 'Kontak dan Kontrak Kerja',
        },
        {
          name: 'pekJpTantou',
          uiType: 'text',
          label: 'Nama Kontak/Penanggung Jawab di Tempat Kerja',
          placeholder: 'Nama lengkap',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'pekJpTantouNotel',
          uiType: 'text',
          // type: 'tel',
          label: 'Nomor Kontak/Penanggung Jawab di Tempat Kerja',
          placeholder: 'Mis: 045-1234-5678',
          validator: validation.phoneNoJp,
        },
        {
          name: 'pekJpKontrak',
          uiType: 'text',
          label: 'Masa Kontrak Kerja',
          placeholder: 'Mis: 1 tahun/1,5 tahun',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'pekJpGaji',
          uiType: 'text', // must be textarea
          label: 'Gaji per Bulan',
          placeholder: 'besar gaji bersih (yen) per bulan',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'pekJpBukuPelautSel',
          uiType: 'select',
          maxHeight: 200,
          label: 'ABK: Memiliki Buku Pelaut',
          selections: ['', 'TIDAK', 'YA',],
        },
        { 
          name: 'divider',
          uiType: 'divider',
          useIf: { 
            testProperty: 'pekJpBukuPelautSel',
            testOperator: '==',
            testValue: 'YA',
          },
        },
        { 
          name: 'sub-pekerjaan-pelaut',
          uiType: 'subheader',
          label: 'Data Anak Buah Kapal',
          useIf: { 
            testProperty: 'pekJpBukuPelautSel',
            testOperator: '==',
            testValue: 'YA',
          },
        },
        {
          name: 'pekJpBukuPelautNo',
          uiType: 'text',
          // type: 'tel',
          label: 'Nomor Buku Pelaut',
          placeholder: 'Nomor buku yang masih berlaku',
          useIf: { 
            testProperty: 'pekJpBukuPelautSel',
            testOperator: '==',
            testValue: 'YA',
          },
        },
        {
          name: 'pekJpTempatBukuPelaut',
          uiType: 'text',
          // type: 'tel',
          label: 'Dikeluarkan',
          placeholder: 'tempat buku dikeluarkan',
          useIf: { 
            testProperty: 'pekJpBukuPelautSel',
            testOperator: '==',
            testValue: 'YA',
          },
        },
        {
          name: 'tglPekJpTglBukuPelaut',
          uiType: 'text',
          // type: 'tel',
          label: 'Tanggal Masa Berlaku',
          placeholder: 'DD/MM/YYYY',
          useIf: { 
            testProperty: 'pekJpBukuPelautSel',
            testOperator: '==',
            testValue: 'YA',
          },
        },
        {
          name: 'pekJpKapalPelaut',
          uiType: 'text',
          // type: 'tel',
          label: 'Nama Kapal',
          placeholder: 'nama kapal tempat bekerja',
          useIf: { 
            testProperty: 'pekJpBukuPelautSel',
            testOperator: '==',
            testValue: 'YA',
          },
        },
        { 
          name: 'divider',
          uiType: 'divider',
        },
        { 
          name: 'sub-pekerjaan-id',
          uiType: 'subheader',
          label: 'Pendidikan/Pekerjaan di Indonesia',
        },
        {
          name: 'pekJpPekId',
          uiType: 'textarea', 
          label: 'Pekerjaan di Indonesia',
          placeholder: 'Nama perusahaan\ndan jenis pekerjaan',
          fullWidth: true,
          // validator: validation.alphanum,
        },
        {
          name: 'pekJpPekIdAlamat',
          uiType: 'textarea',
          // type: 'tel',
          label: 'Alamat Perusahaan',
          placeholder: 'Alamat lengkap perusahaan di Indonesia',
          useIf: { 
            testProperty: 'pekJpBukuPelautSel',
            testOperator: '==',
            testValue: 'YA',
          },
        },
        {
          name: 'pekJpPekIdNotel',
          uiType: 'text',
          // type: 'tel',
          label: 'Nomor Telepon Perusahaan',
          placeholder: 'Mis: +62-12-345-6789',
          useIf: { 
            testProperty: 'pekJpBukuPelautSel',
            testOperator: '==',
            testValue: 'YA',
          },
        },
        {
          name: 'pekJpPendTerakhir',
          uiType: 'select', 
          label: 'Pendidikan terakhir',
          placeholder: '',
          selections: ['', 'SMP atau sederajat', 'SMA atau sederajat', 'D1 atau sederajat', 'D2 atau sederajat', 'D3 atau sederajat', 'D4 atau sederajat', 'S1 atau sederajat', 'S2 atau sederajat', 'S3 atau sederajat', 'Lainnya'],
          fullWidth: true,
          // validator: validation.alphanum,
        },
      ]
},
]

export default LAPOR_DIRI_PEKERJA_FORM_LIST
