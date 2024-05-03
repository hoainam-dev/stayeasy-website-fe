import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ListView from "../components/listView/ListView";
import Filter from "../components/filter/Filter";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector, useDispatch } from "react-redux";
import {dataFilterSelector} from "../redux-tookit/selector";

// import { s } from "vite/dist/node/types.d-jgA8ss1A";
// import { set } from "date-fns";

function CategoryResult() {
  const { dataFilter, isLoading } = useSelector(dataFilterSelector);

  
  return (
    <>
      <Header page="home"></Header>
      <Filter />
      {dataFilter.length > 0 && <ListView data={dataFilter}></ListView>}

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

      {!isLoading && dataFilter.length === 0 && <h3>Không tìm thấy dữ liệu</h3>}
      <div className="fixed w-full bottom-0 z-50 bg-white">
        <Footer></Footer>
      </div>
    </>
  );
}

export default CategoryResult;
