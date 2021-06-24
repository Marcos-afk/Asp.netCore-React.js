import React from 'react'
export default function HomeScreen(props){

    const user = {
        name : 'Marcos André',
    }

    return(
        <div className="home">
            <div className="cont1">
                <h1>Bem vindo : {user.name}</h1>
                <div className="sub1">
                <h2>Opções: </h2>
                <ul>
                    <li><button type="button" onClick={() =>{ props.history.push('/add')}}>Adicionar Perfil</button></li>
                    <li><button type="button" onClick={() => {props.history.push('/function/add')}}> Adicionar Função</button></li>
                </ul>
                </div>
            </div>
            <div className="cont2">
                <h1>Principais novidades</h1> 
                <ul>
                    <li> Empresa abre novas vagas para o setor de comunicações</li>
                    <li> Aberta as inscrições para estágios em Ti</li>
                    <li> Abertura do evento de tecnologia e sociedade</li>
                    <li> Lista de novos contratados já disponível</li>
                    <li><button type="button" onClick={() => { props.history.push('/news')}}> Veja Mais</button></li>
                </ul>   
            </div>
        </div>
    )
}
