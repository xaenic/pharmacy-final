import React from "react";

function PatternBackground() {
  const num = 60;
  return (
    <>
      <div className="w-[790px] grid grid-cols-12 ">
        {[...Array(num)].map((column: number, columnIndex: number) => (
          <div
            key={columnIndex}
            className="flex flex-col justify-evenly text-black"
          >
            {[...Array(num)].map((row: number, rowIndex: number) => {
              // Calculate opacity based on distance from the center
              const distanceToCenter =
                Math.abs(columnIndex - 5.5) + Math.abs(rowIndex - 5.5);
              const opacity = Math.min(1, distanceToCenter * 0.1);

              return (
                <div
                  key={rowIndex}
                  style={{ opacity }}
                  className="h-[60px] rounded-md rounde-t-md bg-white border-gray-100 border transition-opacity duration-500 ease-in-out"
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default PatternBackground;
