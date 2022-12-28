import {Autocomplete, Button, Grid, Paper, TextField, Box, Tabs, Tab, Typography} from "@mui/material";
import {Span} from "../../components/Typography";
import PropTypes from 'prop-types';

import {useRecoilState, useRecoilValue} from "recoil";
import {useFormik} from "formik";

import {setDataItemFromik} from "../../store/Item";
import React, {useEffect} from "react";
import {getDataUnit} from "../../store/Unit";
import {getDataCategory} from "../../store/Category";
import * as yup from "yup";
import {PostMultipartFormData} from "../../services/postData";
import {urlCreateBranch, urlCreateItem, urlUpdateBranch, urlUpdateItem} from "../../utils/constant";
import {PutMultipartFormData} from "../../services/putData";
import {now} from "moment";
import {confirmDialogState, openMessage, popupState, reload} from "../../store/Controls";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const validationSchema = yup.object({
    name: yup
        .string('Enter Name ')
        .required('Name is required'),

});


const ItemForm = () => {
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);

    const setData = useRecoilValue(setDataItemFromik)
    const { unit } = useRecoilValue(getDataUnit)
    const {category} = useRecoilValue(getDataCategory)
    const [notif, setNotif] = useRecoilState(openMessage)
    const [confirmDialog, setConfirmDialog] = useRecoilState(confirmDialogState)
    const [popupStates, setPopupStates] = useRecoilState(popupState)
    const [reloadState, setReloadState] = useRecoilState(reload)

    const [valueTab, setValueTab] = React.useState("1")

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue)
    }

    const formik = useFormik({
        initialValues : {
            ...setData
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (Number(values.id) === 0) {
                //CreateData(values)
                console.log("add",values)
                PostMultipartFormData(urlCreateItem, {
                    ...values,
                    unit_id : values.unit.ID,
                    category_id : values.category.ID
                }).then((value) =>
                    setNotif({
                        isOpen: true,
                        message: value.message,
                        type: value.status
                    }))

            } else {

                const data = PutMultipartFormData(urlUpdateItem, {
                    ...values,
                    unit_id : values.unit.ID,
                    category_id : values.category.ID
                })
                console.log("edit",values)
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
    })

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
            formik.values.thumbnail = selectedImage
        }
    }, [selectedImage]);

    return(
        <>
            <form onSubmit={formik.handleSubmit}>
            <TabContext value={valueTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                <Tab label="Item" value="1" />
                <Tab label="Image" value="2" />
                <Tab label="Item Three" value="3" />
            </TabList>
            </Box>
            <TabPanel value="1">
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
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        id="price"
                        name="price"
                        label="Price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                        sx={{mt: 3.1}}

                    />
                    <TextField
                        fullWidth
                        id="sale_price"
                        name="sale_price"
                        label="Sale Price"
                        value={formik.values.sale_price}
                        onChange={formik.handleChange}
                        error={formik.touched.sale_price && Boolean(formik.errors.sale_price)}
                        helperText={formik.touched.sale_price && formik.errors.sale_price}
                        sx={{mt: 3.1}}
                    />
                    <TextField
                        fullWidth
                        id="description"
                        name="description"
                        label="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        sx={{mt: 3.1}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        multiline
                        rows={4}
                    />



                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 0 }}>
                    <Autocomplete
                        id="unit"
                        name="unit"
                        value={formik.values.unit}
                        onChange={(e, value) => {
                            if (value != null) {
                                console.log("e",e)
                                console.log("value",value)
                                formik.handleChange({ ...e, target: { name: 'unit', value: value } })
                                // formik.values.unit_id = value.ID
                            }
                        }}
                        options={unit.data}
                        getOptionLabel={(option) => option ? option.Name : []}
                        isOptionEqualToValue={(option, value) => option.ID === value.ID}
                        renderInput={params => (
                            <TextField
                                {...params}
                                margin="normal"
                                label="Unit"

                                fullWidth
                                name="unit"

                            />
                        )}

                    />
                    <Autocomplete
                        id="category"
                        name="category"
                        value={formik.values.category}
                        onChange={(e, value) => {
                            if (value != null) {
                                formik.handleChange({ ...e, target: { name: 'category', value: value } })
                               // formik.handleChange({ ...e, target: { name: category_id, value: value } })
                               //  formik.values.category_id = value.ID
                            }
                        }}
                        options={category.data}
                        getOptionLabel={(option) => option ? option.Name : []}
                        isOptionEqualToValue={(option, value) => option.ID === value.ID}
                        renderInput={params => (
                            <TextField
                                {...params}
                                margin="normal"
                                label="Category"

                                fullWidth
                                name="category"

                            />
                        )}
                    />
                    <TextField
                        fullWidth
                        id="stock"
                        name="stock"
                        label="Stock"
                        value={formik.values.stock}
                        onChange={formik.handleChange}
                        error={formik.touched.stock && Boolean(formik.errors.stock)}
                        helperText={formik.touched.stock && formik.errors.stock}
                        sx={{mt: 2.1}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Paper variant="outlined"
                           sx={{
                               mt: 3.2,
                               borderRadius: 1,
                               border: 1,
                               p: 1,
                               borderColor: 'lightgray',
                               textAlign:'center',
                               height: 115
                           }}>
                        <Box sx={{mt: 0.5, mb: 0.5, height: 50}} textAlign="center">

                            {imageUrl && selectedImage  ?(
                                    <img src={imageUrl} alt={selectedImage.name} height="50px" />
                                ):
                                (<img src={`${formik.values.url}${formik.values.path}${formik.values.thumbnail}`} height="50px" />)
                            }
                        </Box>
                        <input
                            accept="image/*"
                            type="file"
                            id="select-image-item"
                            style={{ display: "none" }}
                            onChange={(e) => setSelectedImage(e.target.files[0])}
                        />
                        <label htmlFor="select-image-item">
                            <Button variant="text" color="primary" component="span">
                                Upload Image
                            </Button>
                        </label>

                    </Paper>

                </Grid>
            </Grid>
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
                <Box textAlign={"right"}>
                    <Button color="primary" variant="text" type="submit" sx={{mt: 5}}>
                        {/* <Icon>send</Icon> */}
                        <Span sx={{ textTransform: 'capitalize' }}>
                            Submit
                        </Span>
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default ItemForm
