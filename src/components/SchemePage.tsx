"use client"
import { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'

const SchemePage = () => {
  const {schemes} = useSelector((store:RootState) => store.scheme)
  return (
    <div>
      {
        schemes?.map((item:any) => (
          <div className='text-white flex flex-col gap-6 text-2xl'>
            <h1>{item.name} </h1>
            <h2>{item.category}</h2>
            <h3>{item.eligibility}</h3>
            <h4>{item.TrustScore}</h4>
          </div>
        ))
      }
    </div>
  )
}

export default SchemePage
