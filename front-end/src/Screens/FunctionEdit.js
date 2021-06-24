import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function FunctionEdit(props){
    const FunctionId = props.match.params.id
    const [nome, setName] = useState('')
    const [descricao, setDescribe] = useState('')
    const [codigo_perfil, setProfileId] = useState('')
    const [func, setFunc] = useState([])

    useEffect(() =>{
        if(func.length === 0){
            axios.get(`http://localhost:5000/api/Funcao/${FunctionId}`).then( response =>{
                setFunc(response.data)
            }).catch( error =>{
                alert('Ocorreu uma exceção: ' + error)
            })
        }else{
            func.map((item) =>[
                setName(item.nome),
                setDescribe(item.descricao),
                setProfileId(item.codigo_perfil)
            ])
        }
    }, [func, FunctionId])

    function submitHandle(e) {
        e.preventDefault()
        const updateFunction = ({
            nome,
            descricao,
            codigo_perfil
        })

        axios.put(`http://localhost:5000/api/Funcao/${FunctionId}`, updateFunction).then( response =>{
            alert(response.data)
            props.history.push('/functions')
        }).catch(error =>{
            alert('ocorreu uma erro : ' + error)
        })
        
    }
    return(
        <div>
        <form className="form" onSubmit={submitHandle}>
        <h2>Adicionar Função : </h2>
            <div>
                <label htmlFor="name"> Nome da função</label>
                <input type="text" id="name" name="name" required value={nome} onChange={e => setName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="describe"> Descrição</label>
                <input type="text" id="describe" name="describe" required value={descricao} onChange={ e => setDescribe(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="profileId"> Código do perfil</label>
                <input type="number" id="profileId" name="profileId" required value={codigo_perfil} onChange={ e => setProfileId(e.target.value)}/>
            </div>
                <div>
                    <label/>
                    <button type="submit">Editar</button>
                </div>

        </form>
    </div>
    )
}