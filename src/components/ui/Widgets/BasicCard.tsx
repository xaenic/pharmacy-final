import GithubIcon from "@/components/icons/GithubIcon";

function BasicCard() {
  return (
    <div className="flex items-center bg-white p-5 gap-4 rounded-md">
      <GithubIcon />
      <div className="flex flex-col gap-2 items-end text-sm">
        <span>146 Sales</span>
        <span className="text-xs">Out of 500</span>
      </div>
    </div>
  );
}

export default BasicCard;
