import React from 'react';
import Image from 'next/image';
import { FormControl, FormHelperText, InputLabel, OutlinedInput, OutlinedInputProps } from '@mui/material';
import { FieldRenderProps } from 'react-final-form';

interface ITextFieldProps extends FieldRenderProps<any>, OutlinedInputProps {
  label: string;
  imageUrl?: string;
  customHelper: React.ComponentClass;
}

export const FinalFormInput = (props: ITextFieldProps): JSX.Element => {
  const { style, ...materialInputProps } = props as OutlinedInputProps;

  return (
    <FormControl fullWidth style={style}>
      <InputLabel variant="outlined" htmlFor={props.id}>
        {props.label}
      </InputLabel>
      {props.imageUrl && <Image src={props.imageUrl} alt="textfield" style={{ marginBottom: '20px' }} />}
      <OutlinedInput
        id={props.id}
        autoFocus={props.autoFocus}
        fullWidth
        error={props.meta.touched && props.meta.error}
        {...props.input}
        {...materialInputProps}
        inputProps={{
          name: props.name,
          id: props.id,
        }}
      ></OutlinedInput>
      <FormHelperText variant="outlined">{props.meta.touched && props.meta.error}</FormHelperText>
    </FormControl>
  );
};
