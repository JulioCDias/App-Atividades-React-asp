import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const atividadeInicial = {
    id: 0,
    prioridade: 'NaoDefinido',
    titulo: '',
    descricao: '',
}

export default function AtividadeForm(props) {
    const [atividade, setAtividade] = useState(atividadeAtual())

    useEffect(() => {
        if (props.ativSelecionada.id !== 0) {
            setAtividade(props.ativSelecionada);
        }
    }, [props.ativSelecionada]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.ativSelecionada.id !== 0) {
            props.atualizarAtividade(atividade);
        } else {
            props.addAtividade(atividade);
        }
        setAtividade(atividadeInicial);
    }

    const inputTextHandler = (e) => {
        const { name, value } = e.target;
        setAtividade({ ...atividade, [name]: value })
    }

    const handleCancelar = (e) => {
        e.preventDefault();
        props.cancelarAtividade();
        setAtividade(atividadeInicial)
    }

    function atividadeAtual() {
        if (props.ativSelecionada.id !== 0) {
            return props.ativSelecionada
        } else {
            return atividadeInicial;
        }
    }

    return (
        <>
            <h1>Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
            <form className='row g-3' onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label className="form-label">Titulo</label>
                    <input
                        name='titulo'
                        value={atividade.titulo}
                        onChange={inputTextHandler}
                        id="titulo"
                        type="text"
                        className="form-control" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Prioridade:</label>
                    <select
                        name='prioridade'
                        value={atividade.prioridade}
                        onChange={inputTextHandler}
                        id="prioridade"
                        className="form-select">
                        <option value='NaoDefinido'>Selecionar...</option>
                        <option value='Baixa'>Baixo</option>
                        <option value='Normal'>Normal</option>
                        <option value='Alta'>Alto</option>
                    </select>
                </div>
                <div className="col-md-16">
                    <label className="form-label">Descrição</label>
                    <textarea
                        name='descricao'
                        value={atividade.descricao}
                        onChange={inputTextHandler}
                        id="descricao"
                        type="text"
                        className="form-control" />
                    <hr />
                </div>
                <div className="col-12 mt-0">
                    {
                        atividade.id === 0 ? (
                            <button className='btn btn-outline-success' type='submit'>
                                <i className='fas fa-plus me-2'></i>
                                Cadastrar
                            </button>
                        ) : (
                            <>
                                <button className='btn btn-outline-success me-2' type='submit'>
                                    <i className='fas fa-check me-2'></i>
                                    Salvar
                                </button>
                                <button className='btn btn-outline-danger' onClick={handleCancelar}>
                                    <i className='fas fa-x me-2'></i>
                                    Cancelar
                                </button>
                            </>
                        )}
                </div>
            </form>
        </>
    )
}

AtividadeForm.propTypes = {
    addAtividade: PropTypes.func.isRequired,
    cancelarAtividade: PropTypes.func.isRequired,
    atualizarAtividade: PropTypes.func.isRequired,
    ativSelecionada: PropTypes.shape({
        id: PropTypes.number.isRequired,
        prioridade: PropTypes.oneOf(['NaoDefinido', 'Baixa', 'Normal', 'Alta']).isRequired,
        titulo: PropTypes.string.isRequired,
        descricao: PropTypes.string.isRequired
    }).isRequired,
    atividades: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            prioridade: PropTypes.string.isRequired,
            titulo: PropTypes.string.isRequired,
            descricao: PropTypes.string.isRequired
        })
    ).isRequired
};
