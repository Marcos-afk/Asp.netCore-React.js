using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuncaoController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public FuncaoController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            try
            {
                string query = @"SELECT Funcao.codigo, Funcao.nome, Funcao.descricao, Perfil.codigo, Perfil.nome, Perfil.cidade, Perfil.telefone, Perfil.data_inclusao FROM Funcao
                INNER JOIN Perfil ON Funcao.codigo_perfil = Perfil.codigo;";
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("Clientes");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand command = new SqlCommand(query, myConn))
                    {
                        myReader = command.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myConn.Close();
                    }
                }

                if (table.Rows.Count < 1)
                {
                    return new JsonResult("Sistema vázio!");
                }

                return new JsonResult(table);

            }
            catch (Exception error)
            {
                return new JsonResult("Ocorreu uma exceção! " + error);
            }
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            try
            {
                string query = @"SELECT * FROM dbo.Funcao WHERE codigo = " + id + @"";
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("Clientes");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand command = new SqlCommand(query, myConn))
                    {
                        myReader = command.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myConn.Close();
                    }
                }

                if (table.Rows.Count < 1)
                {
                    return new JsonResult("Função não existe no sistema");
                }

                return new JsonResult(table);
            }
            catch (Exception error)
            {
                return new JsonResult("Ocorreu uma exceção! " + error);

            }
        }

        [HttpPost]
        public JsonResult Post(Funcao funcao)
        {

            if (String.IsNullOrEmpty(funcao.nome) || String.IsNullOrEmpty(Convert.ToString(funcao.codigo_perfil)))
            {
                return new JsonResult("Erro! Preencha os campos obrigatórios");
            }

            try
            {
                string query = @"SELECT * FROM dbo.Perfil WHERE codigo = " + funcao.codigo_perfil + @"";
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("Clientes");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand command = new SqlCommand(query, myConn))
                    {
                        myReader = command.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myConn.Close();
                    }
                }

                if (table.Rows.Count < 1)
                {
                    return new JsonResult("perfil não existe no sistema");
                }

                query = @"INSERT INTO dbo.Funcao VALUES(
                '" + funcao.nome + @"',
                '" + funcao.descricao + @"',
                '" + funcao.codigo_perfil + @"'
                )";

                 table = new DataTable();
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand command = new SqlCommand(query, myConn))
                    {
                        myReader = command.ExecuteReader();
                        table.Load(myReader);

                        myReader.Close();
                        myConn.Close();
                    }
                }

                return new JsonResult("Função adicionada com sucesso!");
            }
            catch (Exception error)
            {
                return new JsonResult("Ocorreu uma exceção! : " + error);
            }
        }

        [HttpPut("{id}")]
        public JsonResult Put(Funcao funcao, int id)
        {
            if (String.IsNullOrEmpty(funcao.nome) || String.IsNullOrEmpty(Convert.ToString(funcao.codigo_perfil)))
            {
                return new JsonResult("Erro! Preencha os campos obrigatórios");
            }

            try
            {
                string query = @"SELECT * FROM dbo.Perfil WHERE codigo = " + funcao.codigo_perfil + @"";
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("Clientes");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand command = new SqlCommand(query, myConn))
                    {
                        myReader = command.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myConn.Close();
                    }
                }

                if (table.Rows.Count < 1)
                {
                    return new JsonResult("perfil não existe no sistema");
                }
                
                query = @"UPDATE dbo.Funcao  SET
                    nome = '" + funcao.nome + @"',
                    descricao = '" + funcao.descricao + @"',
                    codigo_perfil = '" + funcao.codigo_perfil + @"'
                    WHERE codigo = " + id + @"
                    ";


                table = new DataTable();
                sqlDataSource = _configuration.GetConnectionString("Clientes");
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand command = new SqlCommand(query, myConn))
                    {
                        myReader = command.ExecuteReader();
                        table.Load(myReader);

                        myReader.Close();
                        myConn.Close();
                    }
                }



                return new JsonResult("Função Atualizada com sucesso!");
            }
            catch (Exception error)
            {
                return new JsonResult("Ocorreu uma exceção : " + error);
            }
        }

        [HttpDelete("{id}")]
        public JsonResult Delete( int id)
        {
            try
            {
                string query = @"DELETE FROM Funcao WHERE codigo = " + id + @"";
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("Clientes");
                SqlDataReader myReader;

                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand command = new SqlCommand(query, myConn))
                    {
                        myReader = command.ExecuteReader();
                        table.Load(myReader);

                        myReader.Close();
                        myConn.Close();
                    }
                }

                return new JsonResult ("Função apagada com sucesso!");
            }
            catch (Exception error)
            {
                return new JsonResult("Ocorreu uma exceção : " + error);
            }
        }
    }
}
