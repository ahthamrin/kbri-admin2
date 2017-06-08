import validation from 'utils/validation'
import SELECTIONS from './selections'

export const DAFTAR_BARANG_PINDAHAN_FORM_LIST = [
{ 'formId': 280, // formId 270 - 290 are for barang pindahan
  'name': 'Data Pemilik Barang Pindahan',
  'schema': // order is as they appear on the form
      [
        { 
          name: 'subh-pemilik-barang',
          uiType: 'subheader',
          label: 'Daftar Barang Pindahan',
        },
        {
          name: 'nama',
          uiType: 'text',
          label: 'Nama Lengkap',
          placeholder: 'Nama lengkap',
          fullWidth: true,
          validator: validation.nonempty,
          // autocomplete: (thisNama) => {return {where: {type: 'LaporDiri', nama: thisNama, ticketStatus:{inq:['open','close']} }, limit: 1, order: 'updatedTime DESC' };},
          // autocomplete is a function that returns the filter param for userForms query
        },
        {
          name: 'brgPindahAlat',
          uiType: 'text',
          // type: 'tel',
          label: 'Dikirim melalui',
          placeholder: 'laut/udara/dll.',
          validator: validation.nonempty,
        },
        { 
          name: 'subh-daftar-barang',
          uiType: 'subheader',
          label: 'Daftar Barang',
        },
      ],
},
];


export default DAFTAR_BARANG_PINDAHAN_FORM_LIST