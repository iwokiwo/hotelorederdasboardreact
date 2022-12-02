import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, Button } from '@mui/material'
import React from 'react'
import controls from "../components"
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import NotListedLocationIcon from '@mui/icons-material/QuestionMarkOutlined';
import { confirmDialogState } from 'app/store/Controls';
import { useRecoilState } from 'recoil';

const useStyles = theme => ({
    dialog: {
      padding:theme.spacing(2),
      position:'absolute',
      top: theme.spacing(5),
      textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent:'center'
    },
    titleIcon: {
       // backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    }

  })

function ConfirmDialog(props) {
  //  console.log(props)
    const [popupData, setPopupData] = useRecoilState(confirmDialogState)
    const { classes } = props;
    const {confirmDialog,setConfirmDialog} = props
    return (
        <Dialog open={popupData.isOpen} classes={{paper:classes.dialog}}>
            <DialogTitle>
                {/* <IconButton disableRipple>
                    <NotListedLocationIcon />
                </IconButton> */}
                 <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocationIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {popupData.title}
                </Typography>
                <Typography variant="subtitle2">
                    {popupData.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                    <controls.Button
                        text="No"
                        // color="default"
                        onClick={()=>setPopupData({ ...popupData, isOpen:false})}/>
                <controls.Button
                text="Yes"
                color="secondary"
                onClick={popupData.onConfirm}/>
            </DialogActions>
        </Dialog>
    )
}
ConfirmDialog.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(useStyles)(ConfirmDialog);
