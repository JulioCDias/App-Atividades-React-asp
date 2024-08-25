using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Atividade.API.Repositories;

namespace Atividade.API.Models
{
    public class AtividadeModel
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public string Prioridade { get; set; }

        public AtividadeModel()
        {

        }
        public AtividadeModel(int id)
        {
            Id = id;
        }
    }
}