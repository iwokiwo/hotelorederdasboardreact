import React from 'react'
import { Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import controls from './index'; 
import CloseIcon from '@mui/icons-material/Close'
import { popupState } from 'app/store/Controls';
import { useRecoilState } from 'recoil';

const useStyles = theme => ({
    dialogWrapper: {
      padding: theme.spacing(2),
      position: 'absolute',
      top: theme.spacing(0)
    },
    dialogTitle:{
        paddingRight:'0px',
      
    }
  })

function Popup(props) {
    const [popupData, setPopupData] = useRecoilState(popupState)
    const { classes } = props;
    const {children} = props;
    return (
      <div>
       <Dialog open={popupData.openPopup} maxWidth={popupData.size} fullWidth classes={{paper:classes.dialogWrapper}}>
          <DialogTitle className={classes.dialogTitle} >
              <div style={{display:'flex'}}>
                  <Typography variant="h5" component="div" style={{flexGrow:1, paddingTop:12}}
                  >{popupData.title}</Typography>
                    <controls.ActionButton
                    color="secondary"
                    onClick={()=>{setPopupData({
                        ...popupData,
                        openPopup:false
                    })}}
                    >
                    <CloseIcon />
                    </controls.ActionButton>
              </div>
          </DialogTitle> 
          <Divider></Divider>
          <DialogContent style={{flexGrow:1, paddingTop:1}}>
               {children}
          </DialogContent>
       </Dialog>
       </div>
    )
}
Popup.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(useStyles)(Popup);