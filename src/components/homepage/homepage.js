import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>Welcome to Easy Tech</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Homepage;
