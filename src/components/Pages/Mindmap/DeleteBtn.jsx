"use client";
import { MdDeleteForever } from "react-icons/md";
import React from 'react';
import { setIsLoading } from "@/providers/slice/flowsSlice";
import { useDispatch } from "react-redux";

export default function DeleteBtn({ id, deleteMutation }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (typeof document !== 'undefined') {
      const {confirm, error} = await import('alertifyjs');
      confirm("Xóa MindMap này?","Bạn có chắc chắn muốn xóa MindMap này không?",
      function(){
        dispatch(
          setIsLoading(true)
        )
        deleteMutation(id);
      },
      function(){
        error('Đã hủy!');
      });
    }
  }

  return (
    <button onClick={handleDelete}><MdDeleteForever /></button>
  )
}
