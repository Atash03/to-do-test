import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen bg-blue1 relative">
      <Navbar className="flex justify-between">
        {/* Logo */}
        <div className="text-white text-3xl font-serif">Doingly</div>
        {/* Btns */}
        <div className="space-x-4 flex items-center">
          <Link to="/sign">
            <button className="py-2 px-3 bg-blue2 text-white rounded-lg hover:bg-blue4 hover:text-blue1 duration-300">
              Sign up
            </button>
          </Link>
          <Link to="/protectedRoute">
            <button className="py-2 px-3 bg-blue2 text-white rounded-lg hover:bg-blue4 hover:text-blue1 duration-300">
              Login
            </button>
          </Link>
        </div>
      </Navbar>
      <div className="absolute top-[20%] text-white py-4 px-4 md:px-8 xl:px-12 md:right-[20%] lg:right-[40%]">
        <h1 className="text-4xl font-sans md:text-6xl">
          Welcome to <span className="font-serif italic ml-2">Doingly</span>
        </h1>
        <p className="font-sans text-xl md:text-2xl mt-10">
          "This app is a great way to write down a list of things to do in your
          daily life and check them off when they're done"
        </p>
        <Link to="/sign">
          <button className="py-4 px-6 bg-blue2 text-white text-xl rounded-lg hover:bg-blue4 hover:text-blue1 duration-300 mt-10">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};

export const Navbar = ({
  children,
  className,
}: {
  children: any;
  className: string;
}) => {
  return (
    <div
      className={`bg-transparent ${className} py-4 px-4 md:px-8 xl:px-12 border-b border-white`}
    >
      {children}
    </div>
  );
};

export default Home;
