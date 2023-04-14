import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import allfilters from "../utils/allFilters";
import LastDateFilter from "./LastDateFilter";
import allMonths from "../utils/allMonths";
import moment from "moment";
import SpaceX from "../assets/images/spacex.png";

const FilterLaunch = () => {
  const [filters, setFilters] = React.useState("");
  const [allDateFilter, setallDateFilter] = React.useState("");
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const lastDate = moment().subtract(allDateFilter, "months").toDate();
  const formatedDate = moment(lastDate).format("YYYY-MM-DD");

  const handleChange = (event) => {
    setFilters(event.target.value);
    const baseUrl = window.location.href.split("?")[0];
    const newUrl = `${baseUrl}?filter=${event.target.value}`;
    window.history.replaceState(null, "", newUrl);
    setallDateFilter("");
  };

  const handleMonthChange = (event) => {
    setallDateFilter(event.target.value);
  };

  useEffect(() => {
    const searchParam = new URLSearchParams(document.location.search);
    const paramValue = searchParam.get("filter");
    setFilters(paramValue);
  }, [document.location.search]);
  return (
    <>
      <header>
        <img src={SpaceX} alt="" />
      </header>
      <div className="container">
        <div className="formContainer">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filters}
              label="Filter"
              onChange={handleChange}
            >
              {allfilters.map((filters) => (
                <MenuItem value={filters.slug} key={filters.id}>
                  {filters.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Date</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={allDateFilter}
              label="Filter"
              onChange={handleMonthChange}
            >
              {allMonths.map((allMonth) => (
                <MenuItem value={allMonth.id} key={allMonth.id}>
                  {allMonth.dateName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <LastDateFilter />
      </div>
    </>
  );
};

export default FilterLaunch;
