import React, { forwardRef, useImperativeHandle } from "react";
import moment from "moment";
import AllLaunches from "./AllLaunches";

const LastDateFilter = forwardRef((props, ref) => {
  const [allDateFilter, setallDateFilter] = React.useState();
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const lastDate = moment().subtract(allDateFilter, "months").toDate();
  const formatedDate = moment(lastDate).format("YYYY-MM-DD");

  useImperativeHandle(ref, () => ({
    getAlert() {
      alert("here");
      setallDateFilter(null);
    },
  }));

  return (
    <>
      <AllLaunches
        allDateFilter={allDateFilter}
        currentDate={currentDate}
        formatedDate={formatedDate}
      />
    </>
  );
});

export default LastDateFilter;
