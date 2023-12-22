"use client";
// import { flows } from '@/providers/services/flows';
import { deleteSelectedMindMap, setIsLoading, setStatusCheckbox } from '@/providers/slice/flowsSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function DeleteSelectedBtn(
        {
            resultPatchMindMap,
            getMindMapToDelete, 
            PatchMindMapMutation, 
            resultGetMindMapToDelete
        }
    ) 
{
    // const [deletedQuery, resultDelete] = flows.useDeleteMindMapMutation();
    // const { isSuccess: isSuccessDelete } = resultDelete;
    // const { data, isSuccess: isSuccessToDelete } = resultGetMindMapToDelete;
    // const { isSuccess: isSuccessPatchMindMap } = resultPatchMindMap;
    // const mindMapList = useSelector((state) => state.flowsSlice.mindMapList);
    // const dispatch = useDispatch();
    // const isCheckRef = useRef(false);
    // const [notDeleted, setNotDeleted] = useState([])
    
    const handleDeleteAll = () => {
        // getMindMapToDelete();
        // dispatch(
        //     setIsLoading(true)
        // )
        // const notDeleteId = mindMapList.map(
        //     (item) => {
        //         if (item.selected) 
        //         {
        //             deletedQuery(item.id)
        //             return null
        //         }
        //         return item;
        //     }
        // ).filter((i) => i);
        // isCheckRef.current = true;
        // setNotDeleted(notDeleteId)
        console.log("Phần này cần 1 cái api tốt tốt mới làm đc, ko thì chịu á! :v");
    }
    // useEffect(
    //     () => {
    //         if (isSuccessToDelete) {
    //             const newData = data.map(
    //                 (item) => {
    //                     const deleteItem = mindMapList.find(
    //                         (selected) => {
    //                             if (selected.id !== notDeleted.id)
    //                             {
    //                                 return selected;
    //                             }
    //                         }
    //                     )
    //                     if (item.id === deleteItem.id) 
    //                     {
    //                         return null;
    //                     }
    //                     return item;
    //                 }
    //             ).filter((i) => i);
    //             PatchMindMapMutation(newData);
    //         }
    //     },[
    //         notDeleted,
    //         isSuccessToDelete,
    //         PatchMindMapMutation
    //     ]
    // )
    // useEffect(
    //     () => {
    //         if (isSuccessDelete && isCheckRef.current) 
    //         {
    //             dispatch(
    //                 deleteSelectedMindMap(notDeleted)
    //             )
    //             isCheckRef.current = false;
    //         }
    //     }, [
    //         notDeleted,
    //         isSuccessDelete,
    //         isCheckRef,
    //         isCheckRef.current,
    //         deleteSelectedMindMap,
    //     ]
    // )
  return (
    <button onClick={handleDeleteAll} className='p-2 w-full bg-red-600 rounded-md font-semibold text-[#fff] hover:bg-red-500'>Xóa</button>
  )
}
