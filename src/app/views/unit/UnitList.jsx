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
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogContentText from '@mui/material/DialogContentText'

import { useNavigate } from 'react-router-dom'

import { Box, styled, useTheme } from '@mui/system'
import { Breadcrumb, SimpleCard } from 'app/components'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Paragraph, Span } from 'app/components/Typography'
import { dataUnit } from 'app/store/Unit'
import { openMessage } from 'app/store/Controls'
import controls from '../components'

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


const UnitList = () => {
    const navigate = useNavigate()
    const {unit} = useRecoilValue(dataUnit)
    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main
    const [open, setOpen] = React.useState(false)
    const [notif, setNotif] = useRecoilState(openMessage)
    //const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const theme = useTheme()

    
    function handleClickOpen() {
        console.log("unit")
        setOpen(true)
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
                        { unit.data.map((data, index) => (
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

        <Dialog
                //fullScreen={fullScreen}
                fullWidth="true"
                maxWidth="sm"
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"New Unit"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    <Grid container spacing={12}>
                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                            fullWidth="true"
                            type="text"
                            name="username"
                            id="standard-basic"
                            // onChange={handleChange}
                            // value={username || ''}
                            validators={[
                                'required',
                                'minStringLength: 4',
                                'maxStringLength: 9',
                            ]}
                            label="Username (Min length 4, Max length 9)"
                            errorMessages={['this field is required']}
                        />
                        </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cencel
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
{/* 
            <Snackbar open={openMessages} autoHideDuration={6000} onClose={handleCloseMassage}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    This is a success message!
                </Alert>
            </Snackbar> */}
            <controls.Notification />
        </Container>
    )
}

export default UnitList
