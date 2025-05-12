/* eslint-disable no-unused-vars */
import React from "react";

function IconButton({ icon: Icon, bgColor = "#ccc", onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: "15px",
        background: bgColor,
        height: "2.5rem",
        width: "2.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 4px 4px 0px #00000040",
        cursor: "pointer",
      }}
    >
      <Icon style={{ height: "80%", width: "80%" }} />
    </div>
  );
}

export default IconButton;
