import Row from "../row/Row";

function ListView({ data }) {
  

  return (
    <div className="main">
      <Row property={data} />
    </div>
  );
}

export default ListView;
