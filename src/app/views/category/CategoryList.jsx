import React, { useEffect } from 'react'
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
    CardContent,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Box, styled, useTheme } from '@mui/system'
import { Breadcrumb, SimpleCard } from 'app/components'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Paragraph, Span } from 'app/components/Typography'
import * as yup from 'yup';
import { useFormik } from 'formik'
import { now } from 'moment/moment'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

import { createDataCategory, dataCategory, dataHeadCall, getDataCategory, getDataCategorys } from 'app/store/Category'
import { confirmDialogState, openMessage, popupState, reload } from 'app/store/Controls'
import { PutData } from 'app/services/putData'
import { PostData } from 'app/services/postData'
import controls from '../components'
import useTable from '../components/useTable'
import { urlCreateCategory, urlDeleteCategory, urlUpdateCategory } from 'app/utils/constant'
import { isEmpty } from 'lodash'


const CardHeader = styled('div')(() => ({
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))


const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
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

const CategoryList = () => {
    const navigate = useNavigate()
    
    const [valuesSearch, setValuesSearch] = React.useState('');
    //componen variable
    const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } });
    //recoil 
    const {category} = useRecoilValue(getDataCategory)
    const [notif, setNotif] = useRecoilState(openMessage)
    const [confirmDialog, setConfirmDialog] = useRecoilState(confirmDialogState)
    const [popupStates, setPopupStates] = useRecoilState(popupState)
    const [dataCategoryState, setDataCategoryState] = useRecoilState(dataCategory)
    const [dataCategoryStates,setDataCategoryStates] = useRecoilState(getDataCategorys)
    const [createDataCategoryState,setCreateDataCategoryState]= useRecoilState(createDataCategory)
    const headCall = useRecoilValue(dataHeadCall)

    //  console.log("dataCategoryStates",dataCategoryStates)
    //  console.log("category",category)
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSort
    } = useTable(category.data, headCall, filterFn);


    const formik = useFormik({
        initialValues: {
            dataCategoryState
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (Number(values.id) === 0) {
                //CreateData(values)
                PostData(urlCreateCategory, values).then((value) =>
                    setNotif({
                        isOpen: true,
                        message: value.message,
                        type: value.status
                    }))

                    setDataCategoryState({...values})
                // console.log("createDataCategoryState",createDataCategoryState)
               
            } else {
                const data = PutData(urlUpdateCategory, values)
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

           
          
        },
    });

    const handleClickOpen = () => {
        formik.values.id = 0
        formik.values.name = ""
        setPopupStates({
            title: "Add Category",
            openPopup: true,
            size: "sm"
        })
       
    }

    const handleChange = (e) => {
        let target = e.target;
        setValuesSearch({ valuesSearch: target.value });

    }

    const onDelete = (values) => {
        PostData(urlDeleteCategory, values).then((value) =>
            setNotif({
                isOpen: true,
                message: value.message,
                type: value.status
            }))
    
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        setDataCategoryState({...values})
    }

    const RrenderTable = () => {

        return (
            <>
                <TblContainer component={Paper}>
                    <Table aria-label="a dense table" size="small" >
                        <TblHead />
                        <TableBody>
                            {recordsAfterPagingAndSort().map(row => (
                                <TableRow key={row.ID}>
                                    <TableCell component="th" scope="row">
                                        {row.ID}
                                    </TableCell>
                                    <TableCell align="left">{row.Name}</TableCell>

                                    <TableCell align='center'>
                                        <controls.ActionButton
                                            color="primary"
                                            onClick={() => {
                                                formik.values.id = row.ID
                                                formik.values.name = row.Name
                                                setPopupStates({
                                                    title: "Edit Unit",
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
                                                    title: `Are you sure to delete ${row.Name} ?`,
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
            </>
        )
    }

    const RenderForm = () => {
        return(
            <>
             <controls.popup>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={12}>
                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>

                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Category"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />

                            <Button color="primary" variant="contained" type="submit" sx={{ mt: 2 }}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </controls.popup>
            </>
        )
    }
 
    useEffect(() => {
        setFilterFn({
            fn: items => {
                if (isEmpty(valuesSearch.valuesSearch)) {
                    return items = category.data
                }
                else {
                    return items = category.data.filter(x => x.Name.toUpperCase().includes(valuesSearch.valuesSearch.toUpperCase()));
                }
            }
        })
    }, [valuesSearch, notif])


    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Category List', path: '/category/category-list' },
                    ]}
                />
            </div>
            <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <CardHeader>
            <controls.Input
                        name="cariProduk"
                        label="Search"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                            </InputAdornment>)
                        }}
                        onChange={handleChange}
                    />
                {/* <Button color="primary" variant="contained" onClick={()=> navigate('/material/form')}> */}
                <Button color="primary" variant="contained" onClick={handleClickOpen}>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                        Add Category
                    </Span>
                </Button>
            </CardHeader>
            <Box overflow="auto" sx={{p: 3}}>
               {RrenderTable()}
            </Box>
        </Card>
        <controls.Notification />
        <controls.ConfirmDialog />
        {RenderForm()}
       
        </Container>
    )
}

export default CategoryList
