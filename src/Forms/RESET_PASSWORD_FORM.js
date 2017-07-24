import validation from 'utils/validation'

export const RESET_PASSWORD_FORM =
{ 'formId': 1, // form Id 0-19 are for user administration
  'name': 'Reset Password',
  'schema': // order is as they appear on the form
      [
        {
          name: 'password',
          uiType: 'text',
          type: 'password',
          label: 'Password',
          placeholder: 'Password sekurangnya 8 karakter',
          fullWidth: true,
          validator: validation.password,
        },
        {
          name: 'confirmation',
          uiType: 'text',
          type: 'password',
          label: 'Ulangi Password',
          placeholder: 'harus sama dengan password',
          fullWidth: true,
          validator: validation.password,
        },
      ]
};



export default RESET_PASSWORD_FORM