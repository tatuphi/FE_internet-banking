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
                <img src='/instagram_profile_image.png' alt='lo' style={{ width: '100%', height: '100%' }} />
              </div>
          }

        </div>

      </div>
    );
  }
}

export default Home;
