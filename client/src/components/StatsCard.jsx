const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      <h1 className="text-4xl font-bold mt-3">
        {value}
      </h1>

    </div>
  );
};

export default StatsCard;