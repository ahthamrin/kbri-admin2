/*
 *
 * StartPage constants
 *
 */

import validation from 'utils/validations';

export const DEFAULT_ACTION = 'app/StartPage/DEFAULT_ACTION';
export const FIND_WNI_ACTION = 'app/StartPage/FIND_WNI_ACTION';
export const CHANGE_FORM_ELEMENT_ACTION = 'app/StartPage/CHANGE_FORM_ELEMENT_ACTION';
export const API_FIND_WNI_SUCCESS = 'app/StartPage/API_FIND_WNI_SUCCESS';
export const API_FIND_WNI_ERROR = 'app/StartPage/API_FIND_WNI_ERROR';

export const NEW_DATA_FORM = {
  'formId': 0, 
  'name': 'New Data',
  'schema':
    [
      {
        name: 'nama',
        uiType: 'text',
        floatingLabelText: 'Nama Lengkap',
        hintText: 'Nama sesuai paspor',
        fullWidth: true,
        validation: validation.nonempty,
      },
      {
        name: 'paspor',
        uiType: 'text',
        floatingLabelText: 'No Paspor/SPLP',
        hintText: 'Nomor paspor',
        fullWidth: true,
        validation: validation.nonempty,
      },
      {
        name: 'tglLahir',
        uiType: 'text',
        // type: 'tel',
        floatingLabelText: 'Tanggal lahir',
        hintText: 'DD/MM/YYYY',
        fullWidth: true,
        validation: validation.dateDDMMYYYY,
      },
    ]
};
