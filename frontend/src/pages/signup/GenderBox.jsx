import React from "react";

const GenderBox = ({ handleChange, currValue }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Female</span>
          <input
            type="radio"
            name="gender"
            className="radio checked:bg-green-300"
            onChange={handleChange}
            value="female"
            checked={currValue === "female"}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Male</span>
          <input
            type="radio"
            name="gender"
            className="radio checked:bg-green-300"
            onChange={handleChange}
            value="male"
            checked={currValue === "male"}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderBox;