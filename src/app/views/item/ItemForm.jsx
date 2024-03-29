import {Autocomplete, Button, Grid, Paper, TextField, Box, Tabs, Tab, Typography, IconButton, Alert} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PhotoIcon from '@mui/icons-material/Photo';
import CreateIcon from '@mui/icons-material/Create';
import CancelIcon from '@mui/icons-material/Cancel';
import {useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue} from "recoil";
import {useFormik} from "formik";
import ImageUploading from "react-images-uploading";
import * as yup from "yup";

import {setDataItemFromik} from "../../store/Item";
import React, {useEffect} from "react";
import {getDataUnit} from "../../store/Unit";
import {getDataCategory} from "../../store/Category";
import { getDataBranch } from "app/store/Branchs";
import {PostMultipartFormDataMultiFile} from "../../services/postData";
import {urlCreateBranch, urlCreateItem, urlUpdateBranch, urlUpdateItem} from "../../utils/constant";
import {PutMultipartFormDataMultiFile} from "../../services/putData";
import {now} from "moment";
import {confirmDialogState, openMessage, popupState, reload} from "../../store/Controls";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { remove } from "lodash";
import { dataProduct } from "app/store";

const validationSchema = yup.object({
    name: yup
        .string('Enter Name ')
        .required('Name is required'),

});

const MAX_COUNT = 5;


