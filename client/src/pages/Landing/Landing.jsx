import Navbar from "../../components/layout/Navbar";

const Landing = () => {
  return (
    <>

      <Navbar/>

      <section className="h-[90vh] flex flex-col justify-center items-center bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white">

        <h1 className="text-6xl font-bold">

          Manage Projects Smarter

        </h1>

        <p className="mt-6 text-xl">

          Real-Time Collaborative Project Management with AI

        </p>

        <div className="mt-10 flex gap-5">

          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold">

            Get Started

          </button>

          <button className="border border-white px-8 py-3 rounded-lg">

            Watch Demo

          </button>

        </div>

      </section>

    </>
  );
};

export default Landing;