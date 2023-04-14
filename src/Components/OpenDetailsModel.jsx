import {
  Box,
  Container,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import boxModelTable from "../utils/boxModelTable";
import { BsWikipedia } from "react-icons/bs";
import { GrArticle } from "react-icons/gr";
import { AiOutlineYoutube } from "react-icons/ai";
import axios from "axios";

const OpenDetailsModel = ({ id, open, handleClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [launchData, setlaunchData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.spacexdata.com/v3/launches/${id}`)
      .then((response) => setlaunchData(response.data))
      .catch((err) => console.log(err));
  }, [id]);

  const newLaunchData = [
    {
      id: 1,
      data: launchData?.flight_number,
    },
    {
      id: 2,
      data: launchData?.mission_name,
    },
    {
      id: 3,
      data: launchData?.rocket?.rocket_type,
    },
    {
      id: 4,
      data: launchData?.rocket?.rocket_name,
    },
    {
      id: 5,
      data: launchData?.rocket?.second_stage?.payloads[0].manufacturer,
    },
    {
      id: 6,
      data: launchData?.rocket?.second_stage?.payloads[0].nationality,
    },
    {
      id: 7,
      data: launchData?.launch_date_utc,
    },
    {
      id: 8,
      data: launchData?.rocket?.second_stage.payloads[0].payload_type,
    },
    {
      id: 9,
      data: launchData?.launchData?.rocket.second_stage.payloads[0].orbit,
    },
    {
      id: 10,
      data: launchData?.launch_site?.site_name,
    },
  ];

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container sx={{ display: "flex" }}>
            <img
              src={launchData?.links?.mission_patch_small}
              alt=""
              height={"100px"}
            />
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                gap: "10px",
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ fontSize: "20px" }}
              >
                {launchData?.mission_name}
                &nbsp;&nbsp;&nbsp;
                <Container
                  sx={
                    launchData?.launch_success
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
                  {launchData?.launch_success ? "Success" : "Failed"}
                </Container>
              </Typography>
              <Typography
                id="modal-modal-description"
                variant="h6"
                component="h2"
                sx={{ fontSize: "16px" }}
              >
                {launchData?.rocket?.rocket_name}
              </Typography>
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                  gap: "10px",
                  fontSize: "16px",
                  cursor: "pointer",
                  paddingLeft: "0px",
                }}
              >
                <a href={launchData?.links?.article_link} target="_blank">
                  <GrArticle />
                </a>
                <a href={launchData?.links?.wikipedia} target="_blank">
                  <BsWikipedia />
                </a>
                <a href={launchData?.links?.video_link} target="_blank">
                  <AiOutlineYoutube />
                </a>
              </Container>
            </Container>
          </Container>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            {launchData?.details}{" "}
            <a href={launchData?.links?.wikipedia} target="_blank">
              Wikipedia
            </a>
          </Typography>

          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table aria-label="simple table">
              <TableBody>
                {newLaunchData.map((newLaunch, index) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{boxModelTable[index]?.name}</TableCell>
                    <TableCell>{newLaunch?.data}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};

export default OpenDetailsModel;
