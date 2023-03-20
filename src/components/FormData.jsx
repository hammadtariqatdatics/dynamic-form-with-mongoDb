import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import http from "../api/Api";
import { Container, Box, Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import MuiTypography from "./MuiTypography";
import { useQuery } from "react-query";

const FormData = () => {
  const getCustomersData = () => {
    const response = http.get("/customers");
    return response;
  };
  const { data, isLoading } = useQuery("customers", getCustomersData);
  console.log(data);

  return (
    <Box sx={{ margin: "100px 0px" }}>
      <Container>
        <MuiTypography
          text="Orders Data"
          align="center"
          variant="h5"
          sx={{ marginBottom: "50px" }}
        />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell align="right">Cust-Name</TableCell>
                <TableCell align="right">Cust-Email</TableCell>
                <TableCell align="right">Cust-Address</TableCell>
                <TableCell align="right">Zip Code</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">Prod-ID</TableCell>
                <TableCell align="right">Prod-Name</TableCell>
                <TableCell align="right">Prod-Price</TableCell>
                <TableCell align="right">Prod-Quantity</TableCell>
                <TableCell align="right">Prod-Total</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <MuiTypography
                  text="No Records in a table until order is created...."
                  align="center"
                />
              ) : (
                data?.map((list) => {
                  return (
                    <TableRow
                      key={list.orderId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {list.orderId}
                      </TableCell>
                      <TableCell align="right">{list.customerName}</TableCell>
                      <TableCell align="right">{list.customerEmail}</TableCell>
                      <TableCell align="right">{list.address}</TableCell>
                      <TableCell align="right">{list.zipCode}</TableCell>
                      <TableCell align="right">{list.city}</TableCell>
                      {list?.addFields?.map((productsList, index) => {
                        return (
                          <React.Fragment key={productsList.productId}>
                            <TableCell component="th" scope="row">
                              {productsList.productId}
                            </TableCell>
                            <TableCell align="right">
                              {productsList.productName}
                            </TableCell>
                            <TableCell align="right">
                              {productsList.productPrice}
                            </TableCell>
                            <TableCell align="right">
                              {productsList.productQuantity}
                            </TableCell>
                            <TableCell align="right">
                              {productsList.productTotal}
                            </TableCell>
                          </React.Fragment>
                        );
                      })}
                      <TableCell align="right">
                        <Button variant="outlined" startIcon={<Edit />} sx={{marginBottom: "10px"}} />
                        <Button variant="outlined" startIcon={<Delete />} />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default FormData;
