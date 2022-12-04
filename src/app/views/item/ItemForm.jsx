import {Grid} from "@mui/material";

const ItemForm = () => {
    return(
        <>
            <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}></Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}></Grid>
            </Grid>
        </>
    )
}

export default ItemForm
