"use client";
import { setIsLoading } from '@/providers/slice/flowsSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function DeleteSelectedBtn(
        {
          deleteSelectedMutation,
        }
    ) 
{
    const mindMapList = useSelector((state) => state.flowsSlice.mindMapList);
    const dispatch = useDispatch();
    
    const handleDeleteAll = () => {
        const selectedId = mindMapList.map(
            (item) => {
                if (item.selected) 
                {
                    return item.id;
                }
                return null;
            }
        ).filter((i) => i);
        deleteSelectedMutation(selectedId);
        dispatch(
            setIsLoading(true)
        )
    }

  return (
    <button onClick={handleDeleteAll} className='p-2 w-full bg-red-600 rounded-md font-semibold text-[#fff] hover:bg-red-500'>Xóa</button>
  )
}
