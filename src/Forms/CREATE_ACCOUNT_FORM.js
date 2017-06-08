import validation from 'utils/validation'

export const CREATE_ACCOUNT_FORM =
{ 'formId': 1, // form Id 0-19 are for user administration
  'name': 'Create an Account',
  'schema': // order is as they appear on the form
      [
        // {  
        //  name: 'sub-datadiri', 
        //  uiType: 'subheader',
        //  label: 'Data Akun',
        // },
        {
          name: 'email',
          uiType: 'text',
          type: 'email',
          label: 'Alamat Email',
          placeholder: 'Email untuk buat akun',
          fullWidth: true,
          validator: validation.nonempty,
        },
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
          name: 'rePassword',
          uiType: 'text',
          type: 'password',
          label: 'Ulangi Password',
          placeholder: 'Harus sama dengan password',
          fullWidth: true,
          validator: validation.password,
        },
      ]
}

export default CREATE_ACCOUNT_FORM