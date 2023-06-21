import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

// import '../custom.css';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/consultas`;

function ListagemConsultas() {
  console.log(baseURL);
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-consulta`);
  };

  const editar = (id) => {
    navigate(`/cadastro-consulta/${id}`);
  };

  const [dados, setDados] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Consulta excluída com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir a consulta`);
      });
  }

  React.useEffect(() => {
    console.log(baseURL)
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Consultas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Nova Consulta
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>ID Consulta</th>
                    <th scope='col'>Data</th>
                    <th scope='col'>ID Paciente</th>
                    <th scope='col'>Nome Paciente</th>
                    <th scope='col'>ID Médico</th>
                    <th scope='col'>Nome Médico</th>
                    <th scope='col'>ID Procedimento</th>
                    <th scope='col'>Nome Procedimento</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                    <td>{dado.id}</td>
                    <td>{dado.data}</td>
                      <td>{dado.idPaciente}</td>
                      <td>{dado.nomePaciente}</td>
                      <td>{dado.idMedico}</td>
                      <td>{dado.nomeMedico}</td>
                      <td>{dado.idProcedimento}</td>
                      <td>{dado.nomeProcedimento}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{' '}
            </div>
          </div> 
        </div>
      </Card>
    </div>
  );
}

export default ListagemConsultas;