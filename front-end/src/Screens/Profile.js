import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Profile(props) {

    const [profiles, setProfiles] = useState([])
    const [error, setError] = useState('')


    function deleteProfile(Profile){
        if(window.confirm('Deseja apagar esse perfil ?')){
                axios.delete(`http://localhost:5000/api/Perfil/${Profile.codigo}`).then(response =>{
                    alert(response.data)
                    document.location.href = '/profile'
                }).catch(error =>{
                    alert(error)
                })
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/Perfil').then((response) => {
            setProfiles(response.data)
        }).catch((error)=>{
            setError(error)
        })
    },[])

    return(
        <div>
            <div className="button-table">
                <button onClick={() =>{props.history.push('/add')}}>Adicionar Perfil</button>
            </div>
            {
                error ? alert('Ocorreu um erro: ' + error)
                :
                (
                    <table className="table">
                        <thead>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Cidade</th>
                            <th>Data de inclusão</th>
                            <th>Ações</th>
                        </thead>
                        <tbody>
                            {
                                profiles.map((profile) => (
                                    <tr key={profile.codigo}>
                                        <td>{profile.codigo}</td>
                                        <td>{profile.nome}</td>
                                        <td>{profile.telefone}</td>
                                        <td>{profile.cidade}</td>
                                        <td>{profile.data_inclusao.substring(0, 10)}</td>
                                        <td>
                                            <button type="button" onClick={() =>{ props.history.push(`/edit/${profile.codigo}`)}}> Editar </button>
                                            <button type="button" onClick={() =>{deleteProfile(profile)}}> Apagar</button>
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