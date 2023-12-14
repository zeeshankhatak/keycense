import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { get, post, put } from '@/utils/http'
import { Button, Container, Form } from 'react-bootstrap'

const AddMerchandise = () => {
  const [merchandiseData, setMerchandiseData] = useState<MerchandiseInterface>({} as MerchandiseInterface);

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
      await post(`/merchandise`, JSON.stringify(merchandiseData))
      toast.success('Merchandise added!')
      Router.push('/merchandise')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  };

  return (
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
  )
}

export default AddMerchandise
