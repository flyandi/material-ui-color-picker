import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import TextField from '@material-ui/core/TextField'
import { DEFAULT_CONVERTER, converters } from '../transformers'
import PickerDialog from './PickerDialog'

const ColorPicker = ({
  // ColorPicker
  defaultValue,
  onChange,
  convert,
  disableAlpha,
  disableColorLabel,

  // Text field
  name,
  id,
  hintText,
  placeholder,
  floatingLabelText,
  label,
  TextFieldProps,
  variant,
  value,

  // Picker
  PickerProps,
  variantPicker,

  // State
  showPicker,
  setShowPicker,
  internalValue,
  setValue,



}) => (
  <Fragment>
    <TextField
      name={name}
      id={id}
      value={value === undefined ? internalValue : value}
      label={floatingLabelText || label}
      placeholder={hintText || placeholder}
      onClick={() => setShowPicker(true)}
      variant={variant || 'standard'}
      onChange={e => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
      InputProps={{ style: disableColorLabel ? {} : { color: value === undefined ? internalValue : value } }}
      {...TextFieldProps}
    />
    {showPicker && (
      <PickerDialog
        value={value === undefined ? internalValue : value}
        onClick={() => {
          setShowPicker(false)
          onChange(value)
        }}
        onChange={c => {
          const newValue = converters[convert](c)
          setValue(newValue)
          onChange(newValue)
        }}
        disableAlpha={disableAlpha}
        variant={variantPicker}
        PickerProps={PickerProps}
      />
    )}
  </Fragment>
)

ColorPicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  convert: PropTypes.oneOf(Object.keys(converters)),
  variant: PropTypes.string,
  variantPicker: PropTypes.string,
  disableAlpha: PropTypes.bool,
  disableColorLabel: PropTypes.bool,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  hintText: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  floatingLabelText: PropTypes.string,
  TextFieldProps: PropTypes.shape(TextField.propTypes),
  showPicker: PropTypes.bool,
  setShowPicker: PropTypes.func,
  internalValue: PropTypes.string,
  setValue: PropTypes.func,
  propsTextField: PropTypes.object,
  propsPicker: PropTypes.object,
}

ColorPicker.defaultProps = {
  convert: DEFAULT_CONVERTER
}

const makeColorPicker = compose(
  withState('showPicker', 'setShowPicker', false),
  withState('internalValue', 'setValue', ({ defaultValue }) => defaultValue)
)

const MakedColorPicker = makeColorPicker(ColorPicker)

const ColorPickerField = ({ input: { value, onChange, ...restInput }, meta: { touched, error }, ...restProps }) => (
  <MakedColorPicker
    value={value}
    onChange={onChange}
    errorText={touched && error}
    {...restInput}
    {...restProps}
  />
)

ColorPickerField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

export default MakedColorPicker

export {
  ColorPickerField
}
