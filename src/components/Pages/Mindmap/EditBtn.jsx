"use client";
import { handleRevaliDateDetails } from '@/lib/revaliDate';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaEdit } from "react-icons/fa";

export default function EditBtn({id}) {
    const route = useRouter()
  return (
    <button 
      onClick={
        async () => {
          await handleRevaliDateDetails();
          route.push(`/mindmap/${id}`)
        }
      }
    >
      <FaEdit />
    </button>
  )
}
