import GithubIcon from "@/components/icons/GithubIcon";

function BigCard({
  color,
  title,
  Icon,
  total,
}: {
  color: string;
  title: string;
  Icon: any;
  total: any;
}) {
  return (
    <div className={`${color} p-5 rounded-md w-72 flex flex-col `}>
      <div className="flex justify-between  mb-5 text-white ">
        <h1>{title}</h1>
        <span>:</span>
      </div>
      {Icon}
      <div className="flex justify-between text-white  items-center">
        <span className="mt-4 mb-3">{total}</span>
        <span className="mt-4 mb-3"></span>
      </div>
      <small className="text-white ">Last 14 days</small>
    </div>
  );
}

export default BigCard;
