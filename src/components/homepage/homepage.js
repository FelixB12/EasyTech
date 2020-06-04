import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WatchList from "../stocks/watchlistComponents/watchList";
import TopIndexes from "./../stocks/topIndexes";
import WatchListLoad from "../stocks/watchlistComponents/watchListLoad";
class Homepage extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <TopIndexes />
              <WatchListLoad />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Homepage;
