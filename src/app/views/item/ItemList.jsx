import React, { useEffect } from 'react'
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
    Avatar, TablePagination, InputAdornment, Stack,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { Box, styled, useTheme } from '@mui/system'
import { Breadcrumb, SimpleCard } from 'app/components'
import {now} from "moment";

import {useRecoilCallback, useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue} from 'recoil'
import { Paragraph, Span } from 'app/components/Typography'
import {dataItem as dataItems, dataProduct} from 'app/store/Item'
import ItemForm from "./ItemForm";

import { confirmDialogState, openMessage, popupState, reload } from 'app/store/Controls'
import controls from '../components'
import {paginationWithSearch} from "../../store/Pagination";
import { urlDeleteItem } from 'app/utils/constant';
import { DeleteData } from 'app/services/deteleData';

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
    const refreshDataProduct = useRecoilRefresher_UNSTABLE(dataProduct);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search, setSearch] = React.useState('')
    const [afterSave, setAfterSave] = React.useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setPaginationState({
            ...paginationState,
            page: newPage
        })

    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        setPaginationState({
            ...paginationState,
            size: parseInt(event.target.value, 10)
        })
    };

    const handleSearch = (e) =>{
        let target = e.target;
        setSearch(target.value)
        if (e.key === 'Enter') {
            setPaginationState({
                ...paginationState,
                search: target.value
            })
          }

    }

    const handleSearchButton = () =>{

            setPaginationState({
                ...paginationState,
                search: search
            })
          

    }


    const handleClickOpen = () => {
        setPopupStates({
            title: "Add Item",
            openPopup: true,
            size: "md"
        })
        setDataItemState({
            id: 0,
            name: "",
            thumbnail: "",
            thumbnailOld: "",
            url:"",
            path:"",
            price: 0,
            quantity: 0,
            active: 1,
            description: "",
            sale_price: 0,
            category_id: 0,
            unit_id: 0,
            branch_id:0,
            category: {ID: 0, Name:''},
            unit: {ID: 0, Name:''},
            branch: {id: 0, name:''},
            gallery:[],
            multiFileDelete:[],
            multiFile:[],
        })
    }
    
    const onDelete = (values) => {
        DeleteData(urlDeleteItem, values).then((value) => {
            setNotif({
                isOpen: true,
                message: value.message,
                type: value.status
            })
            //refreshDataProduct()
            setPaginationState({
                ...paginationState,
                search: ''
            })
        })

    }

    const renderTable = () => {
        return(
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
                        Sale Price
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
                         {product.sale_price}
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
                            {product.quantity ? (
                                product.quantity < 20 ? (
                                    <Small bgcolor={bgSecondary}>
                                        {product.quantity} available
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
                                        ...product,
                                        thumbnailOld: product.thumbnail,
                                        multiFileDelete: product.gallery
                                    })
                                    setPopupStates({
                                        title: "Edit Item",
                                        openPopup: true,
                                        size: "md"
                                    })
                                }}>
                                <Icon color="primary">edit</Icon>
                            </IconButton>


                            <IconButton
                                color="primary"
                                onClick={() => {
                                    setConfirmDialog({
                                        isOpen: true,
                                        title: `Are you sure to delete ${product.name} ?`,
                                        subTitle: "You can't undo this operation",
                                        onConfirm: () => { 
                                            setConfirmDialog({
                                                ...confirmDialog,
                                                isOpen: false
                                            })
                                            onDelete(product) 
                                        }
                                    })
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </ProductTable>
        )
    }

    useEffect(() => {
       
        if (afterSave == true) {
          
            setAfterSave(false)
           // refreshDataProduct()
            setPaginationState({
                ...paginationState,
                search: ''
            })
        }
    }, [afterSave]);



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
                {/* <Title>Item</Title> */}
                {/*<Button color="primary" variant="contained" onClick={()=> navigate('/material/form')}>*/}
                    <Box>
                        <Stack direction="row" spacing={2}>
                            <controls.Input
                                name="cariProduk"
                                label="Search"
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start">
                                    </InputAdornment>)
                                }}
                                onKeyDown={handleSearch}
                            />
                            <Button color="primary" variant="contained" onClick={handleSearchButton}>
                                <SearchIcon />
                            </Button>
                        </Stack>

                </Box>
           
                <Button color="primary" variant="contained" onClick={handleClickOpen}>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                        Add Item
                    </Span>
                </Button>
            </CardHeader>
            <Box overflow="auto">
               {renderTable()}
                <TablePagination
                    component="div"
                    count={product.total}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Card>
            <controls.popup>
                <ItemForm setAfterSave= {setAfterSave}/>
            </controls.popup>
            <controls.Notification />
            <controls.ConfirmDialog />
        </Container>
    )
}

export default ItemList
