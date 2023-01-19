import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { getDataBranch } from 'app/store/Branchs';
import { confirmDialogState, openMessage, popupState, reload } from 'app/store/Controls';
import { dataDiscountType, setDataCouponFromik } from 'app/store/Coupon'
import { Formik, useFormik } from 'formik'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';

import * as yup from "yup";


const validationSchema = yup.object({
    name: yup
        .string('Enter Name ')
        .required('Name is required'),

});

const CouponForm = () => {

    const setData = useRecoilValue(setDataCouponFromik)
    const {branch} = useRecoilValue(getDataBranch)
    const discountType = useRecoilValue(dataDiscountType)

    const [notif, setNotif] = useRecoilState(openMessage)
    const [confirmDialog, setConfirmDialog] = useRecoilState(confirmDialogState)
    const [popupStates, setPopupStates] = useRecoilState(popupState)
    const [reloadState, setReloadState] = useRecoilState(reload)

    const formik = useFormik({
        initialValues : {
            ...setData
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("add",values)
          


        },
    })

    console.log("tes", formik.values.discount_type)
  return (
      <div>
          <form onSubmit={formik.handleSubmit}>
              <Box>
                  <Grid container spacing={6}>
                      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
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
                          <Autocomplete
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
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                      </Grid>
                  </Grid>
              </Box>
              <Box textAlign={"right"}>
                  <Button color="primary" variant="text" type="submit" sx={{ mt: 5 }}>
                      {/* <Icon>send</Icon> */}

                      <Typography variant="button" display="block"> Submit</Typography>

                  </Button>
              </Box>
          </form>
      </div>
  )
}
export default CouponForm