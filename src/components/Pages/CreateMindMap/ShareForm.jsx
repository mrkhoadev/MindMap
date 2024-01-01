import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx';
import style from './ShareForm.module.scss';
import { htmlScript } from '@/helpers/regex';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus, FaXmark } from 'react-icons/fa6';
import { setIsLoading } from '@/providers/slice/flowsSlice';
import useFlowStore from '@/providers/useFlowStore';
import FlowSelector from '@/providers/selectors/FlowSelector';
import { shallow } from 'zustand/shallow';
import imgHome from "@/assets/images/pages/home/so-do-tu-duy.webp"


const formClass = {
  class: "flex flex-col gap-y-5",
  inputBox: 'flex gap-y-1 flex-col-reverse',
  label: 'text-md font-medium text-[#7a7a7a] peer-focus:text-blue-400',
  input: "peer h-10 w-full rounded-md bg-gray-50 px-4 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none",
}

export default function ShareForm({ onFormActiveChange, isShowForm, editFlow, name = '', description = '', isAccountValid }) {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const { nodes, edges, isInteractive } = useFlowStore(FlowSelector, shallow);
  const [nameText, setNameText] = useState(htmlScript(name));
  const [descriptionText, setDescriptionText] = useState(htmlScript(description))
  const flowDetails = useSelector((state) => state.flowsSlice.flowDetails);
  const [accessibility, setAccessibility] = useState(
    !isAccountValid ? "public" : !flowDetails?.isAccessible ? "private" : "public"
  );
  const handleTitleOnChange = (e) => {
    setNameText(e.target.value)
  }
  const handleDescriptionOnChange = (e) => {
    setDescriptionText(e.target.value)
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isAccountValid)
    {
      const newFlow = 
      {
        ...flowDetails,
        name: htmlScript(nameText),
        description: htmlScript(descriptionText),
        isAccessible: true,
        map: {
            nodes,
            edges,
            isInteractive,
        },
      } 
      editFlow(newFlow);
      dispatch(setIsLoading(true));
    }
  }
  const handleExternalSubmit = () => {
    if (accessibility === "public")
    {
      const submitEvent = new Event('submit', { cancelable: true });
      formRef.current.dispatchEvent(submitEvent);
      if (!submitEvent.defaultPrevented) {
        return handleFormSubmit(submitEvent);
      }
    }
    const newFlow = 
    {
      ...flowDetails,
      name: htmlScript(nameText),
      description: htmlScript(descriptionText),
      isAccessible: false,
      map: {
          nodes,
          edges,
          isInteractive,
      },
    } 
    editFlow(newFlow);
    dispatch(setIsLoading(true));
    return;
  };
  useEffect(
    () => {
      setAccessibility(
        !isAccountValid ? "public" : !flowDetails?.isAccessible ? "private" : "public"
      )
    },[
        isAccountValid,
        flowDetails?.isAccessible,
      ]
  )

  useEffect(
    () => {
      setNameText(htmlScript(name));
      setDescriptionText(htmlScript(description))
    },[
        name, 
        description
      ]
  )

  return (
    <>
        {
          isShowForm && (
              <div
                className=' fixed inset-0 bg-[rgba(0,0,0,0.4)] z-10 grid'
                onMouseDown={(e) => {
                  e.stopPropagation();
                  if (e.target === e.currentTarget) {
                    onFormActiveChange(false);
                  }
                }}
              >
                <div 
                  className='bg-[#fff] rounded-lg place-self-center w-[512px] overflow-hidden'
                >
                  <div 
                    className='p-6'
                  >
                    <div 
                      className={clsx(style["radio-buttons-container"])}
                    >
                      {isAccountValid && (
                        <div 
                          className={clsx(style["radio-button"])}
                        >
                          <input 
                            name="radio-group" 
                            id="radio2" 
                            className={clsx(style["radio-button__input"])} type="radio" 
                            onChange={(e) => {if(e.target.checked) setAccessibility("private")}}
                            checked={accessibility === "private" ? true : false }
                          />
                          <label htmlFor="radio2" className={clsx(style["radio-button__label"])}>
                            <span className={clsx(style["radio-button__custom"])}></span>
                                Riêng tư
                          </label>
                        </div>
                      )}
                      <div 
                        className={clsx(style["radio-button"])}
                      >
                        <input 
                          name="radio-group" 
                          id="radio1" 
                          className={clsx(style["radio-button__input"])} type="radio"
                          onChange={(e) => {if(e.target.checked) setAccessibility("public")}}
                          checked={accessibility === "public" ? true : false }
                        />
                        <label 
                          htmlFor="radio1" 
                          className={clsx(style["radio-button__label"])}
                        >
                          <span 
                            className={clsx(style["radio-button__custom"])}
                          ></span>
                          Công khai
                        </label>
                      </div>
                    </div>

                    <div>
                      {accessibility === "private" && isAccountValid && (
                        <p className='text-lg'>Nếu chọn riêng tư, chỉ có bạn mới được quyền xem Mindmap này</p>
                      )}
                      {accessibility === "public" && (
                        <form 
                          className={`${formClass.class}`}
                          onSubmit={handleFormSubmit}
                          ref={formRef}
                        >
                          <div 
                            className={`${formClass.inputBox}`}
                          >
                            <input 
                              id="share-input" 
                              className={`${formClass.input}`} 
                              readOnly={true}
                              type="url" 
                              onClick={(e) => e.target.select()}
                              defaultValue={`${process.env.NEXT_PUBLIC_HOST}${'/mindmap/'}${flowDetails.mindMapId}`} 
                              name='shareInput'
                            />
                            <label 
                              htmlFor="share-input" 
                              className={`${formClass.label}`}
                            >
                              Liên kết chia sẻ
                            </label>
                          </div>
                          <div 
                            className={`${formClass.inputBox}`}
                          >
                            <input 
                              type="text" 
                              id="title-input" 
                              className={`${formClass.input}`} 
                              onChange={handleTitleOnChange}
                              value={nameText} 
                              name='titleInput'
                              readOnly={!isAccountValid}
                            />
                            <label 
                              htmlFor="title-input" className={`${formClass.label}`}
                            >
                              Tiêu đề
                            </label>
                          </div>
                          <div 
                            className={`${formClass.inputBox}`}
                          >
                            <textarea 
                              type="text" 
                              id="description-input" 
                              className={`${formClass.input} py-2 min-h-[80px] max-h-[200px]`} 
                              onChange={handleDescriptionOnChange}
                              value={descriptionText} 
                              name='titleInput'
                              readOnly={!isAccountValid}
                            />
                            <label 
                              htmlFor="description-input" className={`${formClass.label}`}
                            >
                              Mô tả
                            </label>
                          </div>
                          <div 
                            className={`${formClass.inputBox}`}
                          >
                            <input 
                              type="url" 
                              id="img-input" 
                              readOnly={true}
                              className={`${formClass.input}`} 
                              onClick={(e) => e.target.select()}
                              defaultValue={`${process.env.NEXT_PUBLIC_HOST}${imgHome.src}`}
                            />
                            <label 
                              htmlFor="img-input" 
                              className={`${formClass.label}`}
                            >
                              Ảnh chia sẻ
                            </label>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                  <div 
                    className='bg-[#e5e7eb] py-4 px-6 flex justify-end gap-x-5'
                  >
                    <button
                      onClick={() => onFormActiveChange(false)}
                      className='flex gap-x-1 items-center bg-red-500 text-white px-4 py-2 justify-center rounded-md hover:bg-red-700'
                    >
                      <FaXmark />
                      Đóng
                    </button>
                    {isAccountValid && (
                      <button 
                        onClick={handleExternalSubmit}
                        className='flex gap-x-1 items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700'
                      >
                        <FaPlus /> Lưu lại
                      </button>
                    )}
                  </div>
                </div>
              </div>
          )
        }
    </>
  )
}
