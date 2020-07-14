import React, { Component } from "react";

import VerticalMenu from "containers/Share/VerticalMenu";


class Home extends Component {
  render() {
    const isLogin = localStorage.getItem("isAuth");
    return (
      <div >

        <div className="commom"


        >
          {
            isLogin ? <VerticalMenu />
              : <div>

              </div>
          }

        </div>

      </div>
    );
  }
}

export default Home;
