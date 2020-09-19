import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import TableFooter from '@material-ui/core/TableFooter';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/actions/productsActions'

import './Dashboard.css'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

//{ id: 0, name: 'Lego', description: 'Good Toy for Everyone', categoryId: 2, price: 500 },
function Row(props) {
  const { row, transactions } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.id}</TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right">{row.categoryId}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Transactions
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow style={{ backgroundColor: '#AAAAFF' }}>
                    <TableCell>Type</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((historyRow) => (
                    <TableRow key={historyRow.date} style={{ backgroundColor: historyRow.type === 'in' ? '#AAFFAA' : '#FFAAAA'}}>
                      <TableCell>{historyRow.type}</TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.user}</TableCell>
                      <TableCell align="right">{historyRow.currentItem.quantity}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.currentItem.quantity * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Dashboard() {
  const rows = useSelector(state => state.products.list)
  const loading = useSelector(state => state.products.loading)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <div className="TableContainer">
        <TableContainer component={Paper} style={{backgroundColor: '#FAFAFA'}}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow style={{ backgroundColor: '#AAFFAA' }}>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Price&nbsp;($)</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => {
                return (<Row key={row.name} row={row} transactions={row.transactions} />)
            })}
            </TableBody>
            <TableFooter style={{ margin: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>       
                {loading && (<CircularProgress />)}
            </TableFooter>
        </Table>
        </TableContainer>
    </div>
  );
}
