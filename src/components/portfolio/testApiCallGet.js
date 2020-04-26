import React from "react";

class TestAPICall extends React.Component {
  // Test User API Calls

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/signup")
      .then((response) => response.json())
      .then((res) => {
        console.log("Setting State");
        console.log(res);
        this.setState({ items: res });
      });
  }

  render() {
    if (this.state.items.length === 0) {
      console.log("State is empty still");
      return null;
    }
    const items = this.state.items;
    console.log("Printing Items");
    console.log(items);
    return (
      <div>
        Display API Call
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              {item.firstName}
              {item.lastName}
              {item.emailAddress}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TestAPICall;
