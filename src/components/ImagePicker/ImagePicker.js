import React from 'react'
import { IndexLink, Link } from 'react-router'

console.log('ImagePicker')
var thisUpCanvas = document.createElement('canvas')
var thisUpImage = new Image()

class ImagePicker extends React.Component {

  constructor(props) {
    super(props);
    console.log('ImagePicker:constructor');

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
    console.log('ImagePicker:componentDidMount');
  }

  componentDidUpdate() {
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

  handleFiles = (e) => {
    // console.log('handleFiles', e.target.files);
    const files = [];
    for (let i = 0; i < e.target.files.length; i++) {
      // Convert to Array.
      files.push(e.target.files[i]);
    }

    // Build Promise List, each promise resolved by FileReader.onload.
    Promise.all(files.map(file => new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = (ref) => {
        // Resolve both the FileReader result and its original file.
        resolve(ref.target.result);
      };

      // Read the file with format based on this.props.as.
      switch ((this.props.as || 'url').toLowerCase()) {
        case 'binary': {
          reader.readAsBinaryString(file);
          break;
        }
        case 'buffer': {
          reader.readAsArrayBuffer(file);
          break;
        }
        case 'text': {
          reader.readAsText(file);
          break;
        }
        case 'url': {
          reader.readAsDataURL(file);
          break;
        }
      }
    })))
    .then(zippedResults => {
      // Run the callback after all files have been read.
      console.log('res', zippedResults);

      const MAX_SIZE = 800;
      var upImage = thisUpImage //new Image();
      var upCanvas = thisUpCanvas // document.createElement('canvas');

      var ctx = upCanvas.getContext('2d');

      upImage.onload = () => {
        // Make a smaller image from input


        // console.log('drawImage', upImage.width, upImage.height, zippedResults[0].length);
        const hwRatio = upImage.height/upImage.width;
        const maxDimRatio = MAX_SIZE/Math.max(upImage.height, upImage.width);

        upCanvas.height = upImage.height;
        upCanvas.width = upImage.width;
        if (maxDimRatio < 1) {
          upCanvas.height = maxDimRatio*upImage.height;
          upCanvas.width = maxDimRatio*upImage.width;
        }
        // console.log('drawImage', upImage.width, upImage.height, zippedResults[0].length);

        ctx.drawImage(upImage, 0, 0, upCanvas.width, upCanvas.height);

        var dataUrl = upCanvas.toDataURL('image/jpeg', 0.9)
        
        ctx.clearRect(0, 0, upCanvas.width, upCanvas.height)
        upCanvas.height = 1
        upCanvas.width = 1

        upImage.src = null;
        zippedResults[0] = ''
        zippedResults = null

        // this.props.onChange(null, dataUrl);
        this.props.onChange({target:{value:dataUrl}});
      }

      upImage.src = zippedResults[0];
    });
  }


  render() {
    return (
    <div style={{display:'inline-block'}}>
      <label className='active'>{this.props.label}</label>
      <div className='btn' style={{overflow:'hidden',position:'relative'}}>
        <span><i className='material-icons'>add_a_photo</i></span>
        <input name={'fileinput-'+this.props.name} type='file' accept='image/*;capture=camera' onChange={this.handleFiles} 
          style={{display:'block', cursor: 'inherit', position: 'absolute', opacity: 0, top:0, bottom:0, left:0, right:0}}/>
      </div>

    </div>
    )
  }

}
      // <label className='active'>{this.props.label}</label>
      // <div className='btn' >
      //   <span>Unggah<i className='material-icons'>add_a_photo</i></span>
      //   <input type='file' accept='image/*;capture=camera' onChange={this.handleFiles} style={{position: 'absolute', opacity:1, top:0, bottom:0, left:0, right:0}}/>
      // </div>

export default ImagePicker
