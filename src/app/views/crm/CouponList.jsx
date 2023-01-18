import { Button, Card, CardContent, InputAdornment } from '@mui/material'
import { styled } from '@mui/system'
import { Breadcrumb } from 'app/components'
import React from 'react'
import { Container, CardHeader } from '../components/styleGlobal'
import controls from '../components'
import { Span } from 'app/components/Typography'

export default function CouponList() {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Coupon List', path: '/crm/coupon-list' },
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
                    // onChange={handleChange}
                    />


                    <Button color="primary" variant="contained" >

                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add Coupon
                        </Span>
                    </Button>
                </CardHeader>
                <CardContent>
                    {/* {RrenderTable()} */}
                </CardContent>
            </Card>
        </Container>
    )
}
