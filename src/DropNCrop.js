/* global FileReader */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Cropper from 'react-cropper';
import Dropzone from 'react-dropzone';

import bytesToSize from './util/bytesToSize';
import dataUrlToFile from './util/dataUrlToFile';
import fileSizeLessThan from './util/fileSizeLessThan';
import fileType from './util/fileType';

class DropNCrop extends Component {
  static propTypes = {
    allowedFileTypes: PropTypes.array, // eslint-disable-line
    canvasHeight: PropTypes.string,
    canvasWidth: PropTypes.string,
    className: PropTypes.string,
    cropperOptions: PropTypes.object, // eslint-disable-line
    instructions: PropTypes.node,
    maxFileSize: PropTypes.number,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    allowedFileTypes: ['image/jpeg', 'image/jpg', 'image/png'],
    canvasHeight: '360px',
    canvasWidth: '100%',
    cropperOptions: {
      guides: true,
      viewMode: 0,
      autoCropArea: 1,
    },
    maxFileSize: 3145728,
  }

  constructor(props) {
    super(props);

    this.state = {
      result: null,
      filename: null,
      filetype: null,
      src: null,
      error: null,
    };
  }

  onCancel = (e) => {
    e.preventDefault();

    this.setState({
      result: null,
      filename: null,
      filetype: null,
      src: null,
      error: null,
    });

    if (this.props.onCancel) {
      return this.props.onCancel();
    }

    return null;
  }

  onSave = (e) => {
    e.preventDefault();

    const { result, filename } = this.state;
    let file = null;

    if (result && filename) {
      file = dataUrlToFile(result, filename);
    }

    if (this.props.onSave) {
      return this.props.onSave(file);
    }

    return null;
  }

  onCrop = () => {
    if (typeof this.cropperRef.getCroppedCanvas() !== 'undefined') {
      this.setState({
        result: this.cropperRef.getCroppedCanvas().toDataURL(this.state.filetype),
      });
    }
  }

  onDrop = (files) => {
    const fileSizeValidation = fileSizeLessThan(this.props.maxFileSize)(files);
    const fileTypeValidation = fileType(this.props.allowedFileTypes)(files);

    if (fileSizeValidation.isValid && fileTypeValidation.isValid) {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({
          src: reader.result,
          filename: files[0].name,
          filetype: files[0].type,
          result: reader.result,
          error: null,
        });
      };
      reader.readAsDataURL(files[0]);
    } else {
      // TODO: Update error state to be an array to handle both messages if necessary
      if (!fileTypeValidation.isValid) { // eslint-disable-line
        this.setState({
          error: fileTypeValidation.message,
        });
      } else if (!fileSizeValidation.isValid) {
        this.setState({
          error: fileSizeValidation.message,
        });
      }
    }
  }

  render() {
    const imageCropper = {
      'drop-n-crop': true,
      [`${this.props.className}`]: this.props.className,
    };

    return (
      <div className={classNames(imageCropper)}>
        {this.state.src ? (
          <Cropper
            ref={(input) => { this.cropperRef = input; }}
            src={this.state.src}
            style={{
              height: this.props.canvasHeight,
              width: this.props.canvasWidth,
            }}
            cropend={this.onCrop} // Use cropend to reduce setState lag while cropping
            {...this.props.cropperOptions}
          />
        ) : (
          <Dropzone
            className="dropzone"
            activeClassName="dropzone--active"
            onDrop={this.onDrop}
            style={{
              height: this.props.canvasHeight,
              width: this.props.canvasWidth,
            }}
          >
            <div key="dropzone-instructions">
              {!this.props.instructions ? (
                <div className="dropzone-instructions">
                  <div className="dropzone-instructions--main">Drag-n-drop a file or click to add an image</div>
                  <div className="dropzone-instructions--sub">Accepted file types: .jpg, .jpeg, .png</div>
                  <div className="dropzone-instructions--sub">Max file size: {bytesToSize(this.props.maxFileSize)}</div>
                </div>
              ) : this.props.instructions}
            </div>
            {this.state.error ? (
              <div
                key="dropzone-validation"
                className="dropzone-validation"
              >
                {this.state.error}
              </div>
            ) : null}
          </Dropzone>
        )}
        <div className="drop-n-crop__controls">
          {this.state.src ? (
            <button
              type="button"
              className="button button--save"
              onClick={this.onSave}
            >
              Save & Upload
            </button>
          ) : null}
          {this.state.src ? (
            <button
              type="button"
              className="button button--cancel"
              onClick={this.onCancel}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default DropNCrop;
