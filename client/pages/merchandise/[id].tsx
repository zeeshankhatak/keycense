import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { get, put } from '@/utils/http'
import { Button, Container, Form } from 'react-bootstrap'

const EditMerchandise = () => {
  const [mounted, setMounted] = useState(false)
  const [merchandiseData, setMerchandiseData] = useState<MerchandiseInterface>({} as MerchandiseInterface);

  const router = useRouter()

  const fetchData = async (id: string) => {
    try {
      setMounted(false)
      const data = await get(`/merchandise/${id}`)
      setMerchandiseData(data)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setMounted(true)
    }
  }

  useEffect(() => {
    if (router.query.id) {
      fetchData(router.query.id as string)
    }
  }, [router.query.id])



  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMerchandiseData({
      ...merchandiseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await put(`/merchandise/${merchandiseData.id}`, JSON.stringify(merchandiseData))
      toast.success('Merchandise Detail updated!')
      Router.push('/merchandise')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  };

  return mounted ? (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Form style={{ width: '300px' }} onSubmit={handleSubmit}>
        <Form.Group controlId="formItemName" className="mb-3">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter item name"
            name="name"
            value={merchandiseData.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formPrice" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            name="price"
            value={merchandiseData.price}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  ) : (<>Loading...</>)
}

export default EditMerchandise
