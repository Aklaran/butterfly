import Trick from "@/models/trick";
import React from "react";

function TrickCard({ trick }: {trick: Trick}) {
  return (
    <div className="wrapper"><h1>{trick.name}</h1><p>{trick.category}</p></div>
  )
}

export default TrickCard;