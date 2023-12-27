"use client"
import React, { useEffect } from "react";
import { flows } from "@/providers/services/flowsQuery";
import Loading from "@/components/Loading/Loading";
import Checkbox from "@/components/Checkbox/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import AddBtn from "@/components/Pages/Mindmap/AddBtn";
import EditBtn from "@/components/Pages/Mindmap/EditBtn";
import { extractDateTime } from "@/helpers/ExtractDateTime";
import { setMindMapList } from "@/providers/slice/flowsSlice";
import DeleteBtn from "@/components/Pages/Mindmap/DeleteBtn";
import DeleteSelectedBtn from "@/components/Pages/Mindmap/DeleteSelectedBtn";
import { useRouter } from "next/navigation";
import { handleRevaliDate } from "@/lib/revaliDate"; 
import { handleAlert } from "@/helpers/alertify";

const tableClass = {
  class: 'w-full',
  thead: 'border-b-2 border-[#aaa] bg-[#eee] select-none',
  tbody: 'border-b',
  row: 'text-left',
  col1: 'text-center w-[70px] py-3',
  col2: 'w-1/2 py-2',
  col3: 'w-1/7 py-2 text-center',
  col4: 'w-1/7 py-2 text-center',
  col5: 'w-1/6 text-center px-2',
}

export default function MindMap({ session = '', data: { status = 'idle', mindMapData = null } }) {
  const dispatch = useDispatch();
  const isSelected = useSelector((state) => state.flowsSlice.isSelected);
  const mindMapList = useSelector((state) => state.flowsSlice.mindMapList);
  const isLoading = useSelector((state) => state.flowsSlice.isLoading);
  const route = useRouter();

  const [deleteMutation, resultDeleteMutation] = flows.useDeleteMindMapMutation();
  const [deleteSelectedMutation, resultDeleteSelected] = flows.useDeleteSelectedMindMapMutation();
  const [postMindMap, resultPostMindMap] = flows.usePostMindMapMutation();

  const {
          isSuccess: isSuccessDelete,
          originalArgs: argsDelete,
          isError: isErrorDelete
        } = resultDeleteMutation

  const {
          isSuccess: isSuccessDeleteSelected,
          originalArgs: argsDeleteSelected,
          isError: isErrorDeleteSelected
        } = resultDeleteSelected

  const {
          isSuccess: isSuccessPost,
          originalArgs: argsPost
        } = resultPostMindMap

        
  //Thêm data vào context khi lần đầu truy cập trang!
  useEffect(
    () => {
      dispatch(
        setMindMapList(mindMapData)
      );
    },[
        dispatch,
        mindMapData
      ]
  )  
  //Xử lý khi "Xóa" thành công!
  useEffect(
    () => {
      if (isSuccessDelete)
      {
        handleAlert("success", "Đã xóa thành công!");
        (async ()=> {
          await handleRevaliDate()
        })()
      }
      if (isErrorDelete)
      {
        handleAlert("error", "Xóa thất bại, Vui lòng thử lại!");
      }
    },[
        isErrorDelete,
        isSuccessDelete,
      ]
  )
  //Xử lý khi "xóa những mindmap đã chọn" thành công!
  useEffect(
    () => {
      if (isSuccessDeleteSelected) {
        handleAlert("success", "Đã xóa thành công!");
        (async ()=> {
          await handleRevaliDate()
        })()
      }
      if (isErrorDeleteSelected)
      {
        handleAlert("error", "Thất bại rồi! Bảo không thèm nghe chán lắm cơ.");
      }
    },[
        isErrorDeleteSelected,
        isSuccessDeleteSelected,
      ]
  )
  //Xử lý khi thêm thành công!
  useEffect(
    () => {
      if (isSuccessPost && argsPost?.mindMapId) {
        (async ()=> {
          await handleRevaliDate()
          route.push(`./mindmap/${argsPost?.mindMapId}`)
        })()
      }
    },[
        route,
        argsPost, 
        isSuccessPost, 
      ]
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
          <AddBtn postMindMap={postMindMap} email={session?.user?.email} />
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

            <tbody 
              className={`${tableClass.tbody}`}
            >
              {
                mindMapList.length >= 1 ? 
                (mindMapList.map((element) => {
                  if (element) {
                    const {id, name, description, create_at, selected, mindMapId, isAccessible} = element;
                    return (
                      <tr className={`${tableClass.row} border-b border-[#aaa]`}
                          key={id}
                      >
                        <td className={`${tableClass.col1}`}>
                          <Checkbox id={id}
                                    type='group' 
                                    selected={selected} 
                          />
                        </td>
                        <td className={`${tableClass.col2}`}>
                          <h3 className="text-xl break-words max-w-[700px]">
                            {name}
                          </h3> 
                          <p className=" text-200 break-words max-w-[700px]">
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
                            <DeleteBtn id={id} name={name} deleteMutation={deleteMutation} />
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
