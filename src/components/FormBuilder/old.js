/**
/**
/**
/**
/**
*
* FormBuilder
*
*/

import React, { PropTypes } from 'react';
import { Map, fromJS, toJS } from 'immutable';
// import styled from 'styled-components';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import ModSelectField from 'components/SelectField';

import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import Avatar from 'material-ui/Avatar';

import ImagePicker from 'components/ImagePicker';

import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

import RaisedButton from 'material-ui/RaisedButton';
import ImageAddAPhoto from 'material-ui/svg-icons/image/add-a-photo';


const styleAlignLeft = {paddingLeft: 0};
const styleMarginTop = {marginTop: 48};
const styleElement = {
  display: 'block',
  height: '72px',
  marginBottom: '12px',
};

const stylePaper = {
  height: '60px',
  width: '60px',
  marginLeft: '160px',
  marginTop: '-84px',
  overflow: 'hidden',

}

const styleImagePicker = {
  display: 'inline',
  verticalAlign: 'middle',
  margin: 'auto',
  width: '100%',
  padding: '3px',
}

const styleImageEmpty = {
  fontSize: '75%',
  textAlign: 'center',
  color: 'rgba(255,0,0,0.875)',
}

const styleImageErrorText = {
  height: '84px !important',
  paddingLeft: 12,
}

const styleDialogContent = {
  width: '90%',
  margin: 'auto',
  maxWidth: '90%',
}


