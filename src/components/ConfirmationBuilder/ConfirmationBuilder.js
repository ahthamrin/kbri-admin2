import React from 'react'
import { IndexLink, Link } from 'react-router'

import Paper from 'material-ui/Paper'

import FormBuilder from 'components/FormBuilder'


class ConfirmationBuilder extends React.Component {

  constructor(props) {
    super(props);
    console.log('ConfirmationBuilder:constructor');

    this.elCache = {};
    this.dataset = {};
  }

  renderValidation() {
    // TODO: change materialize CSS code
    for (var elemId in this.dataset) {
      try {
        let elem = document.querySelector('label[for='+elemId+']').dataset;
        if (this.dataset[elemId].error) {
          elem.error = this.dataset[elemId].error;
          document.getElementById(elemId).classList.add('invalid')
          document.getElementById(elemId).classList.remove('valid')
        }
        else {
          delete elem.error ;
          document.getElementById(elemId).classList.add('valid')
          document.getElementById(elemId).classList.remove('invalid')
        }
        // console.log('elem', elemId, this.dataset[elemId]);
      }
      catch(e) {}
    }
  }

  componentDidMount() {
    console.log('ConfirmationBuilder:componentDidMount');
    // this.renderValidation();
  }

  componentDidUpdate() {
    // this.renderValidation();
  }

  renderElement(schema, idx, value='', error='', propValues = null) {

    let {
      name,
      uiType,
      placeholder,
      type,
      disabled,
      fullWidth,
      selections,
    } = schema;
  
    let id = name + uiType + idx;

    type = type || uiType;
    // error = error || errorText;
    let dataset = {error};

    this.dataset[id] = dataset;
    // console.log('dataset',id, this.dataset[id]);

    let inputProps = {id, name, type, placeholder, value};


    switch (schema.uiType) {
      case 'divider':
        return (
          <div key={id} className="box-divider" />
        )

      case 'subheader':
        return (
          <div key={id} className="box-header">{schema.label}</div>
        )

      case 'imagepicker':
        return (
          <div key={id} >
            <label className='active' style={{fontWeight: 'bold'}} >{schema.label}</label>
            { value ?
              <div className='z-depth-2' style={{margin: '1rem', padding:'.5rem'}} >
                <img src={value} style={{width:'100%'}} />
              </div>
              : 
              <div><span style={{color:'red'}}>{error}</span></div>
            }
          </div>
        )
      case 'filepicker':
        var valueType = value && value.substr(0, value.indexOf(';'))
        var typeImage = valueType ? valueType.match(/^data:image.*/) : null
        // var typeFile = (valueType && !typeImage) ? propValues.get('file_'+name).replace(/^local_/,'') : ( schema.link ? schema.link.replace(/.+\./,'') : null )
        var fileLink = (propValues.get('file_'+name) && !typeImage) ? propValues.get('type')+'/download/'+propValues.get('file_'+name) : ''
        var fileLinkShort = '...'+fileLink.replace(/.+(.{6}\.\w+)$/,'$1')
        return (
          <div key={id} >
            <label className='active' >{schema.label}</label>
            { typeImage &&
              <div className='z-depth-2' style={{margin: '1rem', padding:'.5rem'}} >
                <img src={value} style={{width:'100%'}} />
              </div>
            }
            {
              fileLink && 
              <div key={'pic-'+id} style={{margin: '.25rem', padding:'.25rem'}} >
                  <span><a href={'https://sakuraindonesia.jp/api/containers/'+fileLink} target='_blank'>File: {fileLinkShort.toUpperCase()}</a></span>
              </div>
            }
            { !value && 
              <div><span style={{color:'red'}}>{error}</span></div>
            }
          </div>
        )
      case 'text':
      case 'select':
      default:
        if (!value && !error) {
          return(<div key={id}></div>)
        }
        return (
          <dl key={id} className="row">
            <dt className="col-sm-3">{schema.label}</dt>
            <dd className="col-sm-9">{value} <span style={{color:'red'}}>{error}</span></dd>
          </dl>
        )

    }
  }

  getElementCache(schema, idx, value, error, propValues) {
    var cacheKey = schema.name + schema.uiType + idx;
    var thisCache = this.elCache[cacheKey];
    // console.log('elementCache', thisCache, value, error)
    if (thisCache && thisCache.value == value && thisCache.error == error) {
      // console.log('cacheEl', schema, idx, value, error);
      return thisCache.comp;
    }
    else {
      thisCache = this.elCache[cacheKey] = {value, error};
      // thisCache = this.elCache[cacheKey];
      thisCache.comp = this.renderElement(schema, idx, value, error, propValues);
      thisCache.uiType = schema.uiType;
      // console.log('render form field', cacheKey, thisCache, value, error, schema);
      return thisCache.comp;
    }
  }

  renderForm(form, formIdx) {
    // console.log('rendernow', this.props.values, this.props.errors);
    const FormElements = FormBuilder.filterSchema(form.schema, this.props.values).map((schema, idx) => {
      // console.log('elErr', schema.name, formIdx, idx, this.props.errorsList[formIdx][idx])
      let error
      if (this.props.errorsList && this.props.errorsList.length)
        error = this.props.errorsList[formIdx][idx]
      return this.getElementCache( schema, idx, this.props.values.get(schema.name), error, this.props.values );
    });
    return (
      <Paper key={form.formId} zDepth={1} style={{padding: '1rem'}}>
      <div className="box box-transparent">
        {FormElements}
      </div>
      </Paper>
    )
  }

  render() {
    var FormPapers = this.props.forms.map((form, formIdx) => this.renderForm(form, formIdx))
    return (
      <div>
        {FormPapers}
      </div>
    ) 
  }

}

ConfirmationBuilder.propTypes = {
  form: React.PropTypes.object, 
  values: React.PropTypes.object, 
  errorsList: React.PropTypes.array, 
}

export default ConfirmationBuilder
