import React from 'react'
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
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Paragraph, Span } from 'app/components/Typography'
import { Box, styled, useTheme } from '@mui/system'

import { Breadcrumb, SimpleCard } from 'app/components'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as yup from 'yup';
import { useFormik } from 'formik'

import { dataUnit } from 'app/store/Unit'
import { openMessage, popupState } from 'app/store/Controls'
import controls from '../components'


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
    const { unit } = useRecoilValue(dataUnit)
    const [open, setOpen] = React.useState(false)
    const [notif, setNotif] = useRecoilState(openMessage)
    const [popupStates, setPopupStates] = useRecoilState(popupState)


    const formik = useFormik({
        initialValues: {
        //   name: edit == undefined ? '':edit.name,
        //   id: edit == undefined ? '':edit.id,

          name: "",
          id: " ",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          console.log(values.name)
         // addKategori(values)
          //alert(JSON.stringify(values, null, 2));
        },
      });


    const handleClickOpen = () => {
        setPopupStates({
            title: "Add Unit",
            openPopup: true,
            size: "sm"
        })
    }

    function handleClose() {
        setOpen(false)
        setNotif({
            isOpen: true,
            message: "Success",
            type: 'success'
        })
    }
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Unit List', path: '/unit/unit-list' },
                    ]}
                />
            </div>

            <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
                <CardHeader>
                    <Title>Unit</Title>
                    <Button color="primary" variant="contained" onClick={handleClickOpen}>

                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add Unit
                        </Span>
                    </Button>
                </CardHeader>
                <Box overflow="auto">
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
                            {console.log("lewat sini lagi")}
                            {unit.data.map((data, index) => (
                                <TableRow key={index} hover>
                                    <TableCell
                                        colSpan={4}
                                        align="left"
                                        sx={{ px: 0, textTransform: 'capitalize' }}
                                    >

                                        {data.Name}

                                    </TableCell>

                                    <TableCell sx={{ px: 0 }} colSpan={1}>
                                        <IconButton>
                                            <Icon color="primary">edit</Icon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </ProductTable>
                </Box>
            </Card>

            <controls.Notification />
            
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
                      

                        </Grid>
                </Grid>
                </form>
            </controls.popup>
        </Container>
    )
}

export default UnitList
