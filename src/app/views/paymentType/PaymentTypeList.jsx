import React, { useEffect, useReducer } from 'react'
import { Autocomplete, Box, Button, Card, CardContent, Grid, InputAdornment, Paper, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutline';

import * as yup from 'yup';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { isEmpty, isNil } from "lodash"

import { dataHeadCallPaymentType, getDataPaymentType , dataPaymentType} from "app/store/PaymentType"
import { Container, CardHeader, Small } from '../components/styleGlobal'
import useTable from "../components/useTable"
import controls from '../components'
import { Breadcrumb } from 'app/components'
import { confirmDialogState, openMessage, popupState, reload } from "app/store/Controls";
import { Span } from 'app/components/Typography'
import { useFormik } from 'formik'
import { urlCreatePaymentType, urlDeleteCategory, urlDeletePaymentType, urlUpdatePaymentType } from 'app/utils/constant'
import { PostData } from 'app/services/postData'
import { PutData } from 'app/services/putData'
import { getDataBranch } from 'app/store/Branchs';
import { DeleteData } from 'app/services/deteleData';

const validationSchema = yup.object({
    name: yup
        .string('Enter Name ')
        .required('Name is required'),

});


const PaymentTypeList = () =>{
    const [valuesSearch, setValuesSearch] = React.useState('');
    const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } });
    const [title, setTitle] = React.useState("")
    
    const [open, setOpen] = React.useState(false);
    const [afterSave, setAfterSave] = React.useState(false)

    const headCall = useRecoilValue(dataHeadCallPaymentType)
    const {PaymentType} = useRecoilValue(getDataPaymentType)
    const {branch} = useRecoilValue(getDataBranch)
    const [notif, setNotif] = useRecoilState(openMessage)
    const [confirmDialog, setConfirmDialog] = useRecoilState(confirmDialogState)
    const [popupStates, setPopupStates] = useRecoilState(popupState)
    const setDataItemState = useSetRecoilState(dataPaymentType)
    const setReloadState = useSetRecoilState(reload)

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSort
    } = useTable(isNil(PaymentType) ? []: PaymentType.data, headCall, filterFn);

    const formik = useFormik({
        initialValues: {
            name: "",
            id: " ",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            
            if (Number(values.id) === 0) {
               
                PostData(urlCreatePaymentType, {
                    ...values,
                    branch_id : values.branch.id
                }).then((value) =>{
                    
                    setNotif({
                        isOpen: true,
                        message: value.message,
                        type: value.status
                    })

                    if(value.code === 200){
                        setReloadState(Math.random())
                        setAfterSave(true)
                        setFilterFn({
                            fn: items => { return items = PaymentType.data }
                        })
                    }
                 
                })

            } else {
                const data = PutData(urlUpdatePaymentType, {
                    ...values,
                    branch_id : values.branch.id
                })
                data.then((value) =>{
                    
                    setNotif({
                        isOpen: true,
                        message: value.message,
                        type: value.status
                    })

                    if(value.code === 200){
                        setReloadState(Math.random())
                        setAfterSave(true)
                        setFilterFn({
                            fn: items => { return items = PaymentType.data }
                        })
                    }
                    
                })

            }

          

           
        

        },
    });

    const handleChange = (e) => {
        let target = e.target;
        setValuesSearch({ valuesSearch: target.value });

    }
    const handleClickOpen = () => {
        setPopupStates({
            title: "Add Payment Type",
            openPopup: true,
            size: "sm"
        })
        formik.values.id = 0
        formik.values.name = ""
    }

    const onDelete = (values) => {
              setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                })
        DeleteData(urlDeletePaymentType, values).then((value) =>{
           
     
            if( value.code === 200){
                setReloadState(Math.random())

              
               
                setFilterFn({
                    fn: items => { return items = PaymentType.data }
                })
            }

            setNotif({
                isOpen: true,
                message: value.message,
                type: value.status
            })
            
        })

     
    }

    useEffect(() => {
        setFilterFn({
            fn: items => {
                if (isEmpty(valuesSearch.valuesSearch)) {
                    return items = PaymentType.data
                }
                else {
                    return items = PaymentType.data.filter(x => x.name.toUpperCase().includes(valuesSearch.valuesSearch.toUpperCase()));
                }
            }
        })
    }, [valuesSearch, notif])

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
                                    <TableCell align="left">{row.branch.name}</TableCell>
                                    <TableCell align="left">{row.description}</TableCell>
                                    <TableCell align='center'>

                                    <controls.ActionButton
                                            color="primary"
                                            onClick={(e, value) => {
                                                formik.values.id = row.id
                                                formik.values.name = row.name
                                                formik.handleChange({ ...e, target: { name: 'branch', value: row.branch } })
                                                setPopupStates({
                                                    title: "Edit Payment Type",
                                                    openPopup: true,
                                                    size: "sm"
                                                })
                                            }}
                                        >
                                            <EditOutlinedIcon fontSize="small" />
                                        </controls.ActionButton>

                                        <controls.ActionButton
                                            color="primary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: `Are you sure to delete ${row.name} ?`,
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(row) }
                                                })
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
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

    const renderForm = () => {
        return (
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={12}>
                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>

                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Payment Type"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />

                        <Autocomplete
                            id="branch"
                            name="branch"
                            value={formik.values.branch}
                            onChange={(e, value) => {
                                if (value != null) {

                                    formik.handleChange({ ...e, target: { name: 'branch', value: value } })

                                }
                            }}
                            options={branch.data}
                            getOptionLabel={(option) => option ? option.name : []}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    margin="normal"
                                    label="Branch"

                                    fullWidth
                                    name="branch"

                                />
                            )}

                        />

                        <Box textAlign={"right"}>
                            {afterSave === true &&
                                <Button color="primary" variant="text" sx={{ mt: 5 }} onClick={() =>
                                    setPopupStates({
                                        ...popupStates,
                                        openPopup: false
                                    })
                                }>
                                    {/* <Icon>send</Icon> */}
                                    <Span sx={{ textTransform: 'capitalize' }}>
                                        <Typography variant="button" display="block"> Close</Typography>
                                    </Span>
                                </Button>
                            }
                            <Button color="primary" variant="text" type="submit" sx={{ mt: 5 }}>
                                {/* <Icon>send</Icon> */}
                                <Span sx={{ textTransform: 'capitalize' }}>
                                    <Typography variant="button" display="block">Submit</Typography>
                                </Span>
                            </Button>
                        </Box>


                    </Grid>
                </Grid>
            </form>
        )
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Payment Type List', path: '/crm/coupon-list' },
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
                        handleClickOpen()
                    }}>

                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add Payment Type
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
                {/* <CouponForm setAfterSave={setAfterSave} /> */}
                {renderForm()}
            </controls.popup>
        </Container>
    )
}
export default PaymentTypeList