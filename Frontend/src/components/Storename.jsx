import React, { useContext, useEffect, useState } from 'react'
import { Form,Button, Container,Modal } from 'react-bootstrap';
import axios from 'axios';
import { Store } from '../Store';
import { FaEdit } from 'react-icons/fa';


const Storename = () => {
  const {state3} = useContext(Store)
  const {userInfo} = state3
  
  /* HW  Edit */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  /* HW  Edit */

  const [name,setName] = useState('') 
  const [storename,setStorename] = useState('')
  const [proid,setProid] = useState('')

  let handleSubmit = async (e) =>{
    e.preventDefault()
    await axios.post('/products/storename',{
      id: state3.userInfo._id,
      name: name,
    })
  }

  /* HW  Edit */
  let handleModalSubmit = async (e) =>{
    e.preventDefault()
    setShow(false)
    await axios.put('/products/storename/edit',{
      id: proid,
      name: name,
    })
  }

  const handleShow = async (e) =>{
    e.preventDefault()
    const {data} = await axios.get(`/products/storename/${userInfo._id}`)
    setName(data[0].name)
    setProid(data[0]._id)
    setShow(true)
  }
  /* HW  Edit */

  useEffect(()=>{
    async function Store(){
      let {data} = await axios.get(`/products/storename/${userInfo._id}`)
      setStorename(data[0].name);
    }
    Store()
  },[])

  return (
    <Container>
      <Form className='mt-4' style={{fontSize: 15, fontWeight: 700}}>
        {storename !== ''
        ?
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Store Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Product Catagory" 
              onChange={(e)=> setName(e.target.value)}
              
              value={storename}

            />
          </Form.Group>
        :
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Store Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Product Catagory" 
              onChange={(e)=> setName(e.target.value)}
              
              value={name}

            />
          </Form.Group>
        }

        {storename
        ?
          <Button 
            variant="primary" 
            type="submit"
            onClick={handleShow}
          >
            <FaEdit/>
          </Button>
        :
          <Button 
            variant="primary" 
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        }
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Title style={{marginLeft: 50,marginTop: 25}}>
          <h4>Edit Employee Info</h4>
        </Modal.Title>
        <Modal.Body className='mdl'>
          <Form.Group className="mb-5" controlId="formBasicEmail">
            <Form.Label className="formModalname">
              Store Name
            </Form.Label>
            <Form.Control 
              type="text" 
              className="formModal"
              placeholder="Product Catagory" 
              onChange={(e)=> setName(e.target.value)}
              value={name}

            />
          </Form.Group>
          <Button 
            variant="primary" 
            type="submit"
            onClick={handleModalSubmit}
            className='btnMdl'
            style={{background: "#0D6EFD"}}
          >
            Submit
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleClose}
            className='ms-2 btnMdl'
            style={{background: "#3F0082"}}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default Storename