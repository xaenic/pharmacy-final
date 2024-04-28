import GithubIcon from "@/components/icons/GithubIcon";

function BasicCard({
  title,
  count,
  percent,
}: {
  title: string;
  count: string;
  percent: string;
}) {
  return (
    <div className="border bg-white shadow-sm  rounded-md p-4">
      <div className="flex flex-col gap-3">
        <h1 className="text-sm font-medium text-gray-700">{title}</h1>
        <p>{count}</p>
        <div className="text-xs">
          <span className="text-green-500">{percent}</span>
          <span className="text-slate-500"> vs. last week</span>
        </div>
      </div>
    </div>
  );
}

export default BasicCard;
