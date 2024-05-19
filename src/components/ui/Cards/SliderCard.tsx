"use client";

import CartIcon from "@/components/icons/CartIcon";
import Image from "next/image";

function SliderCard() {
  return (
    <div className="embla__slide w-full border">
      <div className="embla__slide__number items-center w-full px-10">
        <div className="w-full flex flex-col">
          <Image
            src="https://demo2.wpopal.com/pharmacy2/wp-content/uploads/2022/03/product-35-1-460x460.jpg"
            alt="dasdas"
            width={10}
            height={10}
            className="w-56 h-full self-center"
            unoptimized={true}
          />
          <div className="flex flex-col  gap-2 text-sm font-normal">
            <small className="text-slate-400">
              Medical Equipment, Uncategorized
            </small>
            <span className="text-sm">Aerodynamic Granite Gloves</span>
            <div className="flex justify-between">
              <span className="text-sm text-red-500">$218.65</span>
              <CartIcon className="w-7 h-7 text-blue-500" total={null} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SliderCard;
