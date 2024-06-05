import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Table, Button, Modal, Input, Form } from 'antd';
import './App.css'

const { Item } = Form
const baseUrl = "http://localhost:3001/fornecedores"
function App() {

  const [data, setData]=useState([])
  const [modalInsert, setModalInsert] = useState(false)
  const [fornecedor, setFornecedor] = useState ({
    id: "",
    fornecedor: "",
    pais: "",
    periodo: ""
  })


  const openModalInsert = () =>{
    setModalInsert(modalInsert)
  }
  const handlechange = e =>{
    const {name, value} = e.target
    setFornecedor({...fornecedor,
     [name]: value}) 
    console.log(fornecedor)
  }


  const columns = [
    {
      title: "iD",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "fornecedor",
      dataIndex: "fornecedor",
      key: "fornecedor"
    },
    {
      title: "pais",
      dataIndex: "pais",
      key: "pais"
    },
    {
      title: "periodo de Atividade",
      dataIndex: "periodo",
      key: "periodo"
    },
    {
      title: "Ação",
      key: "actions",
      render: (fila) =>(
        <>
         
        <Button type='primary'>Editar</Button>{"  "}
        <Button type='primary' danger>Excluir
        </Button>
        </>
      ),
    },
  ]
const requestGet = async () =>{
  await axios.get(baseUrl)
  .then (response => {
    setData(response.data)
  }).catch(error =>{
    console.log(error)
  })
}

  useEffect(()=> {
    requestGet()
  },[])

  return (
    <>
      <div className='App'>
          <Table columns = {columns} dataSource={data}/>
          <Button type='primary' className='botton-insert'>Inserir novo fornecedor</Button>
     
      <Modal
        visible = {modalInsert}
        title = "Inserir Fornecedor"
        destroyOnClose={true}
        onCancel={openModalInsert}
        centered
        footer={[
          <Button onClick={openModalInsert}>Cancelar</Button>, 
          <Button type='primary'>Inserir</Button>, 
        ]}
        >
      <Form>
        <Item label = "Fornecedor">
        <Input name="fornecedor"/>
        </Item>
        
        <Item label = "pais">
        <Input name="pais"/>
        </Item>

        <Item label = "periodo de Atividade">
        <Input name="periodo"/>
        </Item>
      </Form>    
      </Modal>
      </div>

    </>
  )
}

export default App
