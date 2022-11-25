import {
    Button,
    Icon,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    Box, Paper,
} from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'app/components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import * as yup from 'yup';
import { useFormik } from 'formik'

import { PostMultipartFormData } from 'app/services/postData'
import controls from '../components'
import { SimpleCard } from 'app/components'
import {useRecoilState, useRecoilValue} from 'recoil'
import { confirmDialogState, openMessage, popupState, reload } from 'app/store/Controls'
import { urlCreateStore, urlUpdateStore } from 'app/utils/constant'
import { PutMultipartFormData } from 'app/services/putData'
import { now } from 'moment/moment'
import {setDataStoreFromik} from "../../store/Store";
import {isNil} from "lodash";

const validationSchema = yup.object({
    name: yup
        .string('Enter Name ')
        .required('Name is required'),
    address: yup
        .string('Enter Address ')
        .required('Address is required'),

});

const CustomBox = styled(Box)({
    '&.MuiBox-root': {
      backgroundColor: '#fff',
      borderRadius: '1rem',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      padding: 5,
    },
    '&.MuiBox-root:hover, &.MuiBox-root.dragover': {
      opacity: 0.6,
    },
  });

const BussinesForm = () => {
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);

    const [confirmDialog, setConfirmDialog] = useRecoilState(confirmDialogState)
    const [popupStates, setPopupStates] = useRecoilState(popupState)
    const [reloadState, setReloadState] = useRecoilState(reload)
    const [notif, setNotif] = useRecoilState(openMessage)

    const setData = useRecoilValue(setDataStoreFromik)

    // console.log("setData",setData)

    const formik = useFormik({
        initialValues: {
            ...setData,
            logoOld: setData.logo,
            id: setData.id
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
           console.log(isNil(values.id))
            if (isNil(values.id)) {
                //CreateData(values)
                console.log("values",values)
                PostMultipartFormData(urlCreateStore, values).then((value) =>
                    setNotif({
                        isOpen: true,
                        message: value.message,
                        type: value.status
                    }))
               
            } else {
                const data = PutMultipartFormData(urlUpdateStore, values)
                data.then((value) =>
                    setNotif({
                        isOpen: true,
                        message: value.message,
                        type: value.status
                    }))
               
            }

            setPopupStates({
                ...popupStates,
                openPopup: false
            })

            setReloadState(now())
        },
    });

    useEffect(() => {
        if (selectedImage) {
          setImageUrl(URL.createObjectURL(selectedImage));
          formik.values.logo = selectedImage
        }
      }, [selectedImage]);

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            id="address"
                            name="address"
                            label="Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                            sx={{mt: 2}}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }} textAlign="center">
                        <Paper variant="outlined"
                               sx={{
                                   borderRadius: 2,
                                   border: 1,
                                   p: 1,
                                   borderColor: 'lightblue',
                               }}>
                            <Box sx={{mt: 1, mb: 2}} textAlign="center">

                                {imageUrl && selectedImage  ?(
                                        <img src={imageUrl} alt={selectedImage.name} height="100px" />
                                    ):
                                    (<img src={`${formik.values.url}${formik.values.path}${formik.values.logo}`} height="100px" />)
                                }
                            </Box>
                            <input
                                accept="image/*"
                                type="file"
                                id="select-image"
                                style={{ display: "none" }}
                                onChange={(e) => setSelectedImage(e.target.files[0])}
                            />
                            <label htmlFor="select-image">
                                <Button variant="contained" color="primary" component="span">
                                    Upload Logo
                                </Button>
                            </label>

                        </Paper>

                    </Grid>
                </Grid>
                <Button color="primary" variant="contained" type="submit" sx={{mt: 3}}>
                    {/* <Icon>send</Icon> */}
                    <Span sx={{ textTransform: 'capitalize' }}>
                        Update
                    </Span>
                </Button>
            </form>

            <controls.Notification />
            <controls.ConfirmDialog />

        </div>
    )
}

export default BussinesForm
