import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function ProfileEdit(props) {

    const profileId = props.match.params.id

    const [nome, setName] = useState('')
    const [telefone, setPhone] = useState('')
    const [cidade, setCity] = useState('')
    const [data_inclusao, setDate] = useState('')
    const [profile, setProfile] = useState([])
  
       useEffect(()=>{
        if(profile.length === 0){
            axios.get(`http://localhost:5000/api/Perfil/${profileId}`).then( response =>{
                setProfile(response.data)
       
               }).catch(error =>{
                   alert('ocorreu um erro: ' + error)
               }) 
        }else{

            profile.map(item => [
                
                    setName(item.nome),
                    setPhone(item.telefone),
                    setCity(item.cidade),
                    setDate(item.data_inclusao.substring(0, 10))      
            ])
        }
       }, [profileId, profile])
    
    function submitHandler(e) {
        e.preventDefault()
        const  updateProfile = ({
            nome, 
            telefone,
            cidade,
            data_inclusao
        })

        axios.put(`http://localhost:5000/api/Perfil/${profileId}`, updateProfile).then( response =>{
            alert(response.data)
            props.history.push('/profile')
        }).catch(error =>{
            alert(' ocorreu um erro : ' + error)
        })
    }

    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                    <h2>Editar Perfil : </h2>

                    <div>
                        <label htmlFor="name"> Nome </label>
                        <input type="text" id="name" name="name"  value={nome} required onChange={ e => { setName(e.target.value)}}/>
                    </div>
                    <div>
                        <label htmlFor="phone">Telefone</label>
                        <input type="text" id="phone"  value={telefone} name="phone" required onChange={e => {setPhone(e.target.value)}}/>
                    </div>
                    <div>
                        <label htmlFor="city"> Cidade</label>
                        <input type="text" id="city" value={cidade} name="city" required onChange={e =>{setCity(e.target.value)}}/>
                    </div>
                    <div>
                        <label htmlFor="date"> Data de inclusão</label>
                        <input type="date" id="date" value={data_inclusao} name="date" required onChange={e => {setDate(e.target.value)}}/>
                    </div>
                    <div>
                        <label/>
                        <button type="submit">Atualizar</button>
                    </div>
            </form>
        </div>
    )
}