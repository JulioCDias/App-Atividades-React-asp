using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Atividade.API.Models;
using Atividade.API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Atividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly JsonRepository<AtividadeModel> _repository;

        public AtividadeController()
        {
            string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "atividades.json");
            _repository = new JsonRepository<AtividadeModel>(filePath);
        }

        [HttpGet]
        public IEnumerable<AtividadeModel> Get()
        {
            return _repository.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<AtividadeModel> Get(int id)
        {
            var atividade = _repository.GetAll().FirstOrDefault(ativ => ativ.Id == id);
            if (atividade == null)
            {
                return NotFound();
            }
            return atividade;
        }

        [HttpPost]
        public ActionResult<IEnumerable<AtividadeModel>> Post(AtividadeModel ativ)
        {
            _repository.Add(ativ, a => a.Id, (a, id) => a.Id = id); // Auto incremento de ID
            return Ok(_repository.GetAll());
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, AtividadeModel updatedAtiv)
        {
            var existingAtiv = _repository.GetAll().FirstOrDefault(ativ => ativ.Id == id);
            if (existingAtiv == null)
            {
                return NotFound();
            }

            _repository.Update(updatedAtiv, id, ativ => ativ.Id);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var atividade = _repository.GetAll().FirstOrDefault(ativ => ativ.Id == id);
            if (atividade == null)
            {
                return NotFound();
            }

            _repository.Delete(id, ativ => ativ.Id);
            return NoContent();
        }
    }
}
