import validation from 'utils/validation'
import SELECTIONS from './selections'

export const MOHON_PASPOR_FORM_LIST = [
{ 'formId': 20, // formId 20 - 39 are for lapor diri related
  'name': 'Data Pemohon',
  'schema': // order is as they appear on the form
      [
        // { 
        //   name: 'sub-tgl-datang',
        //   uiType: 'subheader',
        //   label: 'Rencana Permohonan Paspor ke KBRI',
        // },
        // {
        //   name: 'msgDatang',
        //   label: '',
        //   uiType: 'markdown',
        //   placeholder: 'Harap perhatikan hal-hal berikut:\n'
        //   + '1. Periksa kalender [hari libur layanan KBRI di](https://kbritokyo.jp/hari-libur/) untuk mengatur rencana kedatangan Anda.\n'
        //   + '2. Proses pembuatan paspor dimulai dengan pengambilan foto dan sidik jari Anda di KBRI.\n'
        //   + '3. Pembuatan paspor memerlukan waktu beberapa hari dan berdasarkan keputusan dari sistem yang terpusat di Jakarta.\n'
        // },
        // { 
        //   name: 'divider',
        //   uiType: 'divider',
        // },
         { 
          name: 'sub-permohonan',
          uiType: 'subheader',
          label: 'Permohonan (pilih yang sesuai)',
        },
        {
          name: 'tempatAplikasi',
          uiType: 'select',
          label: 'Tempat Aplikasi',
          selections: ['', 'TOKYO'], // selections must start with an empty string
        },
        {
          name: 'jnsPermohonanBaru',
          uiType: 'select',
          label: 'Permohonan Baru',
          selections: ['', 'Paspor 48 hal', 'Paspor 24 hal', 'SPLP'], // selections must start with an empty string
        },
        {
          name: 'jnsPermohonanGanti',
          uiType: 'select',
          label: 'Penggantian',
          selections: ['', 'Habis Berlaku', 'Halaman Penuh', 'Hilang', 'Rusak', 'Lain-lain'], // selections must start with an empty string
        },
        {
          name: 'jnsPermohonanUbah',
          uiType: 'select',
          label: 'Pengubahan',
          selections: ['', 'Nama', 'Alamat Tempat Tinggal', 'Lain-lain'], // selections must start with an empty string
        },
        {
          name: 'tglDatangAplikasi',
          uiType: 'text',
          // type: 'tel',
          label: 'Tanggal rencana datang ',
          placeholder: 'DD/MM/YYYY',
          validator: validation.dateDDMMYYYY,
        },
        { 
          name: 'divider',
          uiType: 'divider',
        },
        { 
          name: 'sub-datadiri', 
          uiType: 'subheader',
          label: 'Data Diri',
        },
        {
          name: 'nama',
          uiType: 'text',
          label: 'Nama Lengkap',
          placeholder: 'Nama lengkap',
          fullWidth: true,
          validator: validation.nonempty,
          autocomplete: (thisNama) => {return {where: {type: 'LaporDiri', nama: thisNama, ticketStatus:{inq:['open','close']} }, limit: 1, order: 'updatedTime DESC' };},
          // autocomplete is a function that returns the filter param for userForms query
        },
        {
          name: 'namaAlias',
          uiType: 'text',
          label: 'Nama Lain (Alias)',
          placeholder: 'Nama lainnya/alias',
          fullWidth: true,
          // validator: validation.nonempty,
        },
        {
          name: 'jnsKelamin',
          uiType: 'select',
          label: 'Jenis Kelamin',
          selections: SELECTIONS.jenisKelamin, // selections must start with an empty string
          validator: validation.nonempty,
        },
        {
          name: 'tinggiBadan',
          uiType: 'text',
          type: 'number',
          label: 'Tinggi Badan (cm)',
          placeholder: 'Mis: 173',
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
          name: 'divider',
          uiType: 'divider',
        },
        { 
          name: 'sub-identitas', 
          uiType: 'subheader',
          label: 'Tanda Identitas',
        },
        {
          name: 'noIdCard',
          uiType: 'text',
          label: 'Nomor Tanda Identitas (KTP/IC/lainnya)',
          placeholder: 'Nomor identitas',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'tempatIdCard',
          uiType: 'text',
          label: 'Tempat Dikeluarkan',
          placeholder: 'Tempat identitas dikeluarkan',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'tglIdCardAwal',
          uiType: 'text',
          // type: 'tel',
          label: 'Tanggal Dikeluarkan',
          placeholder: 'DD/MM/YYYY',
          validator: validation.dateDDMMYYYY,
        },
        {
          name: 'tglIdCardAkhir',
          uiType: 'text',
          // type: 'tel',
          label: 'Berlaku sampai',
          placeholder: 'DD/MM/YYYY',
          validator: validation.dateDDMMYYYY,
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
          name: 'email',
          uiType: 'text',
          // type: 'tel',
          label: 'Alamat Email',
          placeholder: 'Mis: akun@example.net.id',
          validator: validation.nonempty,
        },

        { 
          name: 'divider',
          uiType: 'divider',
        },
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
          validator: validation.nonempty,
        },
        {
          name: 'pekJpNama',
          uiType: 'text',
          label: 'Nama Tempat Bekerja',
          placeholder: 'Nama perusahaan/rumah sakit/panti jompo/dll.',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'almtPekJpKodepos',
          uiType: 'text',
          // type: 'tel',
          label: 'Alamat Tempat Kerja: Kode Pos',
          placeholder: '123-4567',
          validator: validation.postalCodeJp,
        },
        {
          name: 'almtPekJpProv',
          uiType: 'select',
          maxHeight: 200,
          label: 'Provinsi',
          selections: SELECTIONS.prefecture,
          validator: validation.nonempty,
        },
        {
          name: 'almtPekJpKota',
          uiType: 'text',
          label: 'Kota dan Kecamatan',
          placeholder: 'Mis: Chiba-shi Naka-ku',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'almtPekJpDaerah',
          uiType: 'text',
          label: 'Daerah dan Nomor',
          placeholder: 'Mis: Honcho 1-23-4',
          fullWidth: true,
          validator: validation.nonempty,
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
          name: 'almtIdNotel',
          uiType: 'text',
          // type: 'tel',
          label: 'Nomor Telepon/HP',
          placeholder: 'Mis: +62-800-1234-5678',
          validator: validation.phoneNoId,
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
{ 'formId': 21,
  'name': 'Data Keluarga',
  'schema':
      [ 
        { 
          name: 'sub-data-kel',
          uiType: 'subheader',
          label: 'Data Keluarga',
        },
        {
          name: 'namaIbu',
          uiType: 'text',
          label: 'Nama Ibu',
          placeholder: 'Nama ibu',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'warganegaraIbu',
          uiType: 'text',
          label: 'Kewarganegaraan Ibu',
          placeholder: 'Kewarganegaraan ibu',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'tempatLahirIbu',
          uiType: 'text',
          label: 'Tempat Lahir Ibu',
          placeholder: 'Tempat lahir ibu',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'tglLahirIbu',
          uiType: 'text',
          // type: 'tel',
          label: 'Tanggal Lahir Ibu',
          placeholder: 'DD/MM/YYYY',
          validator: validation.dateDDMMYYYY,
        },
        {
          name: 'namaAyah',
          uiType: 'text',
          label: 'Nama Ayah',
          placeholder: 'Nama ayah',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'warganegaraAyah',
          uiType: 'text',
          label: 'Kewarganegaraan Ayah',
          placeholder: 'Kewarganegaraan ayah',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'tempatLahirAyah',
          uiType: 'text',
          label: 'Tempat Lahir Ayah',
          placeholder: 'Tempat lahir ayah',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'tglLahirAyah',
          uiType: 'text',
          // type: 'tel',
          label: 'Tanggal Lahir Ayah',
          placeholder: 'DD/MM/YYYY',
          validator: validation.dateDDMMYYYY,
        },
        {
          name: 'almtOrtu',
          uiType: 'textarea',
          label: 'Alamat Orang Tua',
          placeholder: 'Alamat lengkap termasuk kode pos',
          fullWidth: true,
        },
        {
          name: 'telOrtu',
          uiType: 'text',
          type: 'tel',
          label: 'Telepon Orang Tua',
          placeholder: 'Mis: +62-876-5432-6789',
          fullWidth: true,
          // validator: validation.nonempty,
        },

        {
          name: 'menikah',
          uiType: 'select',
          label: 'Status Pernikahan',
          selections: SELECTIONS.statusNikah,
          validator: validation.nonempty,
        },
        {
          name: 'namaPasangan',
          uiType: 'text',
          label: 'Nama Suami/Istri',
          placeholder: 'Nama suami/istri',
          fullWidth: true,
          useIf: { 
            testProperty: 'menikah',
            testOperator: '==',
            testValue: 'Kawin',
          },
        },
        {
          name: 'warganegaraPasangan',
          uiType: 'text',
          label: 'Kewarganegaraan Suami/Istri',
          placeholder: 'Kewarganegaraan suami/istri',
          fullWidth: true,
          useIf: { 
            testProperty: 'menikah',
            testOperator: '==',
            testValue: 'Kawin',
          },
        },
        {
          name: 'tempatLahirPasangan',
          uiType: 'text',
          label: 'Tempat Lahir Suami/Istri',
          placeholder: 'Tempat lahir suami/istri',
          fullWidth: true,
          useIf: { 
            testProperty: 'menikah',
            testOperator: '==',
            testValue: 'Kawin',
          },
        },
        {
          name: 'tglLahirPasangan',
          uiType: 'text',
          // type: 'tel',
          label: 'Tanggal Lahir Suami/Istri',
          placeholder: 'DD/MM/YYYY',
          useIf: { 
            testProperty: 'menikah',
            testOperator: '==',
            testValue: 'Kawin',
          },
        },
        {
          name: 'almtPasangan',
          uiType: 'textarea',
          label: 'Alamat Suami/Istri',
          placeholder: 'Alamat lengkap termasuk kode pos',
          fullWidth: true,
          useIf: { 
            testProperty: 'menikah',
            testOperator: '==',
            testValue: 'Kawin',
          },
        },

      ],
},
{ 'formId': 21,
  'name': 'Kontak Darurat',
  'schema':
      [ 
        { 
          name: 'subh-kontak-darurat',
          uiType: 'subheader',
          label: 'Yang Dapat Dihubungi Jika Terjadi Permasalahan',
        },
        {
          name: 'namaKontakJp',
          uiType: 'text',
          label: 'Nama Kontak di Jepang',
          placeholder: 'Nama lengkap',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'almtKontakJp',
          uiType: 'textarea',
          label: 'Alamat Kontak di Jepang',
          placeholder: 'Alamat lengkap termasuk kode pos',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'telKontakJp',
          uiType: 'text',
          type: 'tel',
          label: 'Nomor HP',
          placeholder: 'Mis: 080-5432-6789',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'namaKontakId',
          uiType: 'text',
          label: 'Nama Kontak di Indonesia',
          placeholder: 'Nama lengkap',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'almtKontakId',
          uiType: 'textarea',
          label: 'Alamat Kontak di Indonesia',
          placeholder: 'Alamat lengkap termasuk kode pos',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'telKontakId',
          uiType: 'text',
          type: 'tel',
          label: 'Nomor HP',
          placeholder: 'Mis: +62-876-5432-6789',
          fullWidth: true,
          validator: validation.nonempty,
        },
      ],
},
{ 'formId': 22,
  'name': 'Unggah Dokumen',
  'schema':
      [ 
        { 
          name: 'sub-dokumen',
          uiType: 'subheader',
          label: 'Unggah Dokumen',
        },
        // {
        //   name: 'imgIdentPasfoto',
        //   label: 'Pas Foto (Latar Putih)',
        //   uiType: 'imagepicker',
        //   placeholder: 'Unggah pas foto (latar putih)',
        //   validator: validation.nonemptyFile,
        // },
        {
          name: 'imgIdentPasporImg',
          label: 'Halaman Data Paspor',
          uiType: 'imagepicker',
          placeholder: 'Unggah halaman data paspor',
          validator: validation.nonemptyFile,
        },
        {
          name: 'imgIdent',
          label: 'Identitas (KTP/IC/Lainnya)',
          uiType: 'imagepicker',
          placeholder: 'Unggah halaman depan kartu identitas',
          validator: validation.nonemptyFile,
        },
        {
          name: 'imgAkte',
          label: 'Akte Kelahiran/Surat Nikah/Ijazah',
          uiType: 'imagepicker',
          placeholder: 'Unggah akte kelahiran/surat nikah/ijazah',
          validator: validation.nonemptyFile,
        },
      ],

},];


export default MOHON_PASPOR_FORM_LIST