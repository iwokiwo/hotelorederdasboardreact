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
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { Box, styled, useTheme } from '@mui/system'
import { Breadcrumb, SimpleCard } from 'app/components'
import { useRecoilValue } from 'recoil'
import { Paragraph, Span } from 'app/components/Typography'
import { dataCategory } from 'app/store/Category'

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

const CategoryList = () => {
    const navigate = useNavigate()
    const {category} = useRecoilValue(dataCategory)
    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main

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
                <Title>Category</Title>
                <Button color="primary" variant="contained" onClick={()=> navigate('/material/form')}>

                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                        Add Category
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
                        {category.data.map((category, index) => (
                            <TableRow key={index} hover>
                                <TableCell
                                    colSpan={4}
                                    align="left"
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                  
                                {category.Name}
                                 
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
        </Container>
    )
}

export default CategoryList
