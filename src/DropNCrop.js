/* global FileReader */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Cropper from 'react-cropper';
import Dropzone from 'react-dropzone';

import bytesToSize from './util/bytesToSize';
import fileSizeLessThan from './util/fileSizeLessThan';
import fileType from './util/fileType';

class DropNCrop extends Component {
  static propTypes = {
    allowedFileTypes: PropTypes.array,
    canvasHeight: PropTypes.string,
    canvasWidth: PropTypes.string,
    className: PropTypes.string,
    cropperOptions: PropTypes.object,
    customMessage: PropTypes.shape({
      instructions: PropTypes.string,
      acceptedFileTypes: PropTypes.string,
      maxFileSize: PropTypes.string,
      fileTypeErrorMessage: PropTypes.string,
      fileSizeErrorMessage: PropTypes.string,
    }),
    instructions: PropTypes.node,
    maxFileSize: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.shape({
      result: PropTypes.string,
      filename: PropTypes.string,
      filetype: PropTypes.string,
      src: PropTypes.string,
      error: PropTypes.array,
    }),
  };

  static defaultProps = {
    allowedFileTypes: ['image/jpeg', 'image/jpg', 'image/png'],
    canvasHeight: '360px',
    canvasWidth: '100%',
    cropperOptions: {
      guides: true,
      viewMode: 0,
      autoCropArea: 1,
    },
    customMessage: {
      instructions: 'Drag-n-drop a file or click to add an image',
      acceptedFileTypes: 'Accepted file types: ',
      maxFileSize: 'Max file size: ',
    },
    maxFileSize: 3145728,
  };

  onCrop = () => {
    const {
      value,
      onChange,
    } = this.props;

    if (typeof this.cropperRef.getCroppedCanvas() !== 'undefined') {
      onChange({
        ...value,
        result: this.cropperRef.getCroppedCanvas().toDataURL(value.filetype),
      });
    }
  };

  onDrop = files => {
    const {
      onChange,
      maxFileSize,
      allowedFileTypes,
      customMessage,
    } = this.props;
    const fileSizeErrorMessage = customMessage.fileSizeErrorMessage 
      ? customMessage.fileSizeErrorMessage.replace('$BYTES',bytesToSize(maxFileSize))
      : null;
    const fileSizeValidation = fileSizeLessThan(maxFileSize, fileSizeErrorMessage)(files);
    const fileTypeValidation = fileType(allowedFileTypes, customMessage.fileTypeErrorMessage)(files);

    if (fileSizeValidation.isValid && fileTypeValidation.isValid) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({
          src: reader.result,
          filename: files[0].name,
          filetype: files[0].type,
          result: reader.result,
          error: null,
        });
      };
      reader.readAsDataURL(files[0]);
    } else {
      const errors = [];
      if(!fileTypeValidation.isValid) errors.push(fileTypeValidation.message);
      if(!fileSizeValidation.isValid) errors.push(fileSizeValidation.message);
      onChange({
        error: errors
      });
    }
  };

  render() {
    const {
      canvasHeight,
      canvasWidth,
      className,
      cropperOptions,
      customMessage,
      instructions,
      allowedFileTypes,
      maxFileSize,
      value,
    } = this.props;

    const dropNCropClasses = {
      'drop-n-crop': true,
      [`${className}`]: className,
    };

    return (
      <div className={classNames(dropNCropClasses)}>
        {value && value.src
          ? <Cropper
              ref={input => {
                this.cropperRef = input;
              }}
              src={value && value.src}
              style={{
                height: canvasHeight,
                width: canvasWidth,
              }}
              cropend={this.onCrop} // Only use the cropend method- it will reduce the callback/setState lag while cropping
              {...cropperOptions}
            />
          : <Dropzone
              className="dropzone"
              activeClassName="dropzone--active"
              onDrop={this.onDrop}
              style={{
                height: canvasHeight,
                width: canvasWidth,
              }}
            >
              <div key="dropzone-instructions">
                {!instructions
                  ? <div className="dropzone-instructions">
                      <div className="dropzone-instructions--main">
                        {customMessage.instructions}
                      </div>
                      <div className="dropzone-instructions--sub">
                        {customMessage.acceptedFileTypes}
                        {' '}
                        {allowedFileTypes
                          .map(mimeType => `.${mimeType.split('/')[1]}`)
                          .join(', ')}
                      </div>
                      <div className="dropzone-instructions--sub">
                        {customMessage.maxFileSize} {bytesToSize(maxFileSize)}
                      </div>
                    </div>
                  : instructions}
              </div>
              {value && value.error
                ? <div
                    key="dropzone-validation"
                    className="dropzone-validation"
                  >
                    <p>{value && value.error[0]}</p>
                    {value.error[1]
                      ? <p>{value && value.error[1]}</p>
                      :null}
                  </div>
                : null}
            </Dropzone>}
      </div>
    );
  }
}

export default DropNCrop;
