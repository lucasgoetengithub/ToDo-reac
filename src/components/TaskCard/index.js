import React from 'react';
import * as S from './styles'


import iconDefault from '../../assets/default.png'

function TaskCard() {
    return (
        <S.Container>
          <S.TopCard>
            <img src={iconDefault} alt="Icone da Tarefa"></img>
            <h3>Título da tarefa</h3>
          </S.TopCard>

          <S.BottomCard>
            <strong>17/10/2022</strong>
            <span>18:51</span>
          </S.BottomCard>
        </S.Container>
    )
}

export default TaskCard;