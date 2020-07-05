import React, { useState } from "react";
import { ResearchType } from "../../../research";

interface Props {
  type: ResearchType;
}

export const ResearchLine = ({ type }: Props) => {
  return (
    <div className="research-line">
      <div className="research-label"> {type.label}</div>
      <div className="research-items-container">
        {Array.from(Array(10).keys()).map(item => (
          <div className="research-item"></div>
        ))}
      </div>
    </div>
  );
};
