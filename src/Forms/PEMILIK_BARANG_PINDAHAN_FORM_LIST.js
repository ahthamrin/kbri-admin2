import validation from 'utils/validation'
import SELECTIONS from './selections'

export const PEMILIK_BARANG_PINDAHAN_FORM_LIST = [
{ 'formId': 270, // formId 270 - 290 are for barang pindahan
  'name': 'Data Pemilik Barang Pindahan',
  'schema': // order is as they appear on the form
      [
        { 
          name: 'subh-pemilik-barang',
          uiType: 'subheader',
          label: 'Pemilik Barang Pindahan',
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
          name: 'paspor',
          uiType: 'text',
          label: 'No Paspor/SPLP',
          placeholder: 'Nomor paspor',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'jnsPaspor',
          uiType: 'text',
          label: 'Jenis Paspor',
          placeholder: 'Biasa/Pejabat/Diplomat',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'warganegara',
          uiType: 'text',
          label: 'Warganegara',
          placeholder: 'Indonesia/Jepang/dll.',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'pekJpJenis',
          uiType: 'text',
          label: 'Pekerjaan',
          placeholder: 'Mis: trainee/karyawan',
          fullWidth: true,
          validator: validation.nonempty,
        },
      ],
},

{ 'formId': 271,
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
          name: 'kontakIdNotel',
          uiType: 'text',
          // type: 'tel',
          label: 'Nomor Telepon/HP',
          placeholder: 'Mis: +62-800-1234-5678',
          validator: validation.phoneNoId,
        },
      ],
},
{ 'formId': 271,
  'name': 'Data Kepindahan',
  'schema':
      [ 
        { 
          name: 'sub-data-kel',
          uiType: 'subheader',
          label: 'Data Kepindahan',
        },
        {
          name: 'dsrTugasJepang',
          uiType: 'text',
          label: 'Dasar Penugasan di Jepang',
          placeholder: 'Surat Keputusan/dll.',
          fullWidth: true,
          validator: validation.nonempty,
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
          name: 'dsrSelesaiTugasJepang',
          uiType: 'text',
          label: 'Dasar Selesai Penugasan di Jepang',
          placeholder: 'Surat Keputusan/dll.',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'tglKeluarJp',
          uiType: 'text',
          // type: 'tel',
          label: 'Tanggal berangkat dari Jepang',
          placeholder: 'DD/MM/YYYY',
          validator: validation.dateDDMMYYYY,
        },
        {
          name: 'penerbanganKeluarJp',
          uiType: 'text',
          label: 'Nomor Penerbangan',
          placeholder: 'GA 874/SQ 635/dll.',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'jmlKeluarga',
          uiType: 'text',
          label: 'Jumlah anggota keluarga pengikut',
          placeholder: '0 jika tidak ada/1/2/dst.',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'brgPindahAlat',
          uiType: 'text',
          // type: 'tel',
          label: 'Barang pindahan dikirim dengan',
          placeholder: 'laut/udara/dll.',
          validator: validation.nonempty,
        },
        {
          name: 'brgPindahPerusahaan',
          uiType: 'text',
          label: 'Nama perusahaan pengangkut',
          placeholder: 'nama perusahaan',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'tglBrgPindah',
          uiType: 'text',
          // type: 'tel',
          label: 'Tanggal Pengiriman',
          placeholder: 'DD/MM/YYYY',
          validator: validation.dateDDMMYYYY,
        },
      ],
},];


export default PEMILIK_BARANG_PINDAHAN_FORM_LIST