import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import tableHead from "../utils/allLaunchesHead";
import axios from "axios";
import OpenDetailsModel from "./OpenDetailsModel";
import moment from "moment";

const AllLaunches = ({ allDateFilter }) => {
  const [allLaunches, setAllLaunches] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [filterValues, setFilterValues] = useState("");
  const [sendLaunchData, setsendLaunchData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const searchParam = new URLSearchParams(document.location.search);
    const paramValue = searchParam.get("filter");

    setFilterValues(paramValue);
  }, [document.location.search]);

  useEffect(() => {
    const currentDate = moment(new Date()).format("YYYY-MM-DD");
    const lastDate = moment().subtract(allDateFilter, "months").toDate();
    const formatedDate = moment(lastDate).format("YYYY-MM-DD");
    setAllLaunches([]);
    setIsLoading(true);
    const criteria = false;
    axios
      .get(
        `https://api.spacexdata.com/v3/launches?start=${currentDate}&end=${formatedDate}`
      )
      .then((response) => {
        setAllLaunches(
          response.data.filter((item) => item?.launch_success === criteria)
        );
      })
      .catch((error) => console.log(error));
    setIsLoading(false);
  }, [allDateFilter]);

  useEffect(() => {
    if (filterValues === "upcoming") {
      setAllLaunches([]);
      setIsLoading(true);
      axios
        .get(`https://api.spacexdata.com/v3/launches/upcoming`)
        .then((response) => setAllLaunches(response.data))
        .catch((error) => console.log(error));
      setIsLoading(false);
      setIsLoading(false);
    } else if (filterValues === "successfull") {
      setAllLaunches([]);
      setIsLoading(true);
      const criteria = true;
      axios
        .get(`https://api.spacexdata.com/v3/launches`)
        .then((response) => {
          setAllLaunches(
            response.data.filter((item) => item?.launch_success === criteria)
          );
        })
        .catch((error) => console.log(error));
      setIsLoading(false);
    } else if (filterValues === "Failed") {
      setAllLaunches([]);
      setIsLoading(true);
      const criteria = false;
      axios
        .get(`https://api.spacexdata.com/v3/launches`)
        .then((response) => {
          setAllLaunches(
            response.data.filter((item) => item?.launch_success === criteria)
          );
        })
        .catch((error) => console.log(error));
      setIsLoading(false);
    } else {
      setAllLaunches([]);
      setIsLoading(true);
      axios
        .get(`https://api.spacexdata.com/v3/launches`)
        .then((response) => setAllLaunches(response.data))
        .catch((error) => console.log(error));
      setIsLoading(false);
    }
  }, [filterValues]);
  return (
    <div>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <TableContainer sx={{ maxHeight: "100%" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead sx={{ backgroundColor: "#000" }}>
              <TableRow>
                {tableHead.map((head) => (
                  <TableCell key={head.id}>{head.name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            {isLoading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableBody>
                {allLaunches
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((launches) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={launches?.flight_number}
                        onClick={() => {
                          handleOpen();
                          setsendLaunchData(launches);
                        }}
                      >
                        <TableCell>{launches?.flight_number}</TableCell>
                        <TableCell>{launches?.launch_date_utc}</TableCell>
                        <TableCell>{launches?.launch_site.site_name}</TableCell>
                        <TableCell>{launches?.mission_name}</TableCell>
                        <TableCell>
                          {launches?.rocket.second_stage.payloads[0].orbit}
                        </TableCell>
                        <TableCell>
                          <Container
                            sx={
                              launches?.launch_success
                                ? {
                                    backgroundColor: "#F7F7F7",
                                    color: "green",
                                    textAlign: "center",
                                    borderRadius: "30px",
                                  }
                                : {
                                    backgroundColor: "#FDE2E1",
                                    color: "red",
                                    textAlign: "center",
                                    borderRadius: "30px",
                                  }
                            }
                          >
                            {launches?.launch_success ? "Success" : "Failed"}
                          </Container>
                        </TableCell>
                        <TableCell>{launches?.rocket.rocket_name}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={allLaunches.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <OpenDetailsModel
        id={sendLaunchData?.flight_number}
        open={open}
        handleClose={() => handleClose()}
      />
    </div>
  );
};

export default AllLaunches;
