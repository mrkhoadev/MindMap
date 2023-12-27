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
    
    const handleDeleteAll = async () => {
        if (typeof document !== 'undefined') {
            const {confirm, error} = await import('alertifyjs');
            confirm("Xóa những MindMap đã chọn?","Dương chưa fix cho cái lỗi no-cors nên chức năng này chưa hoạt động được! Bạn vẫn muốn tiếp tục thử chứ?",
            function(){
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
            },
            function(){
              error('Đã hủy!');
            });
          }
    }

  return (
    <button onClick={handleDeleteAll} className='p-2 w-full bg-red-600 rounded-md font-semibold text-[#fff] hover:bg-red-500'>Xóa</button>
  )
}
