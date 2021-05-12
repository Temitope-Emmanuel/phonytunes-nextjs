import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete,{AutocompleteProps} from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {FieldProps,Field} from "formik"


interface IProps extends Partial<AutocompleteProps<any,any,any,any>> {
  style?:object;
  options:any[];
  getLabel?:(arg:any) => string;
  getSelected:(arg1:any,arg2:any) => any;
  className?:any;
  name:string;
  label?:string;
}

const MaterialSelect:React.FC<IProps> = ({
  name,className,label,children,options,getLabel,getSelected,defaultValue,style
  ,...props
}) => {
  const [open, setOpen] = React.useState(false);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    return () => {
      active = false;
    };
  }, [loading]);
  


  return (
    <Field name={name} >
      {({field,form}:FieldProps) => (
      <Autocomplete
        id={`${label}-${name}`}
        open={open} 
        filterSelectedOptions
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        style={style || undefined}
        onChange={(evt:any,newValue:any | null) => {
          form.setFieldValue(name,newValue,true)
        }} 
        value={field.value}
        getOptionSelected={getSelected}
        getOptionLabel={getLabel} 
        options={options} loading={loading} autoHighlight
        {...props}
        renderInput={(params:any) => (
          <TextField
            {...params} 
            label={label}
            error={Boolean(form.touched[name] && form.errors[name])}
            helperText={form.touched[name]  && form.errors[name]} 
            variant="outlined" fullWidth defaultValue={defaultValue}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      )}
    </Field>
  );
}

export default MaterialSelect