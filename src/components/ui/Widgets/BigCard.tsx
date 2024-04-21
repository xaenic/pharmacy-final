import GithubIcon from "@/components/icons/GithubIcon";

function BigCard({
  color,
  title,
  Icon,
}: {
  color: string;
  title: string;
  Icon: any;
}) {
  return (
    <div className={`${color} p-5 rounded-md w-72 text-white flex flex-col `}>
      <div className="flex justify-between  mb-5">
        <h1>{title}</h1>
        <span>:</span>
      </div>
      <GithubIcon />
      <div className="flex justify-between items-center">
        <span className="mt-4 mb-3">44</span>
        <span className="mt-4 mb-3">$123,244</span>
      </div>
      <small>Last 44 days</small>
    </div>
  );
}

export default BigCard;
