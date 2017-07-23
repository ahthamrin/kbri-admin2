import validation from 'utils/validation'

const START_FORM = {
  'formId': 0, 
  'name': 'New Data',
  'schema':
    [
      {
        name: 'nama',
        uiType: 'text',
        // label: 'Nama Lengkap',
        placeholder: 'Nama Lengkap Sesuai Paspor',
        fullWidth: true,
        validator: validation.alphanum,
      },
      {
        name: 'paspor',
        uiType: 'text',
        // label: 'No Paspor/SPLP',
        placeholder: 'Nomor Paspor/SPLP',
        fullWidth: true,
        validator: validation.alphanumstrict,
      },
      {
        name: 'tglLahir',
        uiType: 'text',
        // label: 'Tanggal lahir',
        placeholder: 'Tanggal Lahir (DD/MM/YYYY)',
        fullWidth: true,
        validator: validation.dateDDMMYYYY,
      },
    ]
};

export default START_FORM