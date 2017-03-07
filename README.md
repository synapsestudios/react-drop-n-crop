# React Drop-n-Crop

A combined implementation of [React-Dropzone](https://github.com/okonet/react-dropzone) and [React-Cropper](https://github.com/roadmanfong/react-cropper) ([Cropper.js](https://github.com/fengyuanchen/cropperjs)) for front-end image upload/validation/cropping.

## Demo

A demo is available at *TODO*

OR

To run a demo on your own computer:
* Clone this repository
* `npm install`
* `npm run storybook`
* Visit http://localhost:9009/

## Usage

#### Installing via `npm`
```js
npm install --save @synapsestudios/react-crop-n-drop
```

#### Importing JS
```js
import DropNCrop from '@synapsestudios/react-crop-n-drop';
```

#### Using JSX
```jsx
<DropNCrop
  onSave={(file) => {
    console.log(file);
  }}
/>
```

#### Importing CSS
Import the default styles (from the demo)
```js
import '@synapsestudios/react-crop-n-drop/lib/react-drop-n-crop.css';
```

OR

If you are using Stylus you can import the .styl file into your build:
```styl
@import '@synapsestudios/react-crop-n-drop/lib/react-drop-n-crop.styl';
```

## API

### `Props`

#### onSave: (required)

`onSave` is the callback function necessary to update the parent component with the final cropped image file. `onSave` receives a `File` object as an argument.
```js
onSave: PropTypes.func.isRequired,
```

#### canvasHeight:

`canvasHeight` is a `string` for the container inline style `height` property.
```js
canvasHeight: PropTypes.string, // default: '360px'
```

#### canvasWidth:

`canvasWidth` is a `string` for the container inline style `width` property.

```js
canvasWidth: PropTypes.string, // default: '100%'
```

#### className:

`className` is a `string` for the outermost container class name.

```js
className: PropTypes.string, // default: '100%'
```

#### cropperOptions:

`cropperOptions` is an `object` for customizing the cropper component.
```js
cropperOptions: PropTypes.object, // default: {}
```

#### fileSize:

`fileSize` is a maximum `number` (in bytes) for file upload validation.
```js
fileSize: PropTypes.object, // default: 3145728
```

#### fileTypes:

`fileTypes` is an `array` (of strings) for file upload validation.
```js
fileTypes: PropTypes.array, // default: ['image/jpeg', 'image/jpg', 'image/png']
```
