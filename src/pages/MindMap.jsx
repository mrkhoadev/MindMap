"use client"
import React, { useEffect, useState } from "react";
import { flows } from "@/providers/services/flows";
import Loading from "@/components/Loading/Loading";
import Checkbox from "@/components/Checkbox/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import AddBtn from "@/components/Pages/Mindmap/AddBtn";
import EditBtn from "@/components/Pages/Mindmap/EditBtn";
import { extractDateTime } from "@/helpers/ExtractDateTime";
import { deleteMindMap, deleteSelectedMindMap, setMindMapList, setStatusCheckbox } from "@/providers/slice/flowsSlice";
import DeleteBtn from "@/components/Pages/Mindmap/DeleteBtn";
import DeleteSelectedBtn from "@/components/Pages/Mindmap/DeleteSelectedBtn";

const tableClass = {
  class: 'w-full',
  thead: 'border-b-2 border-[#aaa] bg-[#eee]',
  tbody: 'border-b',
  row: 'text-left',
  col1: 'text-center w-[70px] py-3',
  col2: 'w-1/1 py-2',
  col3: 'w-1/6 py-2 text-center',
  col4: 'w-1/6 text-center px-2',
}

export default function MindMap({ session = '' }) {
  const isLoading = useSelector((state) => state.flowsSlice.isLoading);

  const [getUserQuery, resultGetUserEmail] = flows.useLazyGetUserEmailQuery();
  const [createUser, resultCreateUser] = flows.useCreateUserDataMutation();
  const [getMindMapQuery, resultGetMindMap] = flows.useLazyGetMindMapQuery();
  const [deleteMindMapQuery, resultDeleted] = flows.useDeleteMindMapMutation();
  const [deleteSelectedMutation, resultDeleteSelected] = flows.useDeleteSelectedMindMapMutation();

  const { 
          isError: isErrorGetUserEmail, 
          isLoading: isLoadingGetUserEmail, 
          isSuccess: isSuccessGetUserEmail, 
          data: getUserQueryData,
        } = resultGetUserEmail;
          
  const { 
          isError: isErrorCreateUser, 
          isLoading: isLoadingCreateUser, 
          isSuccess: isSuccessCreateUser, 
          data: createdUserData
        } = resultCreateUser;
          
  const { 
          isLoading: isLoadingGetMindMap,
          isSuccess: isSuccessGetMindMap ,
          data: getMindMapData
        } = resultGetMindMap;

  const {
          isLoading: isLoadingDelete,
          isSuccess: isSuccessDelete,
          originalArgs: deletedId
        } = resultDeleted;
    
  const {
          isSuccess: isSuccessDeleteSelected
        } = resultDeleteSelected

  const dispatch = useDispatch();
  const mindMapList = useSelector((state) => state.flowsSlice.mindMapList);
  const isSelected = useSelector((state) => state.flowsSlice.isSelected);
  
  //Gọi hàm kiểm tra email đã tồn tại chưa
  useEffect(
    () => {
      if (session?.user?.email) 
      {
        getUserQuery(session?.user?.email);
      }
  }, [
      session, 
      session?.user?.email
    ]
  );
  
  //Kiểm tra email đã tồn tại chưa
  useEffect(
    () => {
      if (isSuccessGetUserEmail) {
        const userData = getUserQueryData && 
                         getUserQueryData[0];
        if (userData) 
        {
          getMindMapQuery()
        } 
        if (
            session?.user?.email && 
            (
              !userData || 
              userData?.userEmail !== session?.user?.email
            )
          ) 
        { 
          createUser(session?.user?.email);
        }
      }
  },[
      session, 
      createUser,
      getUserQueryData,
      session?.user?.email,
      isSuccessGetUserEmail, 
      resultGetUserEmail.error
    ]
  )

  //Gọi data mindmap
  useEffect(
    () => {
      if (isSuccessCreateUser)
      {
        const userData = getUserQueryData && 
                         getUserQueryData[0];
        if (userData) 
        {
          getMindMapQuery()
        }
      }
  },[
      getMindMapQuery,
      getUserQueryData,
      isSuccessCreateUser
    ]
  )

  useEffect(
    () => {
      if (
          isSuccessGetMindMap &&
          session?.user?.email
        ) 
      {
        dispatch(
          setMindMapList(
            {
              mindMapData: getMindMapData,
              userEmail: session?.user?.email,
            }
          )
        )
      }
    },[
        session,
        dispatch,
        setMindMapList,
        isSuccessGetMindMap,
        session?.user?.email
    ]
  )

  useEffect(
    () => {
      if (isSuccessDelete) {
        dispatch(
          deleteMindMap(deletedId)
        )
      }
    }, [
      dispatch,
      deletedId,
      isSuccessDelete
    ]
  )

  useEffect(
    () => {
      dispatch(
        setStatusCheckbox(
          {
            isSelected: false,
            checkAll: false,
          }
        )
      ) 
  },[
      dispatch, 
      setStatusCheckbox
    ]
  )

  useEffect(
    () => {
      if (isSuccessDeleteSelected) 
      {
        dispatch(
          deleteSelectedMindMap()
        )
      }
    }, [
          dispatch,
          deleteSelectedMindMap,
          isSuccessDeleteSelected
      ]
  )
  if ( isLoading ) 
    {
    return <Loading />;
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
                <th className={`${tableClass.col3}`}>TẠO LÚC</th>
                <th className={`${tableClass.col4}`}>HÀNH ĐỘNG</th>
              </tr>
            </thead>

            <tbody className={`${tableClass.tbody}`}>
              {
                mindMapList.length >= 1 ? 
                (mindMapList?.map((element) => {
                  if (element) {
                    const {id, name, description, create_at, selected, mindMapId} = element;
                    return (
                      <tr className={`${tableClass.row} border-b border-[#aaa]`}
                          key={id}>
                        <td className={`${tableClass.col1}`}>
                          <Checkbox type='group' 
                                    selected={selected} 
                                    id={id}
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
                          {extractDateTime(create_at)}
                        </td>
                        <td className={`${tableClass.col4}`}>
                          <div className="flex gap-x-5 justify-center text-2xl text-200">
                            <EditBtn id={mindMapId} />
                            <DeleteBtn id={id} deleteMindMapQuery={deleteMindMapQuery} />
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
                    <DeleteSelectedBtn deleteSelectedMutation={deleteSelectedMutation}
                                       resultDeleteSelected={resultDeleteSelected} />
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
