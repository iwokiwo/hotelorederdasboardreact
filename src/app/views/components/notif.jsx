import { Snackbar, Alert } from '@mui/material';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import React from 'react'
import { openMessage, reload } from 'app/store/Controls';
import { useRecoilState } from 'recoil';

const useStyles = theme => ({
    root: {
       // top: theme.spacing(10)
       top: theme.spacing(10)
    }
  })

function Notification(props) {
    const [notif, setNotif] = useRecoilState(openMessage)
    // const {notif,setNotif} = props;
    const { classes } = props;
    const handleClose = (event,reason)=>{
        if(reason==='clickaway'){
            return;
        }
        setNotif({
            ...notif,
            isOpen:false
        })
    }
    return (
       <Snackbar
            className={classes.root}
           open={notif.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{vertical:'top',horizontal:'right'}}
            onClose={handleClose}
            >
           <Alert 
           variant="filled"
           severity={notif.type} 
            onClose={handleClose}>
                {notif.message}
           </Alert>

       </Snackbar>
    )
}
Notification.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(useStyles)(Notification);