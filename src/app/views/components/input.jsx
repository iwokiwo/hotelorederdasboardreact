import {TextField} from '@mui/material';
import React from 'react'

export default function input(props) {
    const{name,label,value,error=null,onChange,...other} = props;
    return (
        <div>
              <TextField
                    variant = "outlined"
                    autoComplete="false"
                    label={label}
                    name = {name}
                    value={value}
                    onChange={onChange}
                    {...other}
                    {...(error && {error:true,helperText:error})}
                   />        
        </div>
    )
}
