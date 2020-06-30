import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

import TablePaginationActions from './TablePaginationActions';

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, attemptedTable } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {(rowsPerPage > 0
            ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : tableData
          ).map((prop, key) => {
            const style = {};
            let index;
            if(attemptedTable){
              style.backgroundColor = prop.indexOf("Fail") > -1 ? "#f58d8d" : "#7fd47f"  // set the color according to result field
              index = prop.indexOf("Fail") > -1 ? prop.indexOf("Fail") : prop.indexOf("Pass");
            }
              return (
                <TableRow key={key} className={classes.tableBodyRow} style={style}>
                    {prop.map((prop, key) => {
                      if(key !== index){
                        return (
                          <TableCell className={classes.tableCell} key={key}>
                            {prop}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
              )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              className={classes.tablePagination}
              rowsPerPageOptions={[5, 10, 25, 100]}
              colSpan={3}
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
