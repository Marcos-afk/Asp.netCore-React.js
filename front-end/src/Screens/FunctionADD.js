import axios from 'axios'
import React, {useState } from 'react'

export default function FunctionADD(props){
    const [nome, setName] = useState('')
    const [descricao, setDescribe] = useState('')
    const [codigo_perfil, setProfileId] = useState('')

    function submitHandle(e) {
        e.preventDefault()
        const createdFunction = ({
            nome,
            descricao,
            codigo_perfil
        })

        axios.post('http://localhost:5000/api/Funcao', createdFunction).then( response =>{
            alert(response.data)
            props.history.push('/functions')
        }).catch( error =>{
            alert(error)
        })
    }
    return(
        <div>
            <form className="form" onSubmit={submitHandle}>
            <h2>Adicionar Função : </h2>
                <div>
                    <label htmlFor="name"> Nome da função</label>
                    <input type="text" id="name" name="name" required onChange={e => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="describe"> Descrição</label>
                    <input type="text" id="describe" name="describe" required onChange={ e => setDescribe(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="profileId"> Código do perfil</label>
                    <input type="number" id="profileId" name="profileId" required onChange={ e => setProfileId(e.target.value)}/>
                </div>
                    <div>
                        <label/>
                        <button type="submit">Adicionar</button>
                    </div>

            </form>
        </div>
    )
}