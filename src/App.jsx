import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Table, Button, Modal, Input, Form } from 'antd';
import './App.css'
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

const { Item } = Form
const baseUrl = "http://localhost:3001/fornecedor"

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

function App() {


  const [data, setData] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelit, setModalDelit] = useState(false);
  const [fornecedor, setFornecedor] = useState({
    id: '',
    fornecedor: '',
    pais: '',
    periodo: ''
  })

  const openCloseModalInsert = () => {
    setModalInsert(!modalInsert);
  }

  const openCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  }

  const openCloseModalDelit = () => {
    setModalDelit(!modalDelit);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setFornecedor({
      ...fornecedor,
      [name]: value
    });
    console.log(fornecedor);
  }

  const selectFornecedor = (fornecedor, caso) => {
    setFornecedor(fornecedor);
    (caso === "Editar") ? openCloseModalEdit() : openCloseModalDelit()
  }

  const columns = [
    {
      title: "Fornecedor",
      dataIndex: "fornecedor",
      key: "fornecedor",
    },
    {
      title: "País",
      dataIndex: "pais",
      key: "pais",
    },
    {
      title: "Periodo de Atividade",
      dataIndex: "periodo",
      key: "periodo",
    },
    {
      title: "Ações",
      key: "actions",
      render: (fila) => (

        <>
          <Button type="primary" className='botton-edit' onClick={() => selectFornecedor(fila, "Editar")}>Editar</Button> {"   "}
          <Button type="primary" className='botton-delit' danger onClick={() => selectFornecedor(fila, "Eliminar")}>
            Excluir
          </Button>
        </>
      ),
    },
  ];

  const requestGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }
  const requestPost = async () => {
    delete fornecedor.id;
    await axios.post(baseUrl, fornecedor)
      .then(response => {
        setData(data.concat(response.data));
        openCloseModalInsert();
      }).catch(error => {
        console.log(error);
      })
  }

  const requestPut = async () => {
    await axios.put(baseUrl + "/" + fornecedor.id, fornecedor)
      .then(response => {
        var dataAuxiliar = data;
        dataAuxiliar.map(elemento => {
          if (elemento.id === fornecedor.id) {
            elemento.fornecedor = fornecedor.fornecedor;
            elemento.pais = fornecedor.pais;
            elemento.periodo = fornecedor.periodo;
          }
        });
        setData(dataAuxiliar);
        openCloseModalEdit();
      }).catch(error => {
        console.log(error);
      })
  }


  const requestDelete = async () => {
    await axios.delete(baseUrl + "/" + fornecedor.id)
      .then(response => {
        setData(data.filter(elemento => elemento.id !== fornecedor.id));
        openCloseModalDelit();
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    requestGet();
  }, [])

  return (
    <>
      <div className="App">
        <Navbar />
        <Table className='table' columns={columns} dataSource={data} />
        <Button type="primary" className="botton-insert" onClick={openCloseModalInsert}>Inserir Fornecedor</Button>
        <Footer />
        <Modal
          visible={modalInsert}
          title="Inserir Fornecedor"
          destroyOnClose={true}
          onCancel={openCloseModalInsert}
          centered
          footer={[
            <Button onClick={openCloseModalInsert}>Cancelar</Button>,
            <Button type="primary" onClick={requestPost}>Inserir</Button>,
          ]}
        >
          <Form {...layout}>
            <Item label="Fornecedor">
              <Input name="fornecedor" onChange={handleChange} />
            </Item>

            <Item label="País">
              <Input name="pais" onChange={handleChange} />
            </Item>

            <Item label="Periodo de Atividade">
              <Input name="periodo" onChange={handleChange} />
            </Item>
          </Form>
        </Modal>

        <Modal
          visible={modalEdit}
          title="Editar Fornecedor"
          onCancel={openCloseModalEdit}
          centered
          footer={[
            <Button onClick={openCloseModalEdit}>Cancelar</Button>,
            <Button type="primary" onClick={requestPut}>Editar</Button>,
          ]}
        >
          <Form {...layout}>
            <Item label="Fornecedor">
              <Input name="fornecedor" onChange={handleChange} value={fornecedor && fornecedor.fornecedor} />
            </Item>

            <Item label="País">
              <Input name="pais" onChange={handleChange} value={fornecedor && fornecedor.pais} />
            </Item>

            <Item label="Periodo de Atividade">
              <Input name="periodo" onChange={handleChange} value={fornecedor && fornecedor.periodo} />
            </Item>
          </Form>
        </Modal>

        <Modal
          visible={modalDelit}
          onCancel={openCloseModalDelit}
          centered
          footer={[
            <Button onClick={openCloseModalDelit}>Não</Button>,
            <Button type="primary" danger onClick={requestDelete}>Sim</Button>,
          ]}
        >
          <pan>Tem certeza que deseja esxcluir esse fornecedor?</pan> <b>{fornecedor && fornecedor.fornecedor}</b>?
        </Modal>
      </div>

    </>
  )
}

export default App
