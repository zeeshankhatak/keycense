import { Button } from 'react-bootstrap'
import Router from 'next/router'

const TopNavigationBar = () => {
  const signOut = () => {
    localStorage.clear()
    Router.push('/login')
  }

  const redirectToMerchandiseListing = () => {
    Router.push('/merchandise')
  }

  return (
    <div className="w-100 bg-primary top-navigation">
      <Button onClick={redirectToMerchandiseListing}><i className="bi-house"></i></Button>
      <Button onClick={signOut} className="float-end m-1" variant="danger" >Sign out</Button>
    </div>
  )
}

export default TopNavigationBar
