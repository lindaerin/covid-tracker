import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import numeral from "numeral";
import "../styles/InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, isGrey, isGreen, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infobox ${active && "infobox--selected"}`}
    >
      <CardContent>
        {/* Title */}
        <Typography className="infoBox-title" color="textSecondary">
          {title}
        </Typography>

        {/* Number of Cases */}
        <h3
          className={`infobox-cases ${isGreen && "infobox-cases--green"} ${isGrey && "infobox-cases--grey" }`}
        >
          {cases}
        </h3>

        {/* Total */}
        <Typography className="infobox-total" color="textSecondary">
          {numeral(total).format("0,0")} Total{" "}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
