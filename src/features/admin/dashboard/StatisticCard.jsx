function StatisticCard({ icons, title, value, color }) {
  return (
    <div className="py-8 px-12 flex gap-8 mt-4 items-center rounded-md bg-white">
      <div
        className=" w-fit p-4 rounded-full"
        style={{ backgroundColor: color }}
      >
        {icons}
      </div>
      <div className="">
        <p className="text-[#6B7280] text-base md:xl">{title}</p>
        <p className="text-xl md:2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default StatisticCard;
