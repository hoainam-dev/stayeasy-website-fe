import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ListView from "../components/listView/ListView";
import Filter from "../components/filter/Filter";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataHomeSelector, grouptSelector } from "../redux-tookit/selector";
import axios from "axios";
import { dataHomeSlice } from "../redux-tookit/reducer/dataHomeSlice";
import { counterSlice } from "../redux-tookit/reducer/counterSlice";
// import { s } from "vite/dist/node/types.d-jgA8ss1A";
// import { set } from "date-fns";

function Home() {
  const dispatch = useDispatch();
  const { dataHome, isLoading } = useSelector(dataHomeSelector);
  const [total, setTotal] = useState(0);
  const [size, setSize] = useState(10);

  const { reloadLike } = useSelector(grouptSelector);
  useEffect(() => {
    dispatch(dataHomeSlice.actions.getDataHomeRequest());
    axios
      .get(`http://localhost:8080/api/v1/stayeasy/property?page=0&size=${size}`)
      .then(function (response) {
        console.log("response: ", response.data.properties);
        setTotal(response.data.totalCount);
        dispatch(counterSlice.actions.totalRecord(response.data.totalCount));
        dispatch(dataHomeSlice.actions.getDataHomeSuccess(response.data.properties));
      })
      .catch(function (error) {
        dispatch(dataHomeSlice.actions.getDataHomeFailure());
      });
  }, [reloadLike,size]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [total, dataHome.length]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight / 2) {
      if (dataHome.length < total) {
        console.log("data.length: ", dataHome.length);
        setSize((prev) => prev + 8);
      }
    }
  };

  return (
    <>
      <Header page="home"></Header>
      <Filter />
      {dataHome.length > 0 && <ListView data={dataHome}></ListView>}

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

      {!isLoading && dataHome.length === 0 && <h3>Không tìm thấy dữ liệu</h3>}
      <div className="fixed w-full bottom-0 z-50 bg-white">
        <Footer></Footer>
      </div>
    </>
  );
}

export default Home;
