import CREATE_ACCOUNT_FORM from './CREATE_ACCOUNT_FORM'
import LAPOR_DIRI_FORM_LIST from './LAPOR_DIRI_FORM_LIST'
import LAPOR_DIRI_PEKERJA_FORM_LIST from './LAPOR_DIRI_PEKERJA_FORM_LIST'
import LAPOR_DIRI_PELAJAR_FORM_LIST from './LAPOR_DIRI_PELAJAR_FORM_LIST'
import LAPOR_BELAJAR_FORM_LIST from './LAPOR_BELAJAR_FORM_LIST'
import LAPOR_LULUS_FORM_LIST from './LAPOR_LULUS_FORM_LIST'
import MOHON_PASPOR_FORM_LIST from './MOHON_PASPOR_FORM_LIST'
import LAPOR_PULANG_FORM_LIST from './LAPOR_PULANG_FORM_LIST'
import PEMILIK_BARANG_PINDAHAN_FORM_LIST from './PEMILIK_BARANG_PINDAHAN_FORM_LIST'
import DAFTAR_BARANG_PINDAHAN_FORM_LIST from './DAFTAR_BARANG_PINDAHAN_FORM_LIST'
// export const CREATE_ACCOUNT_FORM
// export const LAPOR_DIRI_FORM_LIST
// export const LAPOR_DIRI_PEKERJA_FORM_LIST
// export const LAPOR_DIRI_PELAJAR_FORM_LIST

export const FORMS = {
	CreateAccount: CREATE_ACCOUNT_FORM,
	LaporDiri: LAPOR_DIRI_FORM_LIST,
	LaporDiriPekerja: LAPOR_DIRI_PEKERJA_FORM_LIST,
	LaporDiriPelajar: LAPOR_DIRI_PELAJAR_FORM_LIST,
	LaporanKemajuanStudi: LAPOR_BELAJAR_FORM_LIST,
	LaporanKelulusan: LAPOR_LULUS_FORM_LIST,
	PermohonanPaspor: MOHON_PASPOR_FORM_LIST,
	LaporanKepulangan: LAPOR_PULANG_FORM_LIST,
	PemilikBarangPindahan: PEMILIK_BARANG_PINDAHAN_FORM_LIST,
	DaftarBarangPindahan: DAFTAR_BARANG_PINDAHAN_FORM_LIST,
}


// generate form based on the type and other values within the form
// modifier is to modify the validator, i.e., for 
export function generateForm(formValues, modifier) {
	var forms

	// console.log('generateForm', formValues.get('type'))
	switch (formValues.get('type')) {
		case 'LaporDiri':
			forms = LAPOR_DIRI_FORM_LIST
			try {
				if (formValues.get('jnsVisa').match(/student/i)) {
					forms = forms.concat(LAPOR_DIRI_PELAJAR_FORM_LIST)
				}
			}
			catch(e) {}
			try {
// SELECTIONS.jenisVisa = ['', 'Intra-company Transferee', 'Designated Activities', 'Trainee', 'Technical Intern Training', 'Medical Services', 'EPA Care Worker', 'EPA Nurse', 'College Student', 'Precollege Student', 'Student', 'Researcher', 'Professor', 'Cultural Activities', 'Artist', 'Engineer', 'Entertainer', 'Instructor', 'Investor/Business Manager', 'Journalist', 'Legal/Accounting Services', 'Specialist in Humanities/Intl Services', 'Religious Activities', 'Skilled Labor', 'Dependent', 'Permanent Resident', 'Spouse/Child of Permanent Resident', 'Spouse/Child of Japanese National', 'Dwikewarganegaraan (tanpa visa)', 'Official', 'Diplomat', 'Jenis Lain (tulis)']
				if (formValues.get('jnsVisa').match(/(Intra-company Transferee|Designated Activities|Trainee|Technical Intern Training|Medical Services|EPA Care Worker|EPA Nurse|Researcher|Professor|Cultural Activities|Artist|Engineer|Entertainer|Instructor|Investor|Journalist|Legal|Specialist in Humanities|Skilled Labor)/i)) {
				// if (formValues.get('jnsVisa').match(/(epa |medical |train|designated|transferee)/i)) {
					forms = forms.concat(LAPOR_DIRI_PEKERJA_FORM_LIST)
				}
			}
			catch(e) {}
			
			if (modifier)
				forms.forEach((f) => {
					f.schema.forEach((s) => {
						if (modifier[s.name]) {
							// console.log('modifier', s, modifier[s.name])
							// s.validator = modifier[s.name].validator
							Object.assign(s, modifier[s.name])
						}
					})
				})

			return forms

		case 'LaporanKemajuanStudi':
			forms = LAPOR_BELAJAR_FORM_LIST
			return forms

		case 'LaporanKelulusan':
			forms = LAPOR_LULUS_FORM_LIST
			return forms

		case 'PermohonanPaspor':
			forms = MOHON_PASPOR_FORM_LIST
			return forms

		case 'LaporanKepulangan':
			forms = LAPOR_PULANG_FORM_LIST
			return forms

		case 'PemilikBarangPindahan':
			forms = PEMILIK_BARANG_PINDAHAN_FORM_LIST
			return forms

		case 'DaftarBarangPindahan':
			forms = DAFTAR_BARANG_PINDAHAN_FORM_LIST
			return forms

		default:
			return
	}
}

