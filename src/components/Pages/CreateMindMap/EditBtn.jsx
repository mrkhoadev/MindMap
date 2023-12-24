"use client"
import { setIsLoading } from '@/providers/slice/flowsSlice';
import React from 'react'
import { FaSave } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import useFlowStore from "@/providers/useFlowStore";
import FlowSelector from "@/providers/selectors/FlowSelector";
import { shallow } from "zustand/shallow";
import handleCheckAccount from '@/helpers/checkAccount';

export default function EditBtn({name, description, editFlow, email}) {
    const dispatch = useDispatch();
    const { nodes, edges } = useFlowStore(FlowSelector, shallow);
    const flowDetails = useSelector((state) => state.flowsSlice.flowDetails);
    const isAccountValid = handleCheckAccount(flowDetails?.userEmail, email, flowDetails?.isAccessible);
    const handleSave = () => {
        if (isAccountValid) {
            const newFlow = {
                ...flowDetails,
                name,
                description,
                map: {
                    nodes,
                    edges,
                }
            }
            editFlow(newFlow);
            dispatch(setIsLoading(true));
        }
    }
    
    return (
        <div className='h-[40px] flex items-center'>
            <button 
                onClick={handleSave} 
                disabled={!isAccountValid}
                className={`w-full
                        text-300 
                        px-3 
                        py-1 
                        rounded 
                        flex 
                        items-center 
                        justify-center 
                        gap-x-2
                        mb-1 
                        active:mb-0
                        ${isAccountValid ?
                        "bg-green-600 shadow-[0_2px_2px_1px_rgba(4,104,1)] active:shadow-[0_0px_2px_1px_rgba(4,104,1)]" :
                        "bg-slate-400 shadow-[0_2px_2px_1px_rgba(92,92,92)] active:shadow-[0_0px_2px_1px_rgba(92,92,92)]"
                        }
                        `}
            >
                <FaSave /> Lưu thay đổi
            </button>
        </div>
       
    )
}