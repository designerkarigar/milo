import React from "react";
import { StyledCard } from "./styledComponent";

interface Iprops {
  imgSrc: any;
  heading: string;
  id: string;
}

export function Card(props?: Iprops) {
  const { imgSrc, heading } = props || {};

  return (
    <StyledCard>
      <div className="img-container">
        <img src={imgSrc} alt="" />
      </div>

      <h3>{heading}</h3>
    </StyledCard>
  );
}