export function getFormFieldNames(schema) {
	// get an array of field names
	if (!Array.isArray(schema))
		schema = [schema]
	var fieldNames = schema.reduce((acc, form) => {
		acc = acc.concat(form.schema.filter((f) => f.uiType != 'divider' || f.uiType != 'subheader').map((f) => f.name))
		return acc
	}, [])
	return fieldNames
}

export function getFormFields(schema) {
	// get an array of field names
	if (!Array.isArray(schema))
		schema = [schema]
	var fields = schema.reduce((acc, form) => {
		acc = acc.concat(form.schema.filter((f) => f.uiType != 'divider' || f.uiType != 'subheader'))
		return acc
	}, [])
	return fields
}

export function getPrintData(schema, values) {
	if (!Array.isArray(schema))
		schema = [schema]

	var printRule
	try {
		if (schema[0].schema[0].name == 'print') { // print must be the first item in the schema
			printRule = schema[0].schema[0].printRule
		}
	}
	catch(e) {}
	return printRule
}

export function getFormPreloadParams(formType) {
	switch (formType) {
		case 'LaporDiri':
			// preload based on a getUserForms filter
			// retrieve getState and key from redux store

			return {
				filter: {
					where: {
						type: 'LaporDiri',
						ticketStatus:{inq:['open','close']},
						email: {getState:'api', key:['token','user','email']}
					},
					limit: 1,
					order: 'updatedTime DESC', 
					fields: {
						almtJpKodepos: true,
						almtJpProv: true,
						almtJpKota: true,
						almtJpDaerah: true,
						almtJpKamar: true,
						almtJpNotel: true,
						almtIdKamar: true,
						almtIdJalan: true,
						almtIdDaerah: true,
						almtIdKota: true,
						almtIdProv: true,
						almtIdKodepos: true,
						kontakIdNama: true,
						kontakIdNotel: true,
					},
				},
				stateField: 'formValues',
			}

		case 'LaporanKemajuanStudi':
		case 'LaporanKelulusan':
		case 'PemilikBarangPindahan':
		case 'PermohonanPaspor':
			return {
				filter: {
					where: {
						type: 'LaporDiri',
						ticketStatus:{inq:['open','close']},
					},
					order: 'updatedTime DESC',
					fields: {
						nama: true,
					}
				},
				stateField: 'nama'
			}


		default:

			return

	}

}

export function getFormTitle(formValues) {
	switch (formValues.get('type')) {
		case 'PemilikBarangPindahan':
		case 'LaporanKepulangan':
		case 'LaporDiri':
		case 'PermohonanPaspor':
		case 'LaporanKelulusan':

			return {
				title: formValues.get('nama'),
			}

		case 'LaporanKemajuanStudi':
			return {
				title: formValues.get('nama') + ' ('+formValues.get('seklNama')+'/'+formValues.get('triwulanLapor')+' '+formValues.get('tahunLapor')+')',
			}
			break;

		default:

			return {
				title: formValues.get('nama'),
			}

	}
}

/*
export function template(formValues) {
	switch (formValues.get('type')) {
		case 'LaporDiri':

			break;

		case 'LaporanKemajuanStudi':

			break;

		case 'LaporanKelulusan':

			break;

		case 'PermohonanPaspor':

			break;

		default:

			return

	}
}
*/

export default FORMS