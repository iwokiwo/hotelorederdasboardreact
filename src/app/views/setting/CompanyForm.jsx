import React from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import BussinesForm from './BussinesForm'

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

const CompanyForm = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Bussines', path: '/setting' },
                      
                    ]}
                />
            </div>
            <SimpleCard title="Business Setup">
                {/* <SimpleForm /> */}
                {<BussinesForm />}
            </SimpleCard>
            <Box py="12px" />
            <SimpleCard title="Branch Setup">
                {/* <StepperForm /> */}
            </SimpleCard>
        </Container>
    )
}

export default CompanyForm
