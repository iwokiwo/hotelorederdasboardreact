import {Autocomplete, Button, Grid, Paper, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useRecoilValue} from "recoil";
import {setDataItemFromik} from "../../store/Item";
import React, {useEffect} from "react";
import {getDataUnit} from "../../store/Unit";
import {getDataCategory} from "../../store/Category";
import {Box} from "@mui/system";
import {Span} from "../../components/Typography";

const ItemForm = () => {
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);

    const setData = useRecoilValue(setDataItemFromik)
    const { unit } = useRecoilValue(getDataUnit)
    const {category} = useRecoilValue(getDataCategory)

    const formik = useFormik({
        initialValues : {
            ...setData
        }
    })

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
            formik.values.logo = selectedImage
        }
    }, [selectedImage]);

    return(
        <>
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
                        id="hpp"
                        name="hpp"
                        label="Hpp"
                        value={formik.values.hpp}
                        onChange={formik.handleChange}
                        error={formik.touched.hpp && Boolean(formik.errors.hpp)}
                        helperText={formik.touched.hpp && formik.errors.hpp}
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
                               borderRadius: 2,
                               border: 1,
                               p: 1,
                               borderColor: 'lightblue',
                               textAlign:'center',
                               height: 115
                           }}>
                        <Box sx={{mt: 0.5, mb: 0.5}} textAlign="center">

                            {imageUrl && selectedImage  ?(
                                    <img src={imageUrl} alt={selectedImage.name} height="50px" />
                                ):
                                (<img src={`${formik.values.url}${formik.values.path}${formik.values.logo}`} height="50px" />)
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
                            <Button variant="contained" color="primary" component="span">
                                Upload Logo
                            </Button>
                        </label>

                    </Paper>

                </Grid>
            </Grid>
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
