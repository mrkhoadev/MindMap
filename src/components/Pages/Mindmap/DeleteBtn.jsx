"use client";
import { MdDeleteForever } from "react-icons/md";
import React from 'react';
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/providers/slice/flowsSlice";

export default function DeleteBtn({ id, deleteMindMapQuery }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    deleteMindMapQuery(id);
    dispatch(
      setIsLoading(true)
    )
  }
  return (
    <button onClick={handleDelete}><MdDeleteForever /></button>
  )
}
