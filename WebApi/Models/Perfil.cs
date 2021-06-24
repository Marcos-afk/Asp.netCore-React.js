using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Perfil
    {
        public int codigo { get; set;}
        public string nome { get; set;}
        public string telefone { get; set;}
        public string cidade { get; set;}
        public DateTime data_inclusao { get; set; }
    }
}
