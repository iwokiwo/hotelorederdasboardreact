import React, { useCallback, useEffect } from 'react'
import {
    Table,
    TableCell,
    TableBody,
    TableRow,
    Card,
    Button,
    TextField,
    Grid,
    Paper,
    InputAdornment,
    CardContent, Divider,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Paragraph, Span } from 'app/components/Typography'
import { Box, styled, useTheme } from '@mui/system'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

import { useRecoilState, useRecoilValue } from 'recoil'
import * as yup from 'yup';
import { useFormik } from 'formik'

import { confirmDialogState, openMessage, popupState, reload } from 'app/store/Controls'
import controls from '../components'
import {PostData, PostMultipartFormData} from 'app/services/postData'
import {isEmpty, isNil} from 'lodash'
import useTable from '../components/useTable'
import {urlCreateBranch, urlDeleteUnit, urlUpdateBranch} from 'app/utils/constant'
import {PutMultipartFormData} from 'app/services/putData'
import { now } from 'moment/moment'
import {dataBranch, dataHeadCallBranch, getDataBranch, setDataBranchFromik} from "app/store/Branchs";


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }
}));

const CardHeader = styled('div')(() => ({
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const validationSchema = yup.object({
    name: yup
        .string('Enter Name ')
        .required('Name is required'),

});


const BranchList = () => {
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);

    const {branch} = useRecoilValue(getDataBranch)
    const [valuesSearch, setValuesSearch] = React.useState('');
    const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } });
    const setData = useRecoilValue(setDataBranchFromik)
    const [dataBranchState, setDataBranchState] = useRecoilState(dataBranch)
    const headCall = useRecoilValue(dataHeadCallBranch)

    const [notif, setNotif] = useRecoilState(openMessage)
    const [confirmDialog, setConfirmDialog] = useRecoilState(confirmDialogState)
    const [popupStates, setPopupStates] = useRecoilState(popupState)
    const [reloadState, setReloadState] = useRecoilState(reload)

    console.log("branch",branch)

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSort
    } = useTable(isNil(branch) ? []: branch.data, headCall, filterFn);

    const formik = useFormik({
        initialValues: {
            ...setData,
            logoOld: setData.logo,
            id: setData.id
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (Number(values.id) === 0) {
                //CreateData(values)
                PostMultipartFormData(urlCreateBranch, values).then((value) =>
                    setNotif({
                        isOpen: true,
                        message: value.message,
                        type: value.status
                    }))

            } else {
                console.log("edit",values)
                const data = PutMultipartFormData(urlUpdateBranch, values)
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

    const handleClickOpen = () => {
        if(branch.data.length > 1){
            setNotif({
                isOpen: true,
                message: "Branch have limit",
                type: "error"
            })
            return
        }

        formik.values.id = 0
        formik.values.name = ""
        formik.values.phone = ""
        formik.values.email = ""
        formik.values.address = ""
        formik.values.url = ""
        formik.values.path = ""
        formik.values.logo = null
        formik.values.logoOld = null
        setPopupStates({
            title: "Add Branch",
            openPopup: true,
            size: "sm"
        })

    }

    const handleChange = (e) => {
        let target = e.target;
        setValuesSearch({ valuesSearch: target.value });

    }

    const onDelete = (values) => {
        PostData(urlDeleteUnit, values).then((value) =>
            setNotif({
                isOpen: true,
                message: value.message,
                type: value.status
            }))

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        setReloadState(now())

    }

    const RrenderTable = () => {

        return (
            <>
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
                                    <TableCell align="left">{row.phone}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="left">{row.address}</TableCell>
                                    <TableCell align="left"> <img src={`${row.url}${row.path}${row.logo}`} height="50px" /></TableCell>
                                    <TableCell align='center'>

                                            <controls.ActionButton
                                                color="primary"
                                                onClick={() => {
                                                    formik.values.id = row.id
                                                    formik.values.name = row.name
                                                    formik.values.phone = row.phone
                                                    formik.values.email = row.email
                                                    formik.values.address = row.address
                                                    formik.values.url = row.url
                                                    formik.values.path = row.path
                                                    formik.values.logo = row.logo
                                                    formik.values.logoOld = row.logo
                                                    setPopupStates({
                                                        title: "Edit Branch",
                                                        openPopup: true,
                                                        size: "sm"
                                                    })
                                                }}
                                            >
                                                <EditOutlinedIcon fontSize="small" />
                                            </controls.ActionButton>



                                        {/*<controls.ActionButton*/}
                                        {/*    color="primary"*/}
                                        {/*    onClick={() => {*/}
                                        {/*        setConfirmDialog({*/}
                                        {/*            isOpen: true,*/}
                                        {/*            title: `Are you sure to delete ${row.Name} ?`,*/}
                                        {/*            subTitle: "You can't undo this operation",*/}
                                        {/*            onConfirm: () => { onDelete(row) }*/}
                                        {/*        })*/}
                                        {/*    }}*/}
                                        {/*>*/}
                                        {/*    <DeleteIcon fontSize="small" />*/}
                                        {/*</controls.ActionButton>*/}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TblContainer>
                <TblPagination />
            </>
        )
    }

    const RenderForm = () => {
        return(
            <controls.popup>
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
                                id="phone"
                                name="phone"
                                label="Phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                                sx={{mt: 2}}
                            />
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                sx={{mt: 2}}
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
                                    id="select-image-branch"
                                    style={{ display: "none" }}
                                    onChange={(e) => setSelectedImage(e.target.files[0])}
                                />
                                <label htmlFor="select-image-branch">
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
            </controls.popup>
        )
    }

    useEffect(() => {
        setFilterFn({
            fn: items => {
                if (isEmpty(valuesSearch.valuesSearch)) {
                    return items = isNil(branch) ? []:branch.data
                }
                else {
                    return items = isNil(branch) ? []:branch.data.filter(x => x.name.toUpperCase().includes(valuesSearch.valuesSearch.toUpperCase()));
                }
            }
        })
    }, [valuesSearch, notif])

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
            const newName = new Date().getTime() + selectedImage.name;  
            const myRenamedFile = new File([selectedImage], newName);
            formik.values.logo = myRenamedFile
        }
    }, [selectedImage]);


    return (

        <Container>
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
                    <Button color="primary" variant="contained" onClick={handleClickOpen}>

                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add Branch
                        </Span>
                    </Button>
                </CardHeader>
                <CardContent>
                    {RrenderTable()}
                </CardContent>
            </Card>

            {RenderForm()}
            <controls.Notification />
            <controls.ConfirmDialog />


        </Container>
    )
}

export default BranchList
