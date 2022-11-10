import { Button } from '@mui/material';
import React from 'react'
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';

const useStyles = theme =>({
    root:{
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiButton-label': {
            color: theme.palette.secondary.main,
        }
    },
    primary: {
        backgroundColor: theme.palette.primary.light,
        '& .MuiButton-label': {
            color: theme.palette.primary.main,
        }
    },
})

function actionButton(props) {
    const {color,children,onClick} =props;
    const classes = props
    return (
        <Button
        className={`${classes.root} ${classes[color]}`}
        onClick={onClick}>
            {children}
        </Button>
    )
}
actionButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(useStyles)(actionButton);