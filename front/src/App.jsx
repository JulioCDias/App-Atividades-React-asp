import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AtividadeForm from './components/AtividadeForm';
import ListaAtividades from './components/ListaAtividades';
import api from './api/atividade';

function App() {
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({ id: 0, prioridade: 'NaoDefinido', titulo: '', descricao: '' });

  const handleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal);
  const handleConfirmModal = (id) => {
    if (id !== 0 && id !== undefined) {
      const atividade = atividades.filter((atividade) => atividade.id === id);
      setAtividade(atividade[0]);
    } else {
      setAtividade({id:0});
    }
    setSmShowConfirmModal(!smShowConfirmModal)
  };

  const pegaTodasAtividades = async() => {
    const response = await api.get('atividade');
    return response.data;
  }
  
  const novaAtividade = () => {
    setAtividade({ id: 0 })
    handleAtividadeModal();
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
    handleAtividadeModal();
  }


  function alterarAtividade(id) {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
    handleAtividadeModal();
  }

  const atualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    const { id } = response.data
    setAtividades(atividades.map((a) => (a.id === id ? response.data : a)))
    setAtividade({ id: 0 })
    handleAtividadeModal();
  }

  function cancelarAtividade() {
    setAtividade({ id: 0 })
    handleAtividadeModal();
  }

  const deletarAtividade = async (id) => {
    handleConfirmModal(0);
    if (await api.delete(`atividade/${id}`)) {
      setAtividades(atividades.filter((atividade) => atividade.id !== id))
    }
  
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
        <h1 className='m-0 p-0'>Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>
      <ListaAtividades
        atividades={atividades}
        alterarAtividade={alterarAtividade}
        handleConfirmModal={handleConfirmModal} />
      
      <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1 className='m-0 p-0'>Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm
            addAtividade={addAtividade}
            cancelarAtividade={cancelarAtividade}
            atualizarAtividade={atualizarAtividade}
            ativSelecionada={atividade}
            atividades={atividades} />
        </Modal.Body>
      </Modal>

      <Modal
        size="sm"
        show={smShowConfirmModal}
        onHide={handleConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className='m-0 p-0'>Excluindo Atividade {atividade.id !== 0 ? atividade.id : ''}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="text-center">Tem certeza que deseja excluir? {atividade.id}</h4>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="success" onClick={()=> deletarAtividade(atividade.id)}>
            <i className="fas fa-check me-2"></i>
            Sim
          </Button>
          <Button variant="danger" onClick={()=>handleConfirmModal(0)}>
            <i className="fas fa-times me-2"></i>
            Não
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default App
