using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerfilController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public PerfilController( IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
    }



        [HttpGet]
        public JsonResult Get()
        {
            try
            {
                string query = @"SELECT codigo, nome, telefone, cidade, convert(varchar(10),data_inclusao,120) as data_inclusao FROM dbo.Perfil";

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
                    return new JsonResult("Sem perfils no sistema!");
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
                string query = @"SELECT codigo, nome, telefone, cidade, data_inclusao FROM dbo.Perfil WHERE codigo = " + id + @"";
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
               
                   return new JsonResult(table);
                
                
               
            }
            catch (Exception error)
            {
                return new JsonResult("Ocorreu uma exceção! " + error);

            }
        }

        [HttpPost]
        public JsonResult Post(Perfil perfil)
        {
            if (String.IsNullOrEmpty(perfil.nome) || String.IsNullOrEmpty(Convert.ToString(perfil.data_inclusao)) || String.IsNullOrEmpty(perfil.telefone))
            {
                return new JsonResult("Error! Preencha os campos Obrigatórios");
            }

            try
            {
                string query = @"INSERT INTO dbo.Perfil values (
            '" + perfil.nome + @"',
            '" + perfil.telefone + @"',
            '" + perfil.cidade + @"',
            '" + perfil.data_inclusao + @"'
            )";

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

                return new JsonResult("Perfil adicionado com sucesso!");

            }
            catch (Exception error)
            {
                return new JsonResult("Ocorreu uma exceção : " + error);
            }
        }

        [HttpPut("{id}")]
        public JsonResult Put(Perfil perfil, int id)
        {
            if (String.IsNullOrEmpty(perfil.nome) || String.IsNullOrEmpty(Convert.ToString(perfil.data_inclusao)) || String.IsNullOrEmpty(perfil.telefone))
            {
                return new JsonResult("Error! Preencha os campos Obrigatórios");
            }

            try
            {
                string query = @"UPDATE dbo.Perfil  SET
                    nome = '" + perfil.nome + @"', 
                    telefone = '" + perfil.telefone + @"',
                    cidade = '" + perfil.cidade + @"',
                    data_inclusao = '" + perfil.data_inclusao + @"'
                    WHERE codigo = " + id + @"
                    ";


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


                return new JsonResult("Perfil Atualizado com sucesso!");
            }catch(Exception error)
            {
                return new JsonResult("Ocorreu uma exceção! : " + error);
            }

        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            try
            {
                string query = @"DELETE FROM Perfil WHERE codigo = "+ id + @"";
          
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

                return new JsonResult("Perfil Apagado com sucesso!");

            }
            catch (Exception error)
            {
                return new JsonResult("Ocorreu uma exceção : " + error);
            }

        }

    }
}
