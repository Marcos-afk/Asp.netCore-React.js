import axios from 'axios'
import React, { useState } from 'react'

export default function ProfileADD(props) {

    const [nome, setName] = useState('')
    const [telefone, setPhone] = useState('')
    const [cidade, setCity] = useState('')
    const [data_inclusao, setDate] = useState('')
    
    function submitHandler(e) {
        e.preventDefault()
        const createdProfile = ({
            nome,
            telefone,
            cidade,
            data_inclusao
        })

        axios.post('http://localhost:5000/api/Perfil', createdProfile).then( response => {
         alert(response.data)
         props.history.push('/profile')
        }).catch((error) =>{
            alert('ocorreu um erro: ' + error)
        })
    }

    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                    <h2>Adicionar Perfil : </h2>

                    <div>
                        <label htmlFor="name"> Nome </label>
                        <input type="text" id="name" name="name" required onChange={ e => { setName(e.target.value)}}/>
                    </div>
                    <div>
                        <label htmlFor="phone">Telefone</label>
                        <input type="text" id="phone" name="phone" required onChange={e => {setPhone(e.target.value)}}/>
                    </div>
                    <div>
                        <label htmlFor="city"> Cidade</label>
                        <input type="text" id="city" name="city" required onChange={e =>{setCity(e.target.value)}}/>
                    </div>
                    <div>
                        <label htmlFor="date"> Data de inclusão</label>
                        <input type="date" id="date" name="date" required onChange={e => {setDate(e.target.value)}}/>
                    </div>
                    <div>
                        <label/>
                        <button type="submit">Adicionar</button>
                    </div>
            </form>
        </div>
    )
}