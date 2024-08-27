using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        public readonly IAtividadeService _atividadeService;

        /// <summary>
        /// Inicializa uma nova instância de <see cref="AtividadeController"/> com o serviço de atividade especificado.
        /// </summary>
        /// <param name="atividadeService">O serviço de atividade a ser utilizado pelo controlador.</param>
        public AtividadeController(IAtividadeService atividadeService)
        {
            _atividadeService = atividadeService;
        }

        /// <summary>
        /// Obtém todas as atividades.
        /// </summary>
        /// <returns>Uma lista de todas as atividades, ou NoContent se não houver atividades.</returns>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var atividades = await _atividadeService.PegarTodasAtividadesAsync();
                if (atividades == null) return NoContent();

                return Ok(atividades);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar Atividades. Erro: {ex.Message}");
            }
        }

        /// <summary>
        /// Obtém uma atividade específica pelo ID.
        /// </summary>
        /// <param name="id">O ID da atividade a ser obtida.</param>
        /// <returns>A atividade correspondente ao ID fornecido, ou NoContent se não for encontrada.</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var atividade = await _atividadeService.PegarAtividadePorIdAsync(id);
                if (atividade == null) return NoContent();

                return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar Atividade com o ID = {id}. Erro: {ex.Message}");
            }
        }

        /// <summary>
        /// Adiciona uma nova atividade.
        /// </summary>
        /// <param name="model">O modelo da atividade a ser adicionada.</param>
        /// <returns>A atividade recém-criada, ou NoContent se não puder ser criada.</returns>
        [HttpPost]
        public async Task<IActionResult> Post(Atividade model)
        {
            try
            {
                var atividade = await _atividadeService.AdicionarAtividade(model);
                if (atividade == null) return NoContent();

                return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar Adicionar Atividade. Erro: {ex.Message}");
            }
        }

        /// <summary>
        /// Atualiza uma atividade existente.
        /// </summary>
        /// <param name="id">O ID da atividade a ser atualizada.</param>
        /// <param name="model">O modelo atualizado da atividade.</param>
        /// <returns>A atividade atualizada, ou um código de status apropriado se a operação falhar.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Atividade model)
        {
            try
            {
                if (model.Id != id)
                {
                    return this.StatusCode(StatusCodes.Status409Conflict,
                    $"Você está tentando atualizar uma atividade errada.");
                }
                var atividade = await _atividadeService.AtualizarAtividade(model);
                if (atividade == null) return NoContent();

                return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar Atualizar Atividade. Erro: {ex.Message}");
            }
        }

        /// <summary>
        /// Deleta uma atividade específica pelo ID.
        /// </summary>
        /// <param name="id">O ID da atividade a ser deletada.</param>
        /// <returns>Uma mensagem de confirmação de deleção ou um código de status apropriado se a operação falhar.</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var atividade = await _atividadeService.PegarAtividadePorIdAsync(id);
                if (atividade == null)
                {
                    return this.StatusCode(StatusCodes.Status409Conflict,
                    $"Você está tentando deletar uma atividade que não existe.");
                }

                if (await _atividadeService.DeletarAtividade(id))
                {
                    return Ok(new { message = "Atividade deletada" });
                }
                else
                {
                    return BadRequest("Não foi possível deletar a atividade");
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar Deletar Atividade com o ID = {id}. Erro: {ex.Message}");
            }
        }
    }
}
