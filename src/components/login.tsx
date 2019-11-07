import React from "react";
import {} from "reactstrap";

export class Login extends React.Component<{}, {}> {
  halo = (halo: string) => {
    console.log(halo);
  };
  render() {
    return (
      <a>
        <button onClick={() => this.halo("logujem sa")}>github.com</button>
      </a>
    );
  }
}

export default Login;
