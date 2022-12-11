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
    Avatar, TablePagination,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { Box, styled, useTheme } from '@mui/system'
import { Breadcrumb, SimpleCard } from 'app/components'
import {useRecoilState, useRecoilValue} from 'recoil'
import { Paragraph, Span } from 'app/components/Typography'
import {dataItem as dataItems, dataProduct} from 'app/store/Item'
import ItemForm from "./ItemForm";

import { confirmDialogState, openMessage, popupState, reload } from 'app/store/Controls'
import controls from '../components'
import {paginationWithSearch} from "../../store/Pagination";

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

const ItemList = () => {
    const navigate = useNavigate()
    const {product} = useRecoilValue(dataProduct)
    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main

    const [dataItemState, setDataItemState] = useRecoilState(dataItems)

    const [notif, setNotif] = useRecoilState(openMessage)
    const [confirmDialog, setConfirmDialog] = useRecoilState(confirmDialogState)
    const [popupStates, setPopupStates] = useRecoilState(popupState)
    const [reloadState, setReloadState] = useRecoilState(reload)
    const [paginationState, setPaginationState] = useRecoilState(paginationWithSearch)

    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setPaginationState({
            ...paginationState,
            page: newPage
        })

    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
        setPaginationState({
            ...paginationState,
            size: parseInt(event.target.value, 10)
        })
    };


    const handleClickOpen = () => {
        setPopupStates({
            title: "Add Item",
            openPopup: true,
            size: "md"
        })
    }


    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Item List', path: '/item/item-list' },
                    ]}
                />
            </div>
            <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <CardHeader>
                <Title>Item</Title>
                {/*<Button color="primary" variant="contained" onClick={()=> navigate('/material/form')}>*/}
                <Button color="primary" variant="contained" onClick={handleClickOpen}>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                        Add Item
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
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Unit
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Category
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                HPP
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Price
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Stock Status
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={1}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {product.data.map((product, index) => (
                            <TableRow key={index} hover>
                                <TableCell
                                    colSpan={4}
                                    align="left"
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                    <Box display="flex" alignItems="center">
                                        <Avatar src={`${product.url}${product.path}${product.thumbnail}`} variant="rounded" />
                                        <Paragraph sx={{ m: 0, ml: 4 }}>
                                            {product.name}
                                        </Paragraph>
                                    </Box>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    colSpan={2}
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                 {product.unit.Name}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    colSpan={2}
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                 {product.category.Name}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    colSpan={2}
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                 {product.hpp}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    colSpan={2}
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                    $
                                    {product.price > 999
                                        ? (product.price / 1000).toFixed(1) +
                                        'k'
                                        : product.price}
                                </TableCell>

                                <TableCell
                                    sx={{ px: 0 }}
                                    align="left"
                                    colSpan={2}
                                >
                                    {product.stock ? (
                                        product.stock < 20 ? (
                                            <Small bgcolor={bgSecondary}>
                                                {product.stock} available
                                            </Small>
                                        ) : (
                                            <Small bgcolor={bgPrimary}>
                                                in stock
                                            </Small>
                                        )
                                    ) : (
                                        <Small bgcolor={bgError}>
                                            out of stock
                                        </Small>
                                    )}
                                </TableCell>
                                <TableCell sx={{ px: 0 }} colSpan={1}>
                                    <IconButton
                                        onClick={()=>{
                                            setDataItemState({
                                                ...product
                                            })
                                            setPopupStates({
                                                title: "Edit Item",
                                                openPopup: true,
                                                size: "md"
                                            })
                                        }}>
                                        <Icon color="primary">edit</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </ProductTable>
                <TablePagination
                    component="div"
                    count={100}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Card>
            <controls.popup>
                <ItemForm />
            </controls.popup>
            <controls.Notification />
        </Container>
    )
}

export default ItemList
