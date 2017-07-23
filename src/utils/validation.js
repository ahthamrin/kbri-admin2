const validation  = {};

validation.dateDDMMYYYY = (e) => {
  const errMsg =  'format DD/MM/YYYY';

  if (!e)
  	return errMsg;

	const match = e.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/);
  
  if (!match)
    return errMsg;
  const thisDate = new Date(e.replace(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/, '$3-$2-$1'));
  if (isNaN(thisDate.getTime()))
    return errMsg;
};

validation.nonempty = (e) => {
	// console.log('nonempty', e);
  if (!e || e.trim().length === 0)
    return 'wajib diisi';
}

validation.password = (e) => {
	// console.log('nonempty', e);
  if (!e || e.trim().length < 8)
    return 'password harus 8 karakter atau lebih';
}

validation.postalCodeJp = (e) => {
  const errMsg =  'contoh 123-4567';
	if (!e)
		return errMsg;

	const match = e.match(/^[0-9]{3}-[0-9]{4}$/);

	if (!match)
		return errMsg;
}

validation.postalCodeId = (e) => {
  const errMsg =  'contoh 12345';
	if (!e)
		return errMsg;

	const match = e.match(/^[0-9]{5}$/);

	if (!match)
		return errMsg;
}

validation.phoneNoJp = (e) => {
  const errMsg =  'contoh 080-1234-5678';
	if (!e)
		return errMsg;

	const match = e.match(/^0[0-9]{1,3}-[0-9]{2,4}-[0-9]{3,4}/);

	if (!match)
		return errMsg;
}

validation.phoneNoId = (e) => {
  const errMsg =  'contoh +62-845-6789-0123';
	if (!e)
		return errMsg;

	const match = e.match(/^\+[1-9][0-9]{1,2}-[1-9][0-9]{1,2}-[0-9]{1,4}-[0-9]{2,4}/);

	if (!match)
		return errMsg;
}

validation.nonemptyFile = (e) => {
  if (!e || e.trim().length === 0)
    return 'wajib diunggah';
}

validation.locked = (e, c) => {
	// return {locked: true, message: 'tidak boleh diubah'};
	if (typeof(c) !== 'undefined' && e !== c)
		return 'tidak boleh diubah';
}

validation.lockedNonEmpty = (e, c) => {
  if (!e || e.trim().length === 0)
    return 'wajib diisi';
	if (typeof(c) !== 'undefined')
		return 'tidak boleh diubah';
}

export default validation;
