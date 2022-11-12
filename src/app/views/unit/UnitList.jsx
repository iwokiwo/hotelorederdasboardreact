import React, { useCallback, useEffect } from 'react'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    Icon,
    TableRow,
    Card,
    Select,
    Button,
    Avatar,
    TextField,
    Grid,
    Snackbar,
    Alert,
    Paper,
    Divider,
    InputAdornment,
    CardContent,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Paragraph, Span } from 'app/components/Typography'
import { Box, styled, useTheme } from '@mui/system'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

import { Breadcrumb, SimpleCard } from 'app/components'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as yup from 'yup';
import { useFormik } from 'formik'

import { createDataUnit, dataUnit, getDataUnit } from 'app/store/Unit'
import { confirmDialogState, openMessage, popupState } from 'app/store/Controls'
import controls from '../components'
import { pagination } from 'app/store/Pagination'
import { PostData } from 'app/services/postData'
import { isEmpty } from 'lodash'
import useTable from '../components/useTable'
import { urlCreateUnit, urlDeleteUnit, urlUpdateUnit } from 'app/utils/constant'





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

const ProductTable = styled(Table)(() => ({
    minWidth: 400,
    whiteSpace: 'pre',
    '& small': {
        height: 15,
        width: 50,
        borderRadius: 500,
        boxShadow:
            '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    },
    '& td': {
        borderBottom: 'none',
    },
    '& td:first-of-type': {
        paddingLeft: '16px !important',
    },
}))

const Small = styled('small')(({ bgcolor }) => ({
    height: 15,
    width: 50,
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '4px',
    overflow: 'hidden',
    background: bgcolor,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
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


const UnitList = () => {
    const classes = useStyles();
    const { unit } = useRecoilValue(getDataUnit)
    const [valuesSearch, setValuesSearch] = React.useState('');
    const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } });
    const [createState, setCreateState] = useRecoilState(dataUnit)
    const [notif, setNotif] = useRecoilState(openMessage)
    const [confirmDialog, setConfirmDialog] = useRecoilState(confirmDialogState)
    const [popupStates, setPopupStates] = useRecoilState(popupState)

    const [paginationState, setPaginationState] = useRecoilState(pagination)

    const headCells = [

        { id: 'ID', lable: 'SN', align: "left" },
        { id: 'Name', lable: 'Name', align: "left" },
        { id: 'action', lable: 'Action', disableSorting: true, align: "center" },
    ]

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSort
    } = useTable(unit.data, headCells, filterFn);

    const formik = useFormik({
        initialValues: {
            name: "",
            id: " ",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let url = urlUpdateUnit
            if (Number(values.id) === 0) url = urlCreateUnit

            PostData(url, values).then((value) =>
                setNotif({
                    isOpen: true,
                    message: value.message,
                    type: value.staus
                }))
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
            title: "Add Unit",
            openPopup: true,
            size: "sm"
        })
    }

    const GetData2 = () => {
        setPaginationState({
            ...paginationState,
            Page: 2
        })
    }

    const handleChange = (e) => {
        let target = e.target;
        setValuesSearch({ valuesSearch: target.value });

    }

    const onDelete = (values) => {
        console.log("delete",values) 

        PostData(urlDeleteUnit, values).then((value) =>
        setNotif({
            isOpen: true,
            message: value.message,
            type: value.staus
        }))

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })


    }

    useEffect(() => {
        setFilterFn({
            fn: items => {
                if (isEmpty(valuesSearch.valuesSearch)) {
                    return items = unit.data
                }
                else {
                    return items = unit.data.filter(x => x.Name.toUpperCase().includes(valuesSearch.valuesSearch.toUpperCase()));
                }
            }
        })
    }, [valuesSearch,notif])


    return (

        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Unit List', path: '/unit/unit-list' },
                    ]}
                />
            </div>

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
                            Add Unit
                        </Span>
                    </Button>
                </CardHeader>
                {/* <Box overflow="auto">
                    <ProductTable>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ px: 3 }} colSpan={4}>
                                    Name
                                </TableCell>
                                <TableCell sx={{ px: 0 }} colSpan={1}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            
                            {unit.data !== undefined && unit.data.map((data, index) => (
                                <TableRow key={data.ID} hover>
                                    <TableCell
                                        colSpan={4}
                                        align="left"
                                        sx={{ px: 0, textTransform: 'capitalize' }}
                                    >
                                    {data.Name}
                                    </TableCell>

                                    <TableCell sx={{ px: 0 }} colSpan={1}>
                                        <IconButton onClick={()=>{
                                            formik.values.id = data.ID
                                            formik.values.name = data.Name
                                            setPopupStates({
                                                title: "Edit Unit",
                                                openPopup: true,
                                                size: "sm"
                                            })
                                        }
                                            }>
                                            <Icon color="primary">edit</Icon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </ProductTable> 
                </Box>*/}
                <CardContent>
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
                </CardContent>
            </Card>

            <controls.Notification />
            <controls.ConfirmDialog />

            <controls.popup>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={12}>
                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>

                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Unit"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />

                            <Button color="primary" variant="contained" type="submit" sx={{ mt: 2 }}>
                                Submit
                            </Button>

{/* 
                            <controls.ActionButton
                                color="secondary"
                                onClick={() => { GetData2() }}
                            >
                                tes
                            </controls.ActionButton> */}


                        </Grid>
                    </Grid>
                </form>
            </controls.popup>
        </Container>
    )
}

export default UnitList
