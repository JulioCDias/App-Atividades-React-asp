import PropTypes from 'prop-types';

export default function Atividade(props) {
  function labelPrioridade(param) {
    switch (param) {
      case 'Baixa':
      case 'Normal':
      case 'Alta':
        return param;
      default:
        return 'Selecionar...';
    }
  }
  function stylePrioridade(param, icone) {
    switch (param) {
      case "Baixa":
        return icone ? 'fa-regular fa-face-smile' : 'success';
      case "Normal":
        return icone ? 'fa-regular fa-face-meh' : 'dark';
      case "Alta":
        return icone ? 'fa-regular fa-face-frown' : 'warning';
      default:
        return 'Não selecionado';
    }
  }

  return (
    <div className={"card mb-3 shadow-sm border-" + stylePrioridade(props.ativ.prioridade)}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
            <span className="badge rounded-pill text-bg-info">{props.ativ.id} </span> - {props.ativ.titulo}
          </h5>
          <h6>
            Prioridade:
            <span className={'me-1 text-' + stylePrioridade(props.ativ.prioridade)}>
              <i className={'ms-1 ' + stylePrioridade(props.ativ.prioridade, true)}></i> {labelPrioridade(props.ativ.prioridade)}
            </span>
          </h6>
        </div>
        <p className="card-text">{props.ativ.descricao}</p>
        <div className="d-flex justify-content-end pt-2 m-0 border-top">
          <button className="btn-sm btn btn-outline-primary me-2" onClick={() => props.alterarAtividade(props.ativ.id)}>
            <i className='fas fa-pen me-2'></i>
            Editar
          </button>
          <button className="btn-sm btn btn-outline-danger" onClick={() => props.deletarAtividade(props.ativ.id)}>
            <i className='fas fa-trash me-2'></i>
            Deletar
          </button>
        </div>
      </div>
    </div>
  )
}

Atividade.propTypes = {
  ativ: PropTypes.shape({
    id: PropTypes.number.isRequired,
    prioridade: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
  }).isRequired,
  alterarAtividade: PropTypes.func.isRequired,
  deletarAtividade: PropTypes.func.isRequired,
};