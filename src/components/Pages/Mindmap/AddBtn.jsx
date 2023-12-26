"use client";
import React from 'react';
import { ISOextractDateTime } from '@/helpers/ExtractDateTime';
// import { useSession } from 'next-auth/react';
import { nanoid } from 'nanoid/non-secure';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '@/providers/slice/flowsSlice';

export default function AddBtn({postMindMap, email}) {
  const newId = nanoid();
  // const session = useSession();
  const dispatch = useDispatch()

  const handleAdd = () => {
    const time = new Date();
    const newMindMap = {
      mindMapId: newId,
      name: "MindMap không có tên",
      description: "Chưa có mô tả",
      map: {
        nodes: [{
          id: 'root',
          data: {label: 'My Mindmap'},
          position: {x: 0, y: 0},
          type: "title"
        }],
        edges: []
      },
      isAccessible: false,
      userEmail: email,
      create_at: ISOextractDateTime(time),
    }
    postMindMap(newMindMap);
    dispatch(
      setIsLoading(true)
    )
  }

  return (
    <div className='h-[60px] flex justify-start items-center'>
      <button onClick={handleAdd} 
              className='text-300 rounded-lg bg-blue-500 py-2 px-6 w-fit shadow-[0_2px_2px_1px_rgba(4,63,135,0.8)] mb-1 active:mb-0 active:shadow-[0_0_0_0_rgba(4,63,135,0.8)]'>
        Thêm mới
      </button>
    </div>
  )
}
