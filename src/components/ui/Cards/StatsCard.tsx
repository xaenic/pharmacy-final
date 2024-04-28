import React from "react";

function StatsCard() {
  return (
    <div className="bg-white p-4 rounded-md flex flex-col gap-4 border shadow-sm">
      <h1 className="text-lg text-gray-700 font-medium">Store Statistics</h1>
      <div className="flex justify-between">
        <div>
          <small className="text-slate-500 font-medium">Sales</small>
          <h3 className="text-gray-700 font-medium">1,750</h3>
        </div>
        <div className="bg-green-500 bg-opacity-15 p-3 flex items-center rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 14 14"
            className="text-green-600"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M13.462 9.692C13.462 12.664 10.77 14 7 14C3.23 14 .537 12.664.537 9.713c0-2.825 1.235-4.432 3.705-5.885a4.59 4.59 0 0 0 5.52-.004c2.467 1.438 3.7 3.045 3.7 5.868M8.743 3.008l1.27-1.985A.699.699 0 0 0 9.41 0H4.843a.7.7 0 0 0-.603 1.077l1.047 1.95c1.061.635 2.4.629 3.456-.019"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <small className="text-slate-500 font-medium">Customers</small>
          <h3 className="text-gray-700 font-medium">2,750</h3>
        </div>
        <div className="bg-blue-500 bg-opacity-15 p-3 flex items-center rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="text-blue-600"
          >
            <path
              fill="currentColor"
              d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7"
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <small className="text-slate-500 font-medium">Products</small>
          <h3 className="text-gray-700 font-medium">750</h3>
        </div>
        <div className="bg-rose-500 bg-opacity-15 p-3 flex items-center rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="text-rose-600"
          >
            <path
              fill="currentColor"
              d="m17.578 4.432l-2-1.05C13.822 2.461 12.944 2 12 2s-1.822.46-3.578 1.382l-.321.169l8.923 5.099l4.016-2.01c-.646-.732-1.688-1.279-3.462-2.21m4.17 3.534l-3.998 2V13a.75.75 0 0 1-1.5 0v-2.286l-3.5 1.75v9.44c.718-.179 1.535-.607 2.828-1.286l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-1.893 0-3.076-.252-3.978M11.25 21.904v-9.44l-8.998-4.5C2 8.866 2 10.05 2 11.941v.117c0 2.525 0 3.788.597 4.802c.598 1.015 1.674 1.58 3.825 2.709l2 1.049c1.293.679 2.11 1.107 2.828 1.286M2.96 6.641l9.04 4.52l3.411-1.705l-8.886-5.078l-.103.054c-1.773.93-2.816 1.477-3.462 2.21"
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <small className="text-slate-500 font-medium">Categories</small>
          <h3 className="text-gray-700 font-medium">68</h3>
        </div>
        <div className="bg-orange-500 bg-opacity-15 p-3 flex items-center rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="text-orange-600"
          >
            <path
              fill="currentColor"
              d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