class FormBuilder extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    console.log('FormBuilder:constructor');

    this.elCache = {}; // cache React Component. structure {val, err, comp}

    // console.log('DropDownArrow', (new DropDownArrow()).render());
  }
  
  
  componentDidMount() {
    console.log('FormBuilder:componentDidMount');
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('FormBuilder:componentWillReceiveProps', nextProps);
  // }
  
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('FormBuilder:shouldComponentUpdate', nextProps, nextState);
  //   return true;
  // }
  
  state = {
    dialogOpen : null,
  }

  handleOpenDialog = (name) => {
    this.setState({dialogOpen: name});
  }

  handleCloseDialog = () => {
    this.setState({dialogOpen: null});
  }

  getElementCache(elSchema, idx, elValue, elError) {
    var elCacheKey = elSchema.name + idx;
    var elCache = this.elCache[elCacheKey];

    if (elCache && elCache.val == elValue && elCache.err == elError) {
      // console.log('cacheEl', elSchema, idx, elValue, elError);
      return elCache.comp;
    }
    else {
      if (!elCache) {
        this.elCache[elCacheKey] = {val: elValue, err: elError};
        elCache = this.elCache[elCacheKey];
      }
      elCache.comp = this.renderElement(elSchema, idx, elValue, elError);
      return elCache.comp;
    }
  }

  renderElement(elSchema, idx, elValue, elError) {
    // console.log('renderElement', elSchema, idx, elError);

    const thisProps = Object.assign({}, elSchema);
    const topProps = {};

    delete thisProps.useIf;
    delete thisProps.display;

    topProps.key = thisProps.name+thisProps.type+idx;

    topProps.className = thisProps.className;
    delete thisProps.className;

    topProps.style = Object.assign({}, thisProps.style); 
    // set minimum height for the container to prevent input position movement
    delete thisProps.style;

    thisProps.value = elValue;
    delete thisProps.uiType;

    const validation = thisProps.validation;
    delete thisProps.validation;

    if (elError)
      thisProps.errorText = elError;
    else {
      if (validation)
        thisProps.errorText = validation(thisProps.value);
    }


    thisProps.onChange = (evt,val) => this.props.onChange(evt.target.name, val, validation);

    let selections;


    switch (elSchema.uiType) {
      case 'divider':
        return(
          <class>
          );
      case 'subheader':
        return(
          <Subheader key={topProps.key} style={styleAlignLeft} >{thisProps.label}</Subheader>
          );
      case 'text':
        // console.log(thisProps);
        thisProps.style = styleElement;
        return(
          <div {...topProps} ><TextField {...thisProps} /></div>
        );

      case 'date':
        // thisProps.container = 'inline';
        thisProps.onChange = (evt, val) => {
          console.log('DatePicker', val, val.toISOString());
          return this.props.onChange(thisProps.name, val, validation);
        };
        // console.log(thisProps);
        return(
          <div {...topProps} ><DatePicker {...thisProps} /></div>
        );

      case 'select': //html5 select
        thisProps.style = {marginBottom: '12px'};
        if (window.navigator.userAgent.search('Mobi') < 0) {
          thisProps.onChange = (evt, key, val) => {
            return this.props.onChange(thisProps.name, val, validation);
          };


          selections = thisProps.selections.map((el,idx) => {
            return (
              <MenuItem key={idx} value={el} primaryText={el}/>
            )
          });
          delete thisProps.selections;
          return(
            <div {...topProps} ><SelectField {...thisProps} >
              {selections}
            </SelectField></div>
          );
        }
        else {
          thisProps.onChange = (evt) => {
            // console.log('SelectField', thisProps.name, evt.target.value);
            // return this.props.onChange(thisProps.name, val, null);
            return this.props.onChange(thisProps.name, evt.target.value, validation);
          };

          selections = thisProps.selections.map((el,idx) => {
            return (
              <option key={idx} value={el}>{el}</option>
            )
          });
            // <option key={idx} value={el}>{el}</option>
            // <MenuItem key={idx} value={el} primaryText={el}/>
          // console.log(selections);
          delete thisProps.selections;
          return(
            <div {...topProps} ><ModSelectField {...thisProps} >
              {selections}
            </ModSelectField></div>
          );
            // <div {...topProps} ><SelectField {...thisProps} >
            //   {selections}
            // </SelectField></div>
            // <select value={thisProps.value} key={topProps.key} onChange={(a,b)=>console.log(a.target.value,b,arguments)} >
            //   {selections}
            // </select>
        }

      case 'xxselect': // material-ui select
        thisProps.onChange = (evt, key, val) => {
          return this.props.onChange(thisProps.name, val, validation);
        };

        selections = thisProps.selections.map((el,idx) => {
          return (
            <MenuItem key={idx} value={el} primaryText={el}/>
          )
        });
        delete thisProps.selections;
        return(
          <div {...topProps} ><SelectField {...thisProps} >
            {selections}
          </SelectField></div>
        );

      case 'radio':
        thisProps.onChange = (evt, val) => {
          // console.log('RadioButtonGroup',evt, val);
          return this.props.onChange(thisProps.name, val, validation);
        };
          selections = thisProps.selections.map((el,idx) => {
        return (
          <RadioButton key={idx} value={el} label={el} />
        )});
        // console.log(selections);
        delete thisProps.selections;
        return(
          <div {...topProps} ><RadioButtonGroup {...thisProps} >
            {selections}
          </RadioButtonGroup></div>
        );
          // <div {...topProps} ><RadioButtonGroup {...thisProps} >
          //   {selections}
          // </RadioButtonGroup></div>

      case 'checkbox':
        thisProps.onCheck = (evt, val) => {
          // console.log('Checkbox', evt, val);
          return this.props.onChange(thisProps.name, val, validation);
        };
        // console.log(thisProps);
        return(
          <div {...topProps} ><Checkbox {...thisProps} /></div>
        );

      case 'imagePicker':

        const LoadedImage = (src) => {
          if (!src) {
            return(
              <div></div>
              );
          }
        }

        thisProps.onChange = (evt, val) => {
          return this.props.onChange(thisProps.name, val, validation);
        };

        var ImgValue = () => <p style={styleImageEmpty} >{thisProps.hintText}</p>;
        if (thisProps.value) {
          ImgValue = () => <img style={styleImagePicker} src={thisProps.value} />;
        }

        // thisProps.errorStyle = {styleImageErrorText};

        var openDialog = () => {
          if (thisProps.value)
            return this.handleOpenDialog(thisProps.name);
        }

        return(
          <div {...topProps} >
            <ImagePicker {...thisProps} >
            {
            thisProps.value && 
            <Paper style={stylePaper} onTouchTap={openDialog}>
              <ImgValue />
            </Paper>
            }
            </ImagePicker>
            {
            thisProps.value && 
            <Dialog
              modal={false}
              autoScrollBodyContent={true}
              open={this.state.dialogOpen == thisProps.name}
              onRequestClose={this.handleCloseDialog}
              >
              <ImgValue />
            </Dialog>
            } 
          </div>
        );
              // <img style={styleImagePicker} src={thisProps.value} />

      default:
        return;
    }
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
      if (thisSchema.validation) {
        // console.log('valid?', thisSchema.name, values.get(thisSchema.name), thisSchema.validation(values.get(thisSchema.name)));
        return thisSchema.validation(values.get(thisSchema.name));
      }
      else
        return '';
    });
    return FormElements.filter((e) => e != '');
  }

  render() {
    // console.log('filtered', FormBuilder.filterSchema(this.props.form.schema));

    const FormElements = FormBuilder.filterSchema(this.props.form.schema, this.props.values).map((thisSchema, idx) => {
      // console.log('thisSchema', thisSchema, this.props.val);
      // return this.renderElement(thisSchema, idx, this.props.values.get(thisSchema.name), this.props.errors.get(thisSchema.name));
      return this.getElementCache(thisSchema, idx, this.props.values.get(thisSchema.name), this.props.errors.get(thisSchema.name));
    });
    return (
      <div>
      {FormElements}
      </div>
    );
  }
}

FormBuilder.propTypes = {
  form: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default FormBuilder;
