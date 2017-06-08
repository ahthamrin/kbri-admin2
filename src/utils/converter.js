import { Map } from 'immutable'

const Converter = {};

Converter.camelCasetoTitle = (str) => {
	return str ? str.replace(/([A-Z])/g, ' $1').trim() : ''
}

Converter.fromDateToISODate = (dateStr, format='DD/MM/YYYY') => {
	switch (format) {


		default: // DD/MM/YYYY
			return new Date(dateStr.replace(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/, '$3-$2-$1Z'))
	}
}

Converter.fromDateToISOString = (dateStr, format='DD/MM/YYYY') => {
	switch (format) {


		default: // DD/MM/YYYY
			return dateStr.replace(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/, '$3-$2-$1T00:00:00.000Z')
			// const thisDate = new Date(dateStr.replace(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/, '$3-$2-$1Z'));
			// console.log(thisDate.toISOString());
			// return thisDate.toISOString();
	}
}


Converter.fromISODateToDate = (date, format='DD/MM/YYYY') => {
	switch (format) {

		default:
			if (typeof(date) === 'string') {
				// XXX doesn't check that date adheres to ISO format YYYY-MM-DDTHH:MM:SS.mmmZ
				return date.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2}).+Z$/,'$3/$2/$1')
			}
	}
}

Converter.formTgltoApiDate = (formData) => {
	if (formData instanceof Map) {
		for (let k of formData.entries()) {
			if (k[0].match(/^tgl/)) {
				formData = formData.set(k[0],Converter.fromDateToISOString(k[1]))
			}
		}
		return formData
	}
	else {
		for (let k in formData) {
			if (k.match(/^tgl/)) {
				formData[k] = Converter.fromDateToISOString(formData[k])
			}
		}
		return formData
	}
}

Converter.fromApiDatetoFormTgl = (apiData) => { // apiData is immutableJS.Map()
	if (apiData instanceof Map) {
		for (let k of apiData.entries()) {
			if (k[0].match(/^tgl/)) {
				apiData = apiData.set(k[0],Converter.fromISODateToDate(k[1]))
			}
		}
		return apiData
	}
	else {
		for (let k in apiData) {
			if (k.match(/^tgl/)) {
				apiData[k] = Converter.fromISODateToDate(apiData[k])
			}
		}
		return apiData
	}
}


// ------ image conversion
// http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
Converter.dataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

// http://stackoverflow.com/questions/23013871/how-to-parse-into-base64-string-the-binary-image-from-response
// Converter.blobtoDataURI = (blob) => btoa(String.fromCharCode.apply(null, new Uint8Array(blob)))
// Converter.blobtoDataURI = (blob) => URL.createObjectURL(blob))

//**blob to dataURL**
// http://stackoverflow.com/questions/23150333/html5-javascript-dataurl-to-blob-blob-to-dataurl
Converter.blobToDataURL = (blob, callback) => {
    var a = new FileReader();
    a.onload = function(e) {callback(e.target.result);}
    a.readAsDataURL(blob);
}


export default Converter