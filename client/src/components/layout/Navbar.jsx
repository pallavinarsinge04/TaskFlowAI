const Navbar = () => {

  return (

    <div className="bg-white shadow h-16 flex justify-between items-center px-8">

      <h2 className="text-2xl font-bold">

        Dashboard

      </h2>

      <div className="flex items-center gap-4">

        <img

          src="https://i.pravatar.cc/40"

          alt="avatar"

          className="rounded-full"

        />

      </div>

    </div>

  );

};

export default Navbar;