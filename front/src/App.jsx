import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import AtividadeForm from './components/AtividadeForm';
import ListaAtividades from './components/ListaAtividades';

function App() {
  const [index, setIndex] = useState(0)
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({id:0});


  useEffect(() => {
    atividades.length <= 0 ? setIndex(1) : setIndex(Math.max.apply(Math, atividades.map(item => item.id)) + 1,)
  }, [atividades])


  function addAtividade(ativ) {
    setAtividades([...atividades, { ...ativ, id: index }]);
  }

  function alterarAtividade(id) {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
  }

  function atualizarAtividade(ativ) { //Seleção de atividades, nova ou atual.
    setAtividades(atividades.map((a) => (a.id === ativ.id ? ativ : a)))
    setAtividade({id: 0})
  }

  function cancelarAtividade() {
    setAtividade({id: 0})
  }

  function deletarAtividade(id) {
    setAtividades(atividades.filter((atividade) => atividade.id !== id))
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
