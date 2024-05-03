import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Filter from "../components/filter/Filter";
import axios from "axios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector, useDispatch } from "react-redux";
import ListView from "../components/listView/ListView";
import {
  counterSelector,
  dataExploreSelector,
  grouptSelector,
  keySearchSelector,
} from "../redux-tookit/selector";

function Explore() {
  const dispatch = useDispatch();
  const { reloadLike } = useSelector(grouptSelector);

  const { keySearch } = useSelector(keySearchSelector);
  const [isLoading, setIsLoading] = useState(true);
  const [dataExplore, setDataExplore] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [size, setSize] = useState(8);

  useEffect(() => {
    if (page <= totalPage) {
      setIsLoading(true);

      axios
        .get(
          `http://localhost:8080/api/v1/stayeasy/explore/search?keySearch=${keySearch}&page=${page}&size=${size}`
        )
        .then(function (response) {
          setTotalPage(() => Math.ceil(response.data.totalCount / size));
          // console.log("reload");
          setIsLoading(false);
          setDataExplore(response.data.properties);
        })
        .catch(function (error) {
          setIsLoading(true);
          console.log(error);
        });
    }
  }, [size, reloadLike]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight && page < totalPage) {
      // setPage((prev) => prev + 1);
      setSize((prev) => prev + 8);
    }
  };

  return (
    <>
      <Header page="explore"></Header>
      <Filter></Filter>
      {dataExplore?.length > 0 && <ListView data={dataExplore}></ListView>}

      {isLoading ? (
        <Stack
          sx={{ width: "100%", height: "5px", color: "grey.500" }}
          spacing={2}
        >
          <LinearProgress color="secondary" />
        </Stack>
      ) : (
        <div style={{ height: "5px" }}></div>
      )}

      {!isLoading && dataExplore?.length === 0 && (
        <h3>Không tìm thấy dữ liệu</h3>
      )}

      <Footer></Footer>
    </>
  );
}

export default Explore;
