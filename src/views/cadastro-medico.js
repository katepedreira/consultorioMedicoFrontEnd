import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

// import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroMedico() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/medicos`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [crm, setCrm] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [IdEndereco, setIdEndereco] = useState(0);

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setCrm('');
      setCpf('');
      setDataNascimento('');
      setIdEndereco(0);
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setCrm(dados.crm);
      setCpf(dados.cpf);
      setDataNascimento(dados.dataNascimento);
      setIdEndereco(dados.IdEndereco);
    }
  }

  async function salvar() {
    let data = { id, nome, crm, cpf, dataNascimento, IdEndereco };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Medico ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-medicos`);
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
          mensagemSucesso(`Medico ${nome} alterado com sucesso!`);
          navigate(`/listagem-medicos`);
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
      setNome(dados.nome);
      setCpf(dados.cpf);
      setCrm(dados.crm);
      setDataNascimento(dados.dataNascimento);
      setIdEndereco(dados.IdEndereco);
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
      <Card title='Cadastro de Médico'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='CRM: *' htmlFor='inputCrm'>
                <input
                  type='text'
                  maxLength='11'
                  id='inputCrm'
                  value={crm}
                  className='form-control'
                  name='crm'
                  onChange={(e) => setCrm(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='CPF: *' htmlFor='inputCpf'>
                <input
                  type='text'
                  maxLength='11'
                  id='inputCpf'
                  value={cpf}
                  className='form-control'
                  name='cpf'
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data de Nascimento: *' htmlFor='inputDataNascimento'>
                <input
                  type='date'
                  id='inputDataNascimento'
                  value={dataNascimento}
                  className='form-control'
                  name='dataNascimento'
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='ID Endereço: *' htmlFor='inputEndereco'>
                <input
                  type='text'
                  id='inputEndereco'
                  value={IdEndereco}
                  className='form-control'
                  name='IdEndereco'
                  onChange={(e) => setIdEndereco(e.target.value)}
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

export default CadastroMedico;