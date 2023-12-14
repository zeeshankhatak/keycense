import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import React from 'react'
import Layout from '@/layout'

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <ToastContainer/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
