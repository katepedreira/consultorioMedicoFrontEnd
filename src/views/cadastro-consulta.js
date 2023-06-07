import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

// import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroConsulta() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/consultas`;

  const [id, setId] = useState('');
  const [data, setData] = useState('');
  const [idPaciente, setIdPaciente] = useState(0);
  const [idMedico, setIdMedico] = useState(0);
  const [IdProcedimento, setIdProcedimento] = useState(0);

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setData('');
      setIdPaciente('');
      setIdMedico('');
      setIdProcedimento(0);
    } else {
      setId(dados.id);
      setData(dados.data);
      setIdPaciente(dados.idPaciente);
      setIdMedico(dados.idMedico);
      setIdProcedimento(dados.IdProcedimento);
    }
  }

  async function salvar() {
    let data = { id, data, idPaciente, idMedico, IdProcedimento};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Consulta ${id} cadastrada com sucesso!`);
          navigate(`/listagem-consultas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Consulta ${id} alterada com sucesso!`);
          navigate(`/listagem-consultas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam != null) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setData(dados.data);
      setIdPaciente(dados.idPaciente);
      setIdMedico(dados.idMedico);
      setIdProcedimento(dados.IdProcedimento);     
    }
  }

  // React.useEffect(() => {
  //   axios.get(baseURL).then((response) => {
  //     setDados(response.data);
  //   });
  // }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Consultas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Data: *' htmlFor='inputData'>
                <input
                  type='date'
                  id='inputData'
                  value={data}
                  className='form-control'
                  name='data'
                  onChange={(e) => setData(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='ID Paciente: *' htmlFor='inputIdPaciente'>
                <input
                  type='number'
                  id='inputIdPaciente'
                  value={idPaciente}
                  className='form-control'
                  name='idPaciente'
                  onChange={(e) => setIdPaciente(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='ID Médico: *' htmlFor='inputIdMedico'>
                <input
                  type='number'
                  id='inputIdMedico'
                  value={idMedico}
                  className='form-control'
                  name='idMedico'
                  onChange={(e) => setIdMedico(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='ID Procedimento: *' htmlFor='inputIdProcedimento'>
                <input
                  type='number'
                  id='inputIdProcedimento'
                  value={IdProcedimento}
                  className='form-control'
                  name='idProcedimento'
                  onChange={(e) => setIdProcedimento(e.target.value)}
                />
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroConsulta;