import validation from 'utils/validation'

export const LOGIN_FORM =
{ 'formId': 1, // form Id 0-19 are for user administration
  'name': 'Login',
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
          // label: 'Alamat Email',
          placeholder: 'Alamat Email',
          fullWidth: true,
          validator: validation.nonempty,
        },
        {
          name: 'password',
          uiType: 'text',
          type: 'password',
          // label: 'Password',
          placeholder: 'Password',
          fullWidth: true,
          validator: validation.password,
        },
      ]
};

export default LOGIN_FORM