import validation from 'utils/validation'

export const MULAI_BANTUAN_DARURAT_FORM =
{ 'formId': 998, // form Id 0-19 are for user administration
  'name': 'Mulai Bantuan Darurat',
  'schema': // order is as they appear on the form
      [
        {
          name: 'challenge',
          uiType: 'text',
          label: 'Isi sesuai instruksi',
          placeholder: 'Isi sesuai instruksi',
          fullWidth: true,
          validator: validation.nonempty,
        },
      ]
};



export default MULAI_BANTUAN_DARURAT_FORM