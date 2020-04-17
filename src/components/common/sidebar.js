import React from "react";
import Nav from "react-bootstrap/Nav";
import ListGroup from "react-bootstrap/ListGroup";

class Sidebar extends React.Component {
  render() {
    return (
      // TODO Change this to a good looking side bar
      <div>
        <Nav className="flex-column">
          <Nav.Link href="https://www.bloomberg.com/" target="_blank">
            Bloomberg News
          </Nav.Link>
          <Nav.Link href="https://www.businessinsider.com/" target="_blank">
            Business Insider
          </Nav.Link>
        </Nav>
      </div>
    );
  }
}

export default Sidebar;
