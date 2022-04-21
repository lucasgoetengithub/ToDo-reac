import React, { useState, useEffect } from 'react';
import * as S from './styles'

import api from '../../services/api'
import { useParams, Navigate } from "react-router-dom";
import {format} from "date-fns";

//Componentes
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TypeIcons from '../../utils/typeIcons'

import iconCalender from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

function Task() {
    let params = useParams();
    const [lateCount, setLateCount] = useState();
    const [type, setType] = useState();
    const [id, setId] = useState();
    const [done, setDone] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [macaddress, setMacaddress] = useState('11:11:111:111:111:11');
    const [navigate, setNavigate] = useState(false);
    

    async function lateVerify() {
        await api.get(`/task/filter/late/11:11:111:111:111:11`)
        .then(response=> {
            setLateCount(response.data.length);
        })
    }

    async function LoadTaskDetails(){
        await api.get(`/task/${params.id}`)
        .then(response => {
            setType(response.data.type)
            setTitle(response.data.title)
            setDescription(response.data.description)
            setDate(format(new Date(response.data.when), 'yyyy-MM-dd'))
            setHour(format(new Date(response.data.when), 'HH:mm'))
            setDone(response.data.done)
        })
    }

    async function Save() {
        //validação dos dados
        if (!title)
            return alert("Você precisa informar o título da tarefa")
        else if (!description)
            return alert("Você precisa informar a descrição da tarefa")
        else if (!type)
            return alert("Você precisa informar o tipo da tarefa")
        else if (!date)
            return alert("Você precisa informar a data da tarefa")
        else if (!hour)
            return alert("Você precisa informar a hora da tarefa")


        if (params.id) {
            await api.put(`/task/${params.id}`, {
                macaddress,
                done,
                type,
                title,
                description,
                when : `${date}T${hour}:00.000`
            }).then(() => {
                setNavigate(true)
            })
        } else {
            await api.post('/task', {
                macaddress,
                type,
                title,
                description,
                when : `${date}T${hour}:00.000`
            }).then(() => {
                setNavigate(true)
            })
        }        
    }

    async function Remove() {
        const res = window.confirm('Deseja realmente remover a tarefa?');
        if (res === true){
            await api.delete(`/task/${params.id}`)
            .then(() => {
                setNavigate(true)
            })
        } 
        
    }

    useEffect(() =>{
        lateVerify();
        LoadTaskDetails();
    }, [])

    return (
        <S.Container>
            {navigate && <Navigate to="/home"/>}
            <Header lateCount={lateCount}/>

            <S.Form>
                <S.TypeIcons>
                    {
                        TypeIcons.map((icon, index) => (
                            index > 0 && 
                            <button type="button" onClick={() => setType(index)}>
                                <img src={icon} alt="Tipo da Tarefa" 
                                className={type && type != index && 'inative'}/>
                            </button>
                        ))
                    }
                </S.TypeIcons>

                <S.Input>
                    <span>Título</span>
                    <input type="text" placeholder='Título da tarefa...' onChange={e => setTitle(e.target.value)} value={title}/>
                </S.Input>

                <S.TextArea>
                    <span>Descrição</span>
                    <textarea rows={5} placeholder="Detalhes da tarefa..." 
                    onChange={e => setDescription(e.target.value)} value={description}
                    />
                </S.TextArea>

                <S.Input>
                    <span>Data</span>
                    <input type="Date" placeholder='Título da tarefa...' onChange={e => setDate(e.target.value)} value={date}/>
                    <img src={iconCalender} alt="Calendário"/>
                </S.Input>

                <S.Input>
                    <span>Hora</span>
                    <input type="Time" placeholder='Título da tarefa...' onChange={e => setHour(e.target.value)} value={hour}/>
                    <img src={iconClock} alt="Relógio"/>
                </S.Input>

                <S.Options>
                    <div>
                        <input type="checkbox" checked={done} onChange={() => setDone(!done)}/>
                        <span>CONCLUÍDO</span>
                    </div>
                    
                    {params.id && <button type="button" onClick={Remove}>EXCLUIR</button>}
                </S.Options>


                <S.Save>
                    <button type="button" onClick={Save}>SALVAR</button>
                </S.Save>
            </S.Form>


            <Footer/>
        </S.Container>
    )
}

export default Task;