import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function FunctionScreen(props){
    
    const [functions, setFunctions] = useState([])
    const [error, setError] = useState('')


    function deleteFunction(func) {
        if(window.confirm('Deseja apagar essa função ?')){
            axios.delete(`http://localhost:5000/api/Funcao/${func.codigo}`).then(response =>{
                    alert(response.data)
                    document.location.href = '/functions'
                }).catch(error =>{
                    alert(error)
                })
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/Funcao').then( response => {
            setFunctions(response.data)
        }).catch((error) =>{
            setError(error)
        })
    }, [])

    return(
        <div>
            <div className="button-table"> 
                    <button onClick={() => {props.history.push('/function/add')}}>Adicionar Função</button>
            </div>
            {
                error ? alert('Ocorreu um erro : ' + error)
                :
                (
                    <table className="table">
                        <thead>
                            <th>Código</th>
                            <th>Função</th>
                            <th>Nome de Perfil</th>
                            <th>Telefone</th>
                            <th>Cidade</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </thead>
                        <tbody>
                            {
                                functions.map((func) =>(
                                    <tr key={func.codigo}>
                                        <td>{func.codigo}</td>
                                        <td>{func.nome}</td>
                                        <td>{func.nome1}</td>
                                        <td>{func.telefone}</td>
                                        <td>{func.cidade}</td>
                                        <td>{func.descricao}</td>
                                        <td>
                                            <button type="button" onClick={() =>{ props.history.push(`/function/edit/${func.codigo}`)}}> Editar </button>
                                            <button type="button" onClick={ () =>{deleteFunction(func)}}> Apagar</button>
                                            
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}