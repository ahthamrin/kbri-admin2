import validation from 'utils/validation'
import SELECTIONS from './selections'

export const LAPOR_PULANG_FORM_LIST = [
{ 'formId': 250, // formId 250-260 Lapor Pulang Related
  'name': 'Laporan Kepulangan',
  'schema': // order is as they appear on the form
      [
        { 
          name: 'sub-datawni', 
          uiType: 'subheader',
          label: 'Laporan Kepulangan',
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
          name: 'jnsKelamin',
          uiType: 'select',
          label: 'Jenis Kelamin',
          selections: SELECTIONS.jenisKelamin,
          validator: validation.nonempty,
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
          name: 'tglPulang',
          uiType: 'text',
          // type: 'tel',
          label: 'Tanggal berangkat dari Jepang',
          placeholder: 'DD/MM/YYYY',
          validator: validation.dateDDMMYYYY,
        },
      ],
},
];


export default LAPOR_PULANG_FORM_LIST