import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import AtividadeForm from './components/AtividadeForm';
import ListaAtividades from './components/ListaAtividades';
import api from './api/atividade';

function App() {
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({ id: 0 });
  const pegaTodasAtividades = async() => {
    const response = await api.get('atividade');
    return response.data;
  }


  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades();
      if (todasAtividades) setAtividades(todasAtividades)
    };
    getAtividades()
  }, [])


  const addAtividade = async (ativ) => {
    const response = await api.post('atividade', ativ);
    setAtividades([...atividades, response.data]);
  }


  function alterarAtividade(id) {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
  }

  const atualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    const { id } = response.data
    setAtividades(atividades.map((a) => (a.id === id ? response.data : a)))
    setAtividade({id: 0})
  }

  function cancelarAtividade() {
    setAtividade({id: 0})
  }

  const deletarAtividade = async (id) => {
    if (await api.delete(`atividade/${id}`)) {
      setAtividades(atividades.filter((atividade) => atividade.id !== id))
    }
  
  }

  return (
    <>
      <AtividadeForm
        addAtividade={addAtividade}
        cancelarAtividade={cancelarAtividade}
        atualizarAtividade={atualizarAtividade}
        ativSelecionada={atividade}
        atividades={atividades} />
      <ListaAtividades
        atividades={atividades}
        alterarAtividade={alterarAtividade}
        deletarAtividade={deletarAtividade} />
    </>
  )
}

export default App
