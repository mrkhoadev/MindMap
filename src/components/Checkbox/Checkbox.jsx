"use client";
import React from "react";
import "./Checkbox.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedGroup } from "@/providers/slice/flowsSlice";
export default function Checkbox({ selected = false, id = 'all' }) {
  const dispatch = useDispatch();
  const checkAll = useSelector((state) => state.flowsSlice.checkAll)
  const handleOnChange = () => {
    dispatch(changeSelectedGroup({ id, selected: !selected }))
  }

 
  return (
    <div className="container flex justify-center items-center">
      <input
        style={{ display: "none" }}
        id={"cbx-" + id}
        className="cbx"
        type="checkbox"
        onChange={handleOnChange}
        checked={id === "all" ? checkAll : selected}
      />
      <label className="check" htmlFor={"cbx-" + id}>
        <svg viewBox="0 0 18 18" height="18px" width="18px">
          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
      </label>
    </div>
  );
}
