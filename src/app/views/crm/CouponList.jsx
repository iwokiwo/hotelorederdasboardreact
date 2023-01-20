import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Paper, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/system'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Breadcrumb } from 'app/components'
import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'

import { isEmpty, isNil } from 'lodash'

import { Container, CardHeader, Small } from '../components/styleGlobal'
import controls from '../components'
import {  Span } from 'app/components/Typography'
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from 'recoil'
import { dataHeadCallCoupons, getDataCoupon } from 'app/store/Coupon'
import { confirmDialogState, openMessage, popupState, reload } from 'app/store/Controls'
import useTable from '../components/useTable'
import Moment from 'react-moment';
import CouponForm from './CouponForm';
import notif from '../components/notif';
import { now } from 'moment';

const CouponList = () =>  {
    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main

    const [valuesSearch, setValuesSearch] = React.useState('');
    const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } });
    const [title, setTitle] = React.useState("")
    
    const [open, setOpen] = React.useState(false);
    const [afterSave, setAfterSave] = React.useState(false)

    const headCall = useRecoilValue(dataHeadCallCoupons)
    const {coupon} = useRecoilValue(getDataCoupon)
    const [confirmDialog, setConfirmDialog] = useRecoilState(confirmDialogState)
    const [popupStates, setPopupStates] = useRecoilState(popupState)
    const [reloadState, setReloadState] = useRecoilState(reload)

    

    console.log("coupon",coupon)
    const handleClickOpens = () => {
      setOpen(true);
    };

    const handleClickOpen = () => {
        setPopupStates({
            title: "Add Coupon",
            openPopup: true,
            size: "md"
        })
        // setDataItemState({
        //     id: 0,
        //     name: "",
        //     thumbnail: "",
        //     thumbnailOld: "",
        //     url:"",
        //     path:"",
        //     price: 0,
        //     quantity: 0,
        //     active: 1,
        //     description: "",
        //     sale_price: 0,
        //     category_id: 0,
        //     unit_id: 0,
        //     branch_id:0,
        //     category: {ID: 0, Name:''},
        //     unit: {ID: 0, Name:''},
        //     branch: {id: 0, name:''},
        //     gallery:[],
        //     multiFileDelete:[],
        //     multiFile:[],
        // })
    }
  
    const handleClose = () => {
      setOpen(false);
    };

   
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSort
    } = useTable(isNil(coupon) ? []: coupon.data, headCall, filterFn);

    const handleChange = (e) => {
        let target = e.target;
        setValuesSearch({ valuesSearch: target.value });

    }

    const renderTable = () => {

        return(
            <Box component="div" overflow="auto">
                <TblContainer component={Paper}>
                    <Table aria-label="a dense table" size="small" >
                        <TblHead />
                        <TableBody>
                            {recordsAfterPagingAndSort().map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.discount_type}</TableCell>
                                    <TableCell align="left">{row.discount}</TableCell>
                                 
                                    <TableCell align="left"><Moment format="YYYY/MM/DD">{row.valid_from}</Moment></TableCell>
                                    <TableCell align="left"><Moment format="YYYY/MM/DD">{row.valid_to}</Moment></TableCell>
                                    <TableCell align="left">{row.limit}</TableCell>
                                    <TableCell align="left">{row.use}</TableCell>
                                    <TableCell align="left">{row.description}</TableCell>
                                    <TableCell
                                        sx={{ px: 0 }}
                                        align="left"
                                    >
                                        {row.active === 0 ?
                                            <Small bgcolor={bgSecondary}>
                                                Inactive
                                            </Small>
                                            :
                                            <Small bgcolor={bgPrimary}>
                                                Active
                                            </Small>
                                        }
                                    </TableCell>
                                    <TableCell align='center'>

                                        <controls.ActionButton
                                            color="primary"
                                            onClick={() => {
                                                setTitle("Edit Coupon")
                                                handleClickOpens()
                                            }}
                                        >
                                            <EditOutlinedIcon fontSize="small" />
                                        </controls.ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TblContainer>
                <TblPagination />
            </Box>
        )
    }

    // const renderForm = () => {
    //     return (
    //         <Dialog
    //             open={open}
    //             onClose={handleClose}
    //             maxWidth="md"
    //             aria-labelledby="alert-dialog-title"
    //             aria-describedby="alert-dialog-description"
    //         >
    //             <DialogTitle id="alert-dialog-title">
    //                 <div style={{ display: 'flex' }}>
    //                     <Typography variant="h6" component="div" style={{ flexGrow: 1, mt: -1 }}
    //                     >   {title}</Typography>
    //                     <controls.ActionButton
    //                         color="secondary"
    //                         onClick={() => handleClose()}
    //                     >
    //                         <CloseIcon fontSize={"small"} sx={{ mt: 0 }} />
    //                     </controls.ActionButton>
    //                 </div>

    //             </DialogTitle>
    //             <DialogContent>
    //                 <DialogContentText id="alert-dialog-description">
    //                     <Box sx={{p: 3}}>
    //                     <CouponForm setAfterSave={setAfterSave} />
    //                     </Box>
                        
    //                 </DialogContentText>
    //             </DialogContent>
    //             {/* <DialogActions>
    //           <Button onClick={handleClose}>Disagree</Button>
    //           <Button onClick={handleClose} autoFocus>
    //             Agree
    //           </Button>
    //         </DialogActions> */}
    //         </Dialog>
    //     )
    // }

    useEffect(() => {
        setFilterFn({
            fn: items => {
                if (isEmpty(valuesSearch.valuesSearch)) {
                    return items = coupon.data
                }
                else {
                    return items = coupon.data.filter(x => x.name.toUpperCase().includes(valuesSearch.valuesSearch.toUpperCase()));
                }
            }
        })
    }, [valuesSearch, notif])

    useEffect(() => {
        console.log("afterSave", afterSave)
        if (afterSave == true) {
            // setReloadState(now())
            setAfterSave(false)
            setFilterFn({
                fn: items => { return items = coupon.data }
            })
        }
    }, [afterSave]);

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Coupon List', path: '/crm/coupon-list' },
                    ]}
                />
            </div>
            <Card elevation={3} sx={{ pt: '20px', mb: 2 }}>
                <CardHeader>
                    {/* <Title>Unit</Title> */}
                    <controls.Input
                        name="cariProduk"
                        label="Search"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                            </InputAdornment>)
                        }}
                     onChange={handleChange}
                    />


                    <Button color="primary" variant="contained" onClick={() => {
                        setTitle("Add Coupon")
                        handleClickOpen()
                    }}>

                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add Coupon
                        </Span>
                    </Button>
                </CardHeader>
                <CardContent>
                    {renderTable()}
                </CardContent>
            </Card>
            <controls.Notification />
            <controls.ConfirmDialog />
            <controls.popup>
                <CouponForm setAfterSave={setAfterSave} />
            </controls.popup>

            {/* {renderForm()} */}
        </Container>
    )
}
export default CouponList