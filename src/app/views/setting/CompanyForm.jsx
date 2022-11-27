import React, {useEffect} from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import BussinesForm from './BussinesForm'
import {useRecoilState, useRecoilValue} from "recoil";
import {dataStore, getDataStore, setDataStore} from "app/store/Store";
import {reload} from "../../store/Controls";
import {isEmpty} from "lodash";
import BranchList from "./BranchList";

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
    const { data } = useRecoilValue(getDataStore)

    const [dataStoreState, setDataStoreState] = useRecoilState(dataStore)

    useEffect(() => {
        setDataStoreState({...data.data[0]})
    }, [])

    useEffect(() => {
        setDataStoreState({...data.data[0]})
    }, [data])

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
                {<BussinesForm />}
            </SimpleCard>
            <Box py="12px" />
            <SimpleCard title="Branch Setup">
               <BranchList />
            </SimpleCard>
        </Container>
    )
}

export default CompanyForm
