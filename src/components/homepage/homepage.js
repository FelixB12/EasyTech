import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WatchList from "../stocks/watchList";
import TopIndexes from "./../stocks/topIndexes";

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <TopIndexes />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Homepage;
