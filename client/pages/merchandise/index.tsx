import { Button, Card, Table } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { del, get, put } from '@/utils/http'
import { toast } from 'react-toastify'
import moment from "moment"
import Router from 'next/router'

const MerchandiseListing = () => {
  const [mounted, setMounted] = useState(true)
  const [refreshData, setRefreshData] = useState(0)
  const [merchandiseList, setMerchandiseList] = useState<MerchandiseInterface[]>([])

  const fetchMerchandiseData = async () => {
    try {
      setMounted(false)
      const data = await get('/merchandise')
      setMerchandiseList(data)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setMounted(true)
    }
  }

  const editRecord = (id: number) => {
    Router.push(`/merchandise/${id}`)
  }

  const deleteRecord = async (id: number) => {
    try {
      await del(`/merchandise/${id}`)
      toast.success('Merchandise deleted!')
      setRefreshData(Date.now())
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  const redirectToCreate = () => {
    Router.push('/merchandise/create')
  }

  useEffect(() => {
    fetchMerchandiseData()
  }, [refreshData])


  return mounted ? (
    <Card>
      <Card.Body>
        <Card.Title>
            Merchandise List
          <Button className="float-end mb-3" onClick={redirectToCreate}>Add Merchandise</Button>
        </Card.Title>
        <Table striped bordered hover variant="dark">
          <thead>
          <tr>
            <th>Serial Number</th>
            <th>Name</th>
            <th>Price</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {!merchandiseList.length && (<tr>
            <td colSpan={6}>No Records to show.</td>
          </tr>)}
          {merchandiseList.length && merchandiseList.map((eachMerchandise) =>
            (
              <tr key={eachMerchandise.id}>
                <td>{eachMerchandise.id}</td>
                <td>{eachMerchandise.name}</td>
                <td>$ {eachMerchandise.price}</td>
                <td>{moment(eachMerchandise.createdAt).format('MM/DD/YYYY, HH:mm a')}</td>
                <td>{moment(eachMerchandise.updatedAt).format('MM/DD/YYYY, HH:mm a')}</td>
                <td>
                  <Button className="me-1" onClick={() => editRecord(eachMerchandise.id)}><i className="bi-pencil-fill"></i></Button>
                  <Button onClick={() => deleteRecord(eachMerchandise.id)} variant="danger"><i className="bi-trash-fill"></i></Button>
                </td>
              </tr>
            )
          )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  ) : <>Loading ...</>
}

export default MerchandiseListing
