import React from 'react'
import { IndexLink, Link } from 'react-router'
import ImagePicker from 'components/ImagePicker'

class FormBuilder extends React.Component {

  constructor(props) {
    super(props);
    console.log('FormBuilder:constructor');

    this.elCache = {};
    this.dataset = {};
  }

  static filterSchema(schema, values) {
    // filter schema fields that depends on other fields
    var reworked = schema.map((thisField, idx) => {
      if (!thisField.useIf) {
        if (typeof(thisField.display) != 'boolean')
          thisField.display = true;
      }
      else {
        var testFieldVal;
        try {
          // try if val is undefined
          testFieldVal = values.get(thisField.useIf.testProperty);
        }
        catch(e) {};
        // console.log(thisField.useIf, testFieldVal);
        var use = false;
        switch (thisField.useIf.testOperator) {
          case '==':
            if (thisField.useIf.testValue == testFieldVal)
              use = true;
            break;

          default:
        }

        if (use)
          thisField.display = true;
        else
          thisField.display = false;
      }
      return thisField;
    });

    return reworked.filter((field) => field.display);
  }

  static validate(form, values) {
    // console.log('validate', form, values);
    const FormElements = FormBuilder.filterSchema(form.schema, values).map((thisSchema) => {
      if (thisSchema.validator) {
        // console.log('valid?', thisSchema.name, values.get(thisSchema.name), thisSchema.validator(values.get(thisSchema.name)));
        return thisSchema.validator(values.get(thisSchema.name));
      }
      else
        return '';
    });
    return FormElements;//.filter((e) => e != '');
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

  componentWillMount() {
    this._componentDidMount = false
  }

  componentDidMount() {
    console.log('FormBuilder:componentDidMount')
    this._componentDidMount = true

    // Materialize CSS element initializations
    // for (var elemId in this.elCache) {
    //   let elemUI =  ({
    //       'select': () => {
    //         console.log($('#'+elexxxmId));
    //         // $('#'+elemId).material_select();
    //       },

    //     })[this.elCache[elemId].uiType]

    //   if (elemUI) elemUI();
    // }

$('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        console.log(modal, trigger);
      },
      complete: function() { console.log('Closed'); } // Callback for Modal close
    }
  );
    this.renderValidation();
  }

  componentDidUpdate() {
    this._componentDidMount = false
    // console.log('FormBuilder:componentDidUpdate');

    // Materialize CSS element initializations
    // for (var elemId in this.elCache) {
    //   let elemUI =  ({
    //       'select': () => {
    //         console.log($('#'+elexxxmId));
    //         // $('#'+elemId).material_select();
    //       },
          
    //     })[this.elCache[elemId].uiType]

    //   if (elemUI) elemUI();
    // }

$('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        console.log(modal, trigger);
      },
      complete: function() { console.log('Closed'); } // Callback for Modal close
    }
  );

    this.renderValidation();
  }

  state = {
    dialogOpen : null,
  }

  handleOpenDialog = (name) => {
    this.setState({dialogOpen: name});
  }

  handleCloseDialog = () => {
    this.setState({dialogOpen: null});
  }

  renderElement(schema, idx, value='', error='') {

    let {
      name,
      uiType,
      placeholder,
      type,
      disabled,
      fullWidth,
      errorText,
      selections,
      readOnly,
      autocomplete,
    } = schema;
  
    let id = name + uiType + idx;

    type = type || uiType;
    error = error || errorText;

    let dataset = {error};

    this.dataset[id] = dataset;
    // console.log('dataset',id, this.dataset[id]);

    let onBlur = this.props.onBlur



    let inputProps = {id, name, type, placeholder, value, disabled, readOnly};


    var inputOnChange = (evt) => {
      // console.log(evt,evt.target.value);
      if (this.props.onChange)
        this.props.onChange(name, evt.target.value, schema.validator);

    }

    var acStyle = {
      transition: 'opacity 0.2s linear',
      zIndex: 10000,
      opacity: 1, //this._componentDidMount ? 1 : 0,
      position: 'absolute',
      top: '2.4rem',
      border: 'solid 1px grey',
      padding: '0rem 2rem .2rem .2rem',
      background: 'white',
    }

    var acSpanStyle = {
      display: 'block',
      marginLeft: '0.2rem',
      marginRight: '1rem',
      padding: '0.4rem',

     }

    var thisAutocompleteElement;

    var inputOnFocus = (evt) => {
      try {
      console.log('inputOnFocus', thisAutocompleteElement)
      if (datasource && datasource.length)
        thisAutocompleteElement.style.opacity = 1;
      } catch(e) {}
    }

    var inputOnBlur = (evt) => {
      if (this.props.onBlur)
        this.props.onBlur(evt);
      try {
      // console.log('inputOnBlur', thisAutocompleteElement)
      thisAutocompleteElement.style.opacity = 0
      } catch(e) {}

    }

    if (readOnly)
      inputOnChange = () => {}

    var onAutoCompleteClick = (e) => {
      // console.log('onAutoCompleteClick', e)
      // value = e;
      if (this.props.onChange)
        this.props.onChange(name, e, schema.validator);

      if (this.props.onAutocomplete)
        this.props.onAutocomplete(schema.autocomplete(e))
    }

    let datasource = (autocomplete && this.props.autocompleteDataSource.get(name))? this.props.autocompleteDataSource.get(name).toJS().filter((d) => value.length && d.substring(0, value.length).toLowerCase() == value.toLowerCase() && d != value) : undefined;
    if (datasource && !datasource.length)
      datasource = undefined

    const AutoComplete = datasource ? 
      datasource.map((e,idx) => <div style={acSpanStyle} key={idx} onClick={()=> onAutoCompleteClick(`${e}`)}>{e}</div> )
      : <div></div>

    // console.log('datasource', this.props.autocompleteDataSource.get(name))

    try {

    const Element = ({
      'divider': () => 
        (
          <div key={id} className='divider' style={{marginTop: '1.5rem', marginBottom: '1.5rem'}} ></div>
        ),

      'subheader': () => 
        (
          <div key={id} className='grey-text text-darken-2' style={{fontSize: '100%', marginBottom: '2rem', paddingLeft: '12px'}} >{schema.label}</div>
        ),

      'text': () =>
        (
          <div key={id} className={'input-field '+(schema.className|| '')} >
            <input {...inputProps} autoComplete='off' className='' onChange={inputOnChange} onFocus={inputOnFocus} onBlur={inputOnBlur} />
            <label htmlFor={id} className='active' >{schema.label}</label>
            { autocomplete && datasource && <div style={acStyle} ref={(ref) => thisAutocompleteElement = ref}>{AutoComplete}</div>}
          </div>
        ),

      'textarea': () =>
        (
          <div key={id} className={'input-field '+(schema.className|| '')} >
            <textarea {...inputProps} className='materialize-textarea' onChange={inputOnChange} ></textarea>
            <label htmlFor={id} className='active' >{schema.label}</label>
          </div>
        ),


      'select': () => 
        (
          <div key={id} className={'input-field '+(schema.className|| '')} >
            <label htmlFor={id} className='active' >{schema.label}</label>
            <select {...inputProps} className='browser-default' onChange={inputOnChange} >
              {selections.map((v,idx)=>(<option key={idx} value={v}>{v}</option>))}
            </select>
          </div>
        ),

      'imagepicker': () =>
        (
          <div key={id} className={'input-field input-image'+(schema.className|| '')} >
            <ImagePicker {...inputProps} label={schema.label} onChange={inputOnChange} />
            {
              value && 
              <div key={'pic-'+id} style={{display:'inline-block'}} className='btn-flat' data-target={'modal-img-'+id}>
                <img className='z-depth-3' src={value} style={{height:'100%', overflow:'hidden'}} />
              </div>
            }
            { value &&
              <div key={'modal-'+id} id={'modal-img-'+id} className='modal'>
                  <div className='modal-content'>
                  <img src={value} style={{width: '100%', height: 'auto'}} />
                  </div>
                  <div className='modal-footer'>
                    <a href='#!' className=' modal-action modal-close waves-effect waves-green btn-flat'>Tutup</a>
                  </div>
                </div>
            }
          </div>
        )

    })[schema.uiType]() || (<div key={id}></div>);

    // console.log('element', Element);

    // return Element[schema.uiType]() || (<div></div>);
    return Element;
    }
    catch(e) {
      return (<div key={id}></div>);
    }
  }

  // getElementCache(schema, idx, value, error) {
  getElementCache(schema, idx, props) {
    var value = props.values.get(schema.name)
    var error = props.errors.get(schema.name)
    var autocomplete
    try {
      autocomplete = props.autocompleteDataSource.get(schema.name)
    } catch(e) {}
    var cacheKey = schema.name + schema.uiType + idx;
    var thisCache = this.elCache[cacheKey];
    // console.log('elementCache', thisCache, value, error)
    if (thisCache && thisCache.value == value && thisCache.error == error && thisCache.autocomplete == autocomplete) {
      // console.log('cacheEl', schema, idx, value, error, autocomplete);
      return thisCache.comp;
    }
    else {
      thisCache = this.elCache[cacheKey] = {value, error, autocomplete};
      // thisCache = this.elCache[cacheKey];
      thisCache.comp = this.renderElement(schema, idx, value, error);
      thisCache.uiType = schema.uiType;
      // console.log('render form field', cacheKey, thisCache, value, error, schema);
      return thisCache.comp;
    }
  }

  render() {
    // console.log('rendernow', this.props.values, this.props.errors);
    const FormElements = FormBuilder.filterSchema(this.props.form.schema, this.props.values).map((schema, idx) => {
      // return this.getElementCache( schema, idx, this.props.values.get(schema.name), this.props.errors.get(schema.name) );
      return this.getElementCache( schema, idx, this.props );
    });
    return (
      <div className='form-builder' >
      {FormElements}
      </div>
    )
  }

}

FormBuilder.propTypes = {
  form: React.PropTypes.object, 
  values: React.PropTypes.object, 
  errors: React.PropTypes.object, 
  onChange: React.PropTypes.func,
}

export default FormBuilder
