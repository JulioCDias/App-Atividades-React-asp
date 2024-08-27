using System;
using Moq;
using ProAtividade.API.Controllers;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Xunit;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProAtividade.Tests
{
    public class AtividadeControllerTests
    {
        private readonly Mock<IAtividadeService> _serviceMock;
        private readonly AtividadeController _controller;

        public AtividadeControllerTests()
        {
            _serviceMock = new Mock<IAtividadeService>();
            _controller = new AtividadeController(_serviceMock.Object);
        }

        [Fact]
        public async Task GetAll()
        {
            //Configurando o mock para retornar uma lista de atividades
            var atividades = new List<Atividade> { new Atividade { Id = 1, Titulo = "Teste Atividade 1" } };
            _mockAtividadeService.Setup(x => x.PegaTodasAsync()).ReturnsAsync(atividades);

            //Chamando o Metodo get do controlador
            var result = await _controller.Get();

            //Verificando se o resultado pe do tipo Ok() e se tem uma lista
            var Okresult = Assert.IsType<OkObjectResult>(result.Result);
            var returnList = Assert.IsAssignableFrom<IEnumerable<Atividade>>(Okresult.Value);
            Assert.Single(returnList);
        }

        [Fact]
        public async Task GetById()
        {
            //Configurando o mock para retornar uma atividade por id
            var atividade = new Atividade { Id = 1, Titulo = "Teste Atividade 1" };
            _mockAtividadeService.Setup(x => x.PegarAtividadePorIdAsync(1)).ReturnsAsync(atividade);

            var result = await _controller.Get(1);// id invalido

            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task Post()
        {
            var atividade = new Atividade { Id = 1, Titulo = "Nova Atividade" };
            _mockAtividadeService.Setup(service => service.AdicionarAtividade(It.IsAny<Atividade>()))
                                 .ReturnsAsync(atividade);

            var result = await _controller.Post(atividade);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<Atividade>(okResult.Value);
            Assert.Equal(atividade.Id, returnValue.Id);
        }

        [Fact]
        public async Task Put()
        {
            var atividade = new Atividade { Id = 1, Titulo = "Atividade Atualizada" };
            _mockAtividadeService.Setup(service => service.AtualizarAtividade(It.IsAny<Atividade>()))
                                 .ReturnsAsync(atividade);

            var result = await _controller.Put(1, atividade);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<Atividade>(okResult.Value);
            Assert.Equal(atividade.Titulo, returnValue.Titulo);
        }

        [Fact]
        public async Task Delete()
        {
            _mockAtividadeService.Setup(service => service.PegarAtividadePorIdAsync(It.IsAny<int>()))
                         .ReturnsAsync(new Atividade { Id = 1 });
            _mockAtividadeService.Setup(service => service.DeletarAtividade(It.IsAny<int>()))
                                 .ReturnsAsync(true);

            var result = await _controller.Delete(1);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<OkObjectResult>(okResult);
            Assert.Equal("Atividade deletada", ((dynamic)returnValue.Value).message);
        }
    }
}