import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopIndexes from "../stocks/TopIndexes";
import WatchListLoad from "../stocks/watchlistComponents/WatchlistLoad";
export default function Homepage() {
  return (
    <div>
      <Container component="main">
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
