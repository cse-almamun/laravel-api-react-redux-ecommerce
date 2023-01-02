import React, { Fragment } from "react";
import TopNavbar from "../../Coponents/Header/TopNavbar";
import LatestProducts from "../../Coponents/Product/LatestProducts";
import Footer from "../../Coponents/Footer/Footer";
function Home() {
  return (
    <Fragment>
      <TopNavbar />
      <LatestProducts />
      <Footer />
    </Fragment>
  );
}

export default Home;
