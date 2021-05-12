/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  FormControl,FormHelperText
} from "@material-ui/core"
import { FieldProps,Field } from 'formik';


interface IProps {
  name:string;
  label:string;
  disabled?:boolean;
  showErrors?:boolean;
  className?:string;
  options:any[]
  getLabel?:(arg:any) => string;
}


const Select:React.FC<IProps> = ({
  className,label,disabled,
  name,options,getLabel
}) => {

  return (
    <Field name={name}>
        {({ field, form }:FieldProps) => {
          return(
            <FormControl disabled={disabled} className={className} variant="outlined">
              <Autocomplete value={field.value} onChange={(evt:any,newValue:string | null) => {
                form.setFieldValue(name,newValue,true)
              }}
                id={`${label}-${name}`} 
                options={options}
                getOptionSelected={(option:any,value) => {
                  console.log({
                    option,
                    value
                  })
                  return getLabel ? getLabel(option) === getLabel(value) : option.includes(value)
                }}

                getOptionLabel={getLabel ? getLabel : (option) => option}
                renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
              />
              { form.touched[name]  && 
                  form.errors[name] &&
                  <FormHelperText>{form.errors[name]}</FormHelperText>
                }
            </FormControl>
          )
        }}
      </Field>
  );
}

export default Select