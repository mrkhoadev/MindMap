"use client";
import { MdDeleteForever } from "react-icons/md";
import React from 'react';
import { setIsLoading } from "@/providers/slice/flowsSlice";
import { useDispatch } from "react-redux";

export default function DeleteBtn({ id, deleteMutation }) {

  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(
      setIsLoading(true)
    )
    deleteMutation(id);
  }

  return (
    <button onClick={handleDelete}><MdDeleteForever /></button>
  )
}
