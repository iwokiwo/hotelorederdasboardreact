import React,{useState} from 'react'
import {Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme =>({
     table: {
         marginTop: theme.spacing(3),
         '& thead th':{         
             fontWeight: '600',
            //  color: theme.palette.primary.main,
            //  backgroundColor: theme.palette.primary.light,
    },
     '& tbody td': {
         fontWeight:'300',
     },
     '& tbody tr:hover': {
         backgroundColor: '#fffbf2',
         cursor: 'pointer',
     },
     
     }
}))

export default function useTable(records,headCells,filterFn) {
    const classes = useStyles();
    const pages =[5 ,10 , 25, 50, 100]
    const [page,setPage] = useState(0);
    const [rowsPerPage,setRowsPerPage] = useState(pages[page])
    const [order,setOrder] = useState()
    const [orderBy,setOrderBy] = useState()
    const TblContainer = props => (
        <Table className={classes.table}>

            {props.children}

        </Table>
    )
   // console.log("headCells",headCells)
    const TblHead = props => {
        const handleSortRequest = cellId=>{
            const isAsc = orderBy === cellId && order ==="asc";
            setOrder(isAsc?'desc':'asc')
            setOrderBy(cellId)
        }
        return (
            <TableHead>
                <TableRow>
                    {
                        headCells.map(headCell => (
                        <TableCell key={headCell.id}
                        align = {headCell.align}
                        sortDirection={orderBy === headCell.id ? order:false}>
                            {headCell.disableSorting?headCell.lable:
                            <TableSortLabel
                            direction = {orderBy === headCell.id ? order:'asc'}
                            onClick={ () =>{handleSortRequest(headCell.id)}}>
                                {headCell.lable}
                            </TableSortLabel>}
                        </TableCell>))
                    }
                </TableRow>
            </TableHead> 
        )
    }

    const handleChangePage = (event,newPage) =>{
        setPage(newPage);
        console.log("newPage",newPage)
    }
    const handleChangeRowPerPage = event =>{
        setRowsPerPage(parseInt(event.target.value,10));
        setPage(0);
        console.log("row per page",rowsPerPage)
    }

    const TblPagination = () =>(<TablePagination
        component="div"
        page={page}
        rowsPerPageOptions = {pages}
        rowsPerPage={rowsPerPage}
        //count={records.length}
        count={filterFn.fn(records).length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowPerPage}
    />)
    function tableSort(array, comparator){
        const stabilizedThis = array.map((el, index)=>[el, index]);
        stabilizedThis.sort((a,b)=>{
            const order = comparator(a[0], b[0]);
            if (order !==0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    function getComparator(order,orderBy){
        return order === 'desc'
            ? (a,b) => descendingComparator(a,b,orderBy)
            : (a,b) => -descendingComparator(a,b,orderBy);
    }
    function descendingComparator(a,b,orderBy){
        if(b[orderBy] < a[orderBy]){
            return -1;
        }
        if(b[orderBy] > a[orderBy]){
            return 1;
        }
        return 0;
    }
    const recordsAfterPagingAndSort = () =>{
         return tableSort(filterFn.fn(records),getComparator(order,orderBy))
            .slice(page*rowsPerPage,(page+1)*rowsPerPage)
    }
    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSort
    }
}
