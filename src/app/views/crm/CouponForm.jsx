import { Autocomplete, Box, Button, Grid, Switch, TextField, Typography } from '@mui/material';
import { getDataBranch } from 'app/store/Branchs';
import { openMessage, popupState, reload } from 'app/store/Controls';
import { dataDiscountType, getDataCoupon, setDataCouponFromik } from 'app/store/Coupon'
import { useFormik } from 'formik'
import React from 'react'
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from 'recoil';

import * as yup from "yup";

import { DatePicker, TimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import moment from 'moment/moment';
import { urlCreateCoupon, urlUpdateCoupon } from 'app/utils/constant';
import { PostData } from 'app/services/postData';
import { PutData } from 'app/services/putData';
import { now } from 'lodash';


const validationSchema = yup.object({
    name: yup
        .string('Enter Name ')
        .required('Name is required'),
 

});

const CouponForm = (props) => {
    
    const { afterSave, setAfterSave } = props;
    const [ afterSaveForm, setAfterSaveForm ] = React.useState(false);

    const setData = useRecoilValue(setDataCouponFromik)
    const { branch } = useRecoilValue(getDataBranch)
    const discountType = useRecoilValue(dataDiscountType)

    const [checked, setChecked] = React.useState(setData.active === 1 ? true:false);

    const [notif, setNotif] = useRecoilState(openMessage)
    const [popupStates, setPopupStates] = useRecoilState(popupState)
    const [reloadState, setReloadState] = useRecoilState(reload)
    

    const [selectedDateFrom, setSelectedDateFrom] = React.useState(
        moment(setData.valid_from)
    )
    const [selectedDateUnitl, setSelectedDateUntil] = React.useState(
        moment(setData.valid_until)
    )

    const  handleDateChangeFrom = (date) => {
        
        setSelectedDateFrom(date)
        formik.values.valid_from = date
    }

    const  handleDateChangeUntil = (date) => {
        setSelectedDateUntil(date)
        formik.values.valid_until = date
    }

    const handleChange = (event) => {
        setChecked(event.target.checked);
        formik.values.active = event.target.checked === true ? 1:0
      };

    const formik = useFormik({
        initialValues: {
            ...setData,
            active: setData.active === true ? 1: 0
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
            if (Number(values.id) === 0) {
              
                PostData(urlCreateCoupon, {
                    ...values,
                    branch_id : values.branch.id,
                    limit: Number(values.limit),
                    discount: Number(values.discount),
                    max_value: Number(values.max_value),
                    min_value: Number(values.min_value),
                    max_item: Number(values.max_item),
                    min_item: Number(values.min_item)
                }).then((value) => {
                   // refreshGetDataCoupon()

                    setNotif({
                        isOpen: true,
                        message: value.message,
                        type: value.status
                    })
                    setReloadState(Math.random())
                    setAfterSave(true)
                    setAfterSaveForm(true)
                }
                    )
                 
                

            } else {
                const data = PutData(urlUpdateCoupon, {
                    ...values,
                    branch_id : values.branch.id,
                    limit: Number(values.limit),
                    discount: Number(values.discount),
                    max_value: Number(values.max_value),
                    min_value: Number(values.min_value),
                    max_item: Number(values.max_item),
                    min_item: Number(values.min_item)
                })
                data.then((value) =>{
                   // refreshGetDataCoupon()
                    setNotif({
                        isOpen: true,
                        message: value.message,
                        type: value.status
                    })})
                    setReloadState(Math.random())
                    setAfterSave(true)
                    setAfterSaveForm(true)
         
            }
            
           
        },
    })

    return (
        <>
             
            <form onSubmit={formik.handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box>
              
                    <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <DatePicker
                                value={selectedDateFrom}
                                onChange={handleDateChangeFrom}
                                inputFormat="yyyy/MM/dd"
                                renderInput={(props) => (
                                    <TextField
                                        {...props}
                                        fullWidth
                                        variant="outlined"
                                        id="mui-pickers-date"
                                        label="Valid From"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <DatePicker
                                value={selectedDateUnitl}
                                onChange={handleDateChangeUntil}
                                inputFormat="yyyy/MM/dd"
                                renderInput={(props) => (
                                    <TextField
                                        {...props}
                                        fullWidth
                                        variant="outlined"
                                        id="mui-pickers-date"
                                        label="Valid Until"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} >
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Name / Code Coupon"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} >
                        <Box
                            sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'row',
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                            gap: 3
                            }}
                        >
                            <Box>
                            <TextField
                                fullWidth
                                id="limit"
                                name="limit"
                                label="Limit"
                                value={formik.values.limit}
                                onChange={formik.handleChange}
                                error={formik.touched.limit && Boolean(formik.errors.limit)}
                                helperText={formik.touched.limit && formik.errors.limit}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            </Box>
                            <Box>
                         
                            </Box>
                        </Box>
                          
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                        <Box
                            sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'row',
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                            gap: 3
                            }}
                        >
                        <Box>
                        <TextField
                                fullWidth
                                id="max_value"
                                name="max_value"
                                label="Max Value"
                                value={formik.values.max_value}
                                onChange={formik.handleChange}
                                error={formik.touched.max_value && Boolean(formik.errors.max_value)}
                                helperText={formik.touched.max_value && formik.errors.max_value}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>
                        <Box>
                        <TextField
                                fullWidth
                                id="min_value"
                                name="min_value"
                                label="Min Value"
                                value={formik.values.min_value}
                                onChange={formik.handleChange}
                                error={formik.touched.min_value && Boolean(formik.errors.min_value)}
                                helperText={formik.touched.min_value && formik.errors.min_value}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>
                        </Box>
                          
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} >
                        <Box
                            sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'row',
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                            gap: 3
                            }}
                        >
                            <Box>
                            <TextField
                                fullWidth
                                id="max_item"
                                name="max_item"
                                label="Max Item"
                                value={formik.values.max_item}
                                onChange={formik.handleChange}
                                error={formik.touched.max_item && Boolean(formik.errors.max_item)}
                                helperText={formik.touched.max_item && formik.errors.max_item}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            </Box>
                            <Box>
                            <TextField
                                fullWidth
                                id="min_item"
                                name="min_item"
                                label="Min Item"
                                value={formik.values.min_item}
                                onChange={formik.handleChange}
                                error={formik.touched.min_item && Boolean(formik.errors.min_item)}
                                helperText={formik.touched.min_item && formik.errors.min_item}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            </Box>
                        </Box>
                        </Grid>
                      
                        <Grid item lg={6} md={6} sm={12} xs={12} >

                        <Box
                            sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'row',
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                            gap: 3
                            }}
                        >
                            <Box>
                            <TextField
                                fullWidth
                                id="discount"
                                name="discount"
                                label="Discount"
                                value={formik.values.discount}
                                onChange={formik.handleChange}
                                error={formik.touched.discount && Boolean(formik.errors.discount)}
                                helperText={formik.touched.discount && formik.errors.discount}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            </Box>
                            <Box sx={{mt: -2}}>
                            <Autocomplete
                                fullWidth 
                                sx={{ width: 187 }}
                                id="discounttype"
                                name="discounttype"
                                value={formik.values.discount_type}
                                onChange={(e, value) => {
                                    if (value != null) {

                                        formik.handleChange({ ...e, target: { name: 'discount_type', value: value } })

                                    }
                                }}
                                options={discountType}
                                getOptionLabel={(option) => option ? option : []}
                                isOptionEqualToValue={(option, value) => option === value}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        margin="normal"
                                        label="Disc. Type"
                                        fullWidth
                                        name="discounttype"

                                    />
                                )}

                            />
                            </Box>
                        </Box>
                           
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{mt: -2}}>
                        <Autocomplete
                                id="branch"
                                name="branch"
                                value={formik.values.branch}
                                onChange={(e, value) => {
                                    if (value != null) {
                                        console.log("value",value)
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
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: -1 }}>
                            
                                <TextField
                                    fullWidth
                                    id="description"
                                    name="description"
                                    label="Description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                   
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    multiline
                                    rows={4}
                                />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} >
                        <Box sx={{ml : 1}}>
                        <Typography>Active</Typography>
                            <Switch
                                checked={checked}
                              
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Box>
                    
                        </Grid>


                    </Grid>
                </Box>
             
                <Box textAlign={"right"}>
                {afterSaveForm === true &&
                        <Button color="primary" variant="text" sx={{ mt: 5 }} onClick={() =>
                            setPopupStates({
                                ...popupStates,
                                openPopup: false
                            })
                        }>
                            {/* <Icon>send</Icon> */}

                            <Typography variant="button" display="block"> Close</Typography>

                        </Button>
                    }
                    <Button color="primary" variant="text" type="submit" sx={{ mt: 5 }}>
                        {/* <Icon>send</Icon> */}

                        <Typography variant="button" display="block"> Submit</Typography>

                    </Button>
                    
                </Box>
                </LocalizationProvider>
            </form>
          
        </>
    )
}
export default CouponForm