const ItemForm = (props) => {
    const { afterSave, setAfterSave } = props;
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);

    const setData = useRecoilValue(setDataItemFromik)
    const { unit } = useRecoilValue(getDataUnit)
    const {category} = useRecoilValue(getDataCategory)
    const {branch} = useRecoilValue(getDataBranch)
    const [notif, setNotif] = useRecoilState(openMessage)
    const [confirmDialog, setConfirmDialog] = useRecoilState(confirmDialogState)
    const [popupStates, setPopupStates] = useRecoilState(popupState)
    const [reloadState, setReloadState] = useRecoilState(reload)
    const refreshDataProduct = useRecoilRefresher_UNSTABLE(dataProduct);

    const [valueTab, setValueTab] = React.useState("1")
    const [images, setImages] = React.useState([]);
    const [uploadImages, setUploadImages] = React.useState([]);
    const [uploadedFiles, setUploadedFiles] = React.useState([])
    const [galleryTmp, setGalleryTmp] = React.useState([])
    const [ afterSaveForm, setAfterSaveForm ] = React.useState(false);
  
    const maxNumber = 69;
    const maxFileSize = 300000

    const onChange = (imageList, addUpdateIndex) => {

        uploadImages.length = 0
        imageList.map(x => {    
            uploadImages.push(x.file)

        })
        setImages(imageList);
        formik.values.multiFile = uploadImages
    };

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue)
    }

    
    const deleteImgGalery = (item) => {
        
        const dataRemove = galleryTmp.filter(x => x.Filename !== item.Filename)
        setGalleryTmp(dataRemove)
      
        //console.log("alleryTmp.filter(x => x.Filename === item.Filename)",galleryTmp.filter(x => x.Filename === item.Filename))
        uploadedFiles.push(galleryTmp.filter(x => x.Filename === item.Filename)[0].Filename)
        formik.values.multiFileDelete = uploadedFiles
    }

    const renderFormUploadImage = () => {
        return (
            <Grid container>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <Paper variant="outlined"
                        sx={{
                            mt: 1,
                            borderRadius: 1,
                            border: 1,
                            mb: 1,
                            p: 1,
                            borderColor: 'lightgray',
                            textAlign: 'center',

                        }}>
                        <ImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            maxFileSize={maxFileSize}
                            dataURLKey="data_url"
                            acceptType={["jpg"]}
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                                errors
                            }) => (
                              
                                // write your building UI
                                <div>
                                    {/* {console.log(errors)} */}
                                    {errors && 
                                    <>
                                        <Alert severity="error">Selected file size exceed max file size (300 kb) </Alert>
                                    </>
                                    }
                                    <Paper elevation={0} sx={{
                                        p: 1,
                                    }}>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            sx={{height: '60px'}}
                                            startIcon={<CloudUploadIcon />}
                                            style={isDragging ? { color: "orange" } : null}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            Upload Images Or Drag & Drop 
                                        </Button>

                                        {/* <Button variant="outlined" size="large" color="error" startIcon={<RemoveCircleIcon />} sx={{ ml: 1 }} onClick={onImageRemoveAll}>Remove all images</Button> */}
                                    </Paper>

                                    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ p: 1,  justifyContent: "center" }}>
                                        {Array.from(images).map((image, index) => (
                                            <Grid item xs={4} key={index}>
                                                <Paper elevation={10} sx={{p: 1}}>
                                                <Grid container spacing={1} direction="row" sx={{ mt: 1 , justifyContent: "center"}}>
                                                    <Grid item xs={12}>
                                                        <img src={image.data_url } alt="" height="150" width="175" />
                                                        <IconButton size="small" color="error" onClick={() => onImageRemove(index)} sx={{mt: -46, ml: 24.5}}><CancelIcon /> </IconButton>
                                                    </Grid>
                                                    {/* <Grid item xs={12} >
                                                        <Button size="medium" color="primary" variant="outlined" onClick={() => onImageUpdate(index)} startIcon={<ModeIcon /> }>Edit</Button>

                                                 
                                                    </Grid> */}
                                                </Grid>
                                                </Paper>

                                            </Grid>
                                        ))}
                                         {Array.from(galleryTmp).map((image, index) => (
                                            <Grid item xs={4} key={index}>
                                                <Paper elevation={10} sx={{p: 1}}>
                                                <Grid container spacing={1} direction="row" sx={{ mt: 1 , justifyContent: "center"}}>
                                                    <Grid item xs={12}>
                                                        <img src={`${image.Url}${image.Path}${image.Filename}` } alt="" height="150" width="175" />
                                                        <IconButton size="small" color="error" onClick={() => deleteImgGalery(image)} sx={{mt: -46, ml: 24.5}}><CancelIcon /> </IconButton>
                                                    </Grid>
                                                 
                                                </Grid>
                                                </Paper>

                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            )}
                        </ImageUploading>

                    </Paper>
                </Grid>
            </Grid>
        )
    }

    const formik = useFormik({
        initialValues : {
            ...setData
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          //  console.log("add",values)
          saveData(values)
          
        },
    })


    const saveData = (values) =>{

       
        if (Number(values.id) === 0) {
            //CreateData(values)
           
            PostMultipartFormDataMultiFile(urlCreateItem, {
                ...values,
                unit_id : values.unit.ID,
                category_id : values.category.ID,
                branch_id : values.branch.id
            }).then((value) =>{
              
                setNotif({
                    isOpen: true,
                    message: value.message,
                    type: value.status
                })
                setReloadState(Math.random())
                formik.values.multiFile =[]
                setAfterSave(true)
                setAfterSaveForm(true)
            })

        } else {

            const data = PutMultipartFormDataMultiFile(urlUpdateItem, {
                ...values,
                unit_id : values.unit.ID,
                category_id : values.category.ID,
                branch_id : values.branch.id
            })

            data.then((value) =>{

                setNotif({
                    isOpen: true,
                    message: value.message,
                    type: value.status
                })
                setReloadState(Math.random())
                formik.values.multiFile =[]
                setAfterSave(true)
                setAfterSaveForm(true)
            })
              
        }

     
    }

    useEffect(() => {
        // if(selectedImage.size > 300000){
        //     setNotif({
        //         isOpen: true,
        //         message: "Selected file size exceed max file size (300 kb) ",
        //         type: "warning"
        //     })
        //     return
        // }
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
            // const myReader = new FileReader();
            // myReader.readAsBinaryString(selectedImage)
            // myReader.onload = () => console.log(myReader.result);

            const newName = new Date().getTime() + selectedImage.name;  
            const myRenamedFile = new File([selectedImage], newName);
            //console.log("myRenamedFile", myRenamedFile)
            formik.values.thumbnail = myRenamedFile
        }

        console.log("selectedImage",selectedImage)
     
    }, [selectedImage]);

    useEffect(()=>{
        setGalleryTmp(setData.multiFileDelete)
    },[])

    return(
        <>
            <form onSubmit={formik.handleSubmit}>
                <TabContext value={valueTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                            <Tab label="Item" icon={<CreateIcon />} iconPosition="start"  value="1" />
                            <Tab label="Image" icon={<PhotoIcon />} iconPosition="start" value="2" />
                         
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
                                    sx={{ mt: 3.1 }}

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
                                    sx={{ mt: 3.1 }}
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
                                <TextField
                                    fullWidth
                                    id="description"
                                    name="description"
                                    label="Description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                    sx={{ mt: 3.1 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    multiline
                                    rows={2}
                                />



                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 0 }}>
                                <Autocomplete
                                    id="unit"
                                    name="unit"
                                    value={formik.values.unit}
                                    onChange={(e, value) => {
                                        if (value != null) {
                                            console.log("e", e)
                                            console.log("value", value)
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
                                    id="quantity"
                                    name="quantity"
                                    label="Stock"
                                    value={formik.values.quantity}
                                    onChange={formik.handleChange}
                                    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                    helperText={formik.touched.quantity && formik.errors.quantity}
                                    sx={{ mt: 2.1 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Paper variant="outlined"
                                    sx={{
                                        mt: 2.2,
                                        borderRadius: 1,
                                        border: 1,
                                        p: 1,
                                        borderColor: 'lightgray',
                                        textAlign: 'center',
                                        height: 160
                                    }}>
                                    <Box sx={{ mt: 0.5, mb: 6.5, height: 50 }} textAlign="center">

                                        {imageUrl && selectedImage ? (
                                            <img src={imageUrl} alt={selectedImage.name} height="100px" />
                                        ) :
                                            (<img src={`${formik.values.url}${formik.values.path}${formik.values.thumbnail}`} height="100px" />)
                                        }
                                    </Box>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        id="select-image-item"
                                        style={{ display: "none" }}
                                        onChange={(e) =>{ 
                                            if (e.target.files[0].size > maxFileSize) {
                                                setNotif({
                                                    isOpen: true,
                                                    message: "Selected file size exceed max file size (300 kb) ",
                                                    type: "warning"
                                                })
                                                return
                                            }
                                            setSelectedImage(e.target.files[0])
                                        }
                                        }
                                    />
                                    <label htmlFor="select-image-item">
                                        <Button variant="text" color="primary" component="span" startIcon={<CloudUploadIcon/>}>
                                            Upload Image
                                        </Button>
                                    </label>

                                </Paper>

                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value="2">{renderFormUploadImage()}</TabPanel>
                
                </TabContext>
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
            </form>
        </>
    )
}

export default ItemForm
