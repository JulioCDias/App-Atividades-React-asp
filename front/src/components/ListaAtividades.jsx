import Atividade from './Atividade';
import PropTypes from 'prop-types';

export default function ListaAtividades(props) {
  return (
      <div className="mt-3">
          {props.atividades.map(ativ => (
              <Atividade key={ativ.id}
                  ativ={ativ}
                  alterarAtividade={props.alterarAtividade}
                  deletarAtividade={props.deletarAtividade} />
          ))}
      </div>
  )
}
ListaAtividades.propTypes = {
    atividades: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            prioridade: PropTypes.string.isRequired,
            titulo: PropTypes.string.isRequired,
            descricao: PropTypes.string.isRequired,
        })
    ).isRequired,
    alterarAtividade: PropTypes.func.isRequired,
    deletarAtividade: PropTypes.func.isRequired,
};
