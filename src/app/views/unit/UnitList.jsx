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
    CardContent,
    Autocomplete,
    Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Paragraph, Span } from 'app/components/Typography'
import { Box, styled, useTheme } from '@mui/system'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

import { Breadcrumb, SimpleCard } from 'app/components'
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from 'recoil'
import * as yup from 'yup';
import { useFormik } from 'formik'

import { createDataUnit, dataUnit, getDataUnit } from 'app/store/Unit'
import { confirmDialogState, openMessage, popupState, reload } from 'app/store/Controls'
import controls from '../components'
import { pagination } from 'app/store/Pagination'
import { PostData } from 'app/services/postData'
import { isEmpty } from 'lodash'
import useTable from '../components/useTable'
import { urlCreateUnit, urlDeleteUnit, urlUpdateUnit } from 'app/utils/constant'
import { PutData } from 'app/services/putData'
import { now } from 'moment/moment'
import { getDataBranch, getDataBranchs } from 'app/store/Branchs'

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


const UnitList = () => {
    const classes = useStyles()
    const [ afterSaveForm, setAfterSaveForm ] = React.useState(false);
    const { unit } = useRecoilValue(getDataUnit)
    const {branch} = useRecoilValue(getDataBranch)
    const [valuesSearch, setValuesSearch] = React.useState('');
    const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } });
    const [createState, setCreateState] = useRecoilState(dataUnit)

    const [notif, setNotif] = useRecoilState(openMessage)
    const [confirmDialog, setConfirmDialog] = useRecoilState(confirmDialogState)
    const [popupStates, setPopupStates] = useRecoilState(popupState)
    const [reloadState, setReloadState] = useRecoilState(reload)
    const refreshData = useRecoilRefresher_UNSTABLE(getDataUnit);

    const [paginationState, setPaginationState] = useRecoilState(pagination)

    const headCells = [

        { id: 'ID', lable: 'SN', align: "left" },
        { id: 'Name', lable: 'Name', align: "left" },
        { id: 'Branch', lable: 'Branch', align: "left" },
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

            // setPopupStates({
            //     ...popupStates,
            //     openPopup: false
            // })

            if (Number(values.id) === 0) {
                //CreateData(values)
                PostData(urlCreateUnit, {
                    ...values,
                    branch_id : values.branch.id
                }).then((value) =>{
                    
                    setNotif({
                        isOpen: true,
                        message: value.message,
                        type: value.status
                    })
                    refreshData()
                })

            } else {
                const data = PutData(urlUpdateUnit, {
                    ...values,
                    branch_id : values.branch.id
                })
                data.then((value) =>{
                    
                    setNotif({
                        isOpen: true,
                        message: value.message,
                        type: value.status
                    })
                    refreshData()
                })

            }

          

            setAfterSaveForm(true)
            setFilterFn({
                fn: items => { return items = unit.data }
            })

        },
    });

    const CreateData = (data) => {
        // console.log("postData", data)
        // const postData = useRecoilValue(createDataUnit(data))
        // console.log("postData", postData)
    }

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
        //setReloadState(now())
        refreshData()
        // setReloadState(now())
        setFilterFn({
            fn: items => { return items = unit.data }
        })
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
                                    <TableCell align="left">{row.Branch.name}</TableCell>
                                    <TableCell align='center'>
                                        <controls.ActionButton
                                            color="primary"
                                            onClick={(e, value) => {
                                                formik.values.id = row.ID
                                                formik.values.name = row.Name
                                                formik.handleChange({ ...e, target: { name: 'branch', value: row.Branch } })
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
    }, [valuesSearch, notif])


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
                <CardContent>
                    {RrenderTable()}
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

                            <Box textAlign={"right"}>
                                {afterSaveForm === true &&
                                    <Button color="primary" variant="text" sx={{ mt: 5 }} onClick={() =>
                                        setPopupStates({
                                            ...popupStates,
                                            openPopup: false
                                        })
                                    }>
                                        {/* <Icon>send</Icon> */}
                                        <Span sx={{ textTransform: 'capitalize' }}>
                                            <Typography variant="button" display="block"> Close</Typography>
                                        </Span>
                                    </Button>
                                }
                                <Button color="primary" variant="text" type="submit" sx={{ mt: 5 }}>
                                    {/* <Icon>send</Icon> */}
                                    <Span sx={{ textTransform: 'capitalize' }}>
                                        <Typography variant="button" display="block">Submit</Typography>
                                    </Span>
                                </Button>
                            </Box>

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
