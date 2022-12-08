import {Autocomplete, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useRecoilValue} from "recoil";
import {setDataItemFromik} from "../../store/Item";
import React from "react";
import {getDataUnit} from "../../store/Unit";
import {getDataCategory} from "../../store/Category";

const ItemForm = () => {
    const setData = useRecoilValue(setDataItemFromik)
    const { unit } = useRecoilValue(getDataUnit)
    const {category} = useRecoilValue(getDataCategory)

    const formik = useFormik({
        initialValues : {
            ...setData
        }
    })
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
                </Grid>
            </Grid>
            </form>
        </>
    )
}

export default ItemForm
