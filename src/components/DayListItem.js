import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

const formatSpots = (props) => {
  if (props.spots === 0) {
    return "no spots";
  }
  if (props.spots === 1) {
    return `${props.spots} spot`
  }
  return `${props.spots} spots`;
};

export default function DayListItem(props) {
  const dayClass = classNames("li", {
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)} remaining</h3>
    </li>
  );
}
