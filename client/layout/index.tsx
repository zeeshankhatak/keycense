import React, { useEffect, useState } from 'react'
import TopNavigationBar from '@/components/TopNavigationBar'
import Router, { useRouter } from 'next/router'

const Layout = ({children}: { children: React.ReactNode }) => {
  const [isAuthenticatedRoute, setIsAuthenticatedRoute] = useState(false)

  const router = useRouter()

  useEffect(() => {
    let currentRoute = router.pathname
    setIsAuthenticatedRoute(currentRoute !== '/login')
  }, [router])

  return isAuthenticatedRoute ? (
    <>
      <TopNavigationBar/>
      {children}
    </>
  ) : <>{children}</>
}

export default Layout
