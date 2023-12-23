"use client"
import React, { useEffect, useState } from "react";
import { flows } from "@/providers/services/flowsQuery";
import Loading from "@/components/Loading/Loading";
import Checkbox from "@/components/Checkbox/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import AddBtn from "@/components/Pages/Mindmap/AddBtn";
import EditBtn from "@/components/Pages/Mindmap/EditBtn";
import { extractDateTime } from "@/helpers/ExtractDateTime";
import { deleteMindMap, deleteSelectedMindMap, setIsLoading, setMindMapList, setStatusCheckbox } from "@/providers/slice/flowsSlice";
import DeleteBtn from "@/components/Pages/Mindmap/DeleteBtn";
import DeleteSelectedBtn from "@/components/Pages/Mindmap/DeleteSelectedBtn";

const tableClass = {
  class: 'w-full',
  thead: 'border-b-2 border-[#aaa] bg-[#eee]',
  tbody: 'border-b',
  row: 'text-left',
  col1: 'text-center w-[70px] py-3',
  col2: 'w-1/2 py-2',
  col3: 'w-1/7 py-2 text-center',
  col4: 'w-1/7 py-2 text-center',
  col5: 'w-1/6 text-center px-2',
}

export default function MindMap({ session = '', data: { status, mindMapData } }) {
  const dispatch = useDispatch();
  const isSelected = useSelector((state) => state.flowsSlice.isSelected);
  const mindMapList = useSelector((state) => state.flowsSlice.mindMapList);
  const isLoading = useSelector((state) => state.flowsSlice.isLoading);

  const [deleteMutation, resultDeleteMutation] = flows.useDeleteMindMapMutation();
  const [deleteSelectedMutation, resultDeleteSelected] = flows.useDeleteSelectedMindMapMutation()

  const {
          isSuccess: isSuccessDelete,
          originalArgs: argsDelete
        } = resultDeleteMutation

  const {
          isSuccess: isSuccessDeleteSelected
        } = resultDeleteSelected


  useEffect(
    () => {
      dispatch(
        setMindMapList(mindMapData)
      )
    },[
        dispatch,
        mindMapData
      ]
  )  

  useEffect(
    () => {
      if (isSuccessDelete)
      {
        dispatch(
          deleteMindMap(argsDelete)
        )
      }
    },[
        isSuccessDelete
      ]
  )

  useEffect(
    () => {
      if (isSuccessDeleteSelected) {
        console.log(resultDeleteSelected);
      }
    },[
        isSuccessDeleteSelected
      ]
  )

  //reset checkbox selected
  useEffect(
    () => {
      dispatch(
        setStatusCheckbox(
          {
            isSelected: false,
            checkAll: false
          }
        )
      )
    },[]
  )

  if (status > 400) 
  {
    return <h1>Error</h1>  
  }
  if (isLoading)
  {
    return <Loading />
  }

  return (
    <>
      <div className="max-w-7xl mx-auto py-10">
        <div className="flex flex-col">
          <h1 className="text-4xl font-semibold">Mindmap của tôi</h1>
          <AddBtn />
        </div>
        <div className="mt-8 border-2 border-[#aaa] rounded-md">

          <table className={`${tableClass.class}`}>

            <thead className={`${tableClass.thead}`}>
              <tr className={`${tableClass.row}`}>
                <th className={`${tableClass.col1}`}>
                  <Checkbox />
                </th>
                <th className={`${tableClass.col2}`}>TÊN</th>
                <th className={`${tableClass.col3}`}>Trạng thái</th>
                <th className={`${tableClass.col4}`}>TẠO LÚC</th>
                <th className={`${tableClass.col5}`}>HÀNH ĐỘNG</th>
              </tr>
            </thead>

            <tbody className={`${tableClass.tbody}`}>
              {
                mindMapList.length >= 1 ? 
                (mindMapList.map((element) => {
                  if (element) {
                    const {id, name, description, create_at, selected, mindMapId, isAccessible} = element;
                    return (
                      <tr className={`${tableClass.row} border-b border-[#aaa]`}
                          key={id}>
                        <td className={`${tableClass.col1}`}>
                          <Checkbox id={id}
                                    type='group' 
                                    selected={selected} 
                          />
                        </td>
                        <td className={`${tableClass.col2}`}>
                          <h3 className="text-xl">
                            {name}
                          </h3> 
                          <p className=" text-200">
                            {description}
                          </p>
                        </td>
                        <td className={`${tableClass.col3}`}>
                          {isAccessible ? "Công khai" : "Riêng tư"}
                        </td>
                        <td className={`${tableClass.col4}`}>
                          {extractDateTime(create_at)}
                        </td>
                        <td className={`${tableClass.col5}`}>
                          <div className="flex gap-x-5 justify-center text-2xl text-200">
                            <EditBtn id={mindMapId} />
                            <DeleteBtn id={id} deleteMutation={deleteMutation} />
                          </div>
                        </td>
                      </tr>
                    ) 
                  }
                  return;
                }))
                : 
                <tr className={`${tableClass.row}`}>
                  <td colSpan={'4'} className="py-2 px-3 text-xl">không có dữ liệu...</td>
                </tr>
              }
            </tbody>

            {
              isSelected && 
              <tfoot>
                <tr>
                  <td>
                    <DeleteSelectedBtn deleteSelectedMutation={deleteSelectedMutation} />
                  </td>
                </tr>
              </tfoot>
            }

          </table>

        </div>
      </div>
    </>
  );
}