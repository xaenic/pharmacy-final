import React from "react";

function DeleteIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        d="M7.615 20q-.67 0-1.143-.472Q6 19.056 6 18.385V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.152T16.385 20zM17 6H7v12.385q0 .269.173.442t.442.173h8.77q.23 0 .423-.192t.192-.423zM9.808 17h1V8h-1zm3.384 0h1V8h-1zM7 6v13z"
      />
    </svg>
  );
}

export default DeleteIcon;
