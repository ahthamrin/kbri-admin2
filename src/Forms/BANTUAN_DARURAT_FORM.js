import validation from 'utils/validation'

export const BANTUAN_DARURAT_FORM =
{ 'formId': 999, // form Id 0-19 are for user administration
  'name': 'Bantuan Darurat',
  'schema': // order is as they appear on the form
      [
        {
          name: 'masalah',
          uiType: 'textarea',
          label: 'Permasalahan Anda',
          placeholder: 'Beritahu lokasi Anda melalui peta di atas\ndan jelaskan secara singkat situasi Anda',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'nama',
          uiType: 'text',
          label: 'Nama',
          placeholder: 'Nama lengkap/panggilan',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'notel',
          uiType: 'text',
          label: 'Nomor Telepon',
          placeholder: 'Nomor yang bisa dihubungi',
          fullWidth: true,
          validator: validation.nonempty,
        },
      ]
};

export default BANTUAN_DARURAT_FORM