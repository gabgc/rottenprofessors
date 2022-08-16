import type { NextPage } from "next";
import Navbar from "../components/navbar";

const Home: NextPage = () => {
  // return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
  return (
    <div>
      <Navbar></Navbar>
      rest of the page
    </div>
  );
};

export default Home;
