"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./DotButton";
import { PrevButton, NextButton, usePrevNextButtons } from "./ArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import "./embla.css";
import SliderCard from "../Cards/SliderCard";
type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const Slider: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla mt-10">
      <div className="embla__viewport border-l border-r" ref={emblaRef}>
        <div className="embla__container ">
          {slides.map((index) => (
            <SliderCard key={index} />
          ))}
        </div>
      </div>

      <div className="embla__controls justify-between">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots"></div>
      </div>
    </section>
  );
};

export default Slider;
