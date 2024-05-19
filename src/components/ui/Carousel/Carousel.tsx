"use client";
import useEmblaCarousel from "embla-carousel-react";

import Image from "next/image";
import "./Carousel.css";
import Link from "next/link";
import { Button, ButtonGroup } from "@nextui-org/button";
const EmblaCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="carousel">
      <div className="carousel__viewport" ref={emblaRef}>
        <div className="carousel__container">
          <div className="carousel__slide w-full">
            <div className="w-full">
              <div className="bg-[#7bdcb5] w-full h-[40vh] md:h-[80vh] bg-no-repeat relative">
                {/* Background Image */}
                <div className="absolute flex items-end z-10 bottom-0 h-full w-full ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                  >
                    <path
                      fill="#037971"
                      fillOpacity="1"
                      d="M0,256L40,218.7C80,181,160,107,240,112C320,117,400,203,480,202.7C560,203,640,117,720,74.7C800,32,880,32,960,58.7C1040,85,1120,139,1200,133.3C1280,128,1360,64,1400,32L1440,0L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                    ></path>
                  </svg>
                </div>

                {/* Content in front of the background */}
                <div className="z-40 text-white text-lg md:text-2xl absolute  px-5 lg:px-20 flex  items-center  w-full h-full">
                  <div className="pl-2 grid md:grid-cols-2 w-full">
                    <div className="justify-center flex flex-col gap-2">
                      <small className="text-sm">FROM MEDICOVI STORE</small>
                      <p className="font-bold text-4xl mb-4">
                        Blood Pressure Monitor
                      </p>
                      <small className="text-sm">
                        Get Free Shipping On All order over 9,000 Php
                      </small>

                      <h2>Only $99.99</h2>
                      <div>
                        <Link href={`/`} className="">
                          <Button
                            className="bg-white text-gray-700"
                            color="primary"
                          >
                            Shop now
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="hidden justify-end md:flex">
                      <div className="relative">
                        <Image
                          src="/images/product_1.png"
                          alt="Prodcut 1"
                          width={130}
                          height={130}
                          className="w-full h-full rounded-md self-end"
                          unoptimized={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
