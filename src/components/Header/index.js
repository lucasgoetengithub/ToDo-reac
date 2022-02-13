import React from 'react';
import * as S from './styles'

import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';

function Header() {
    return (
        <S.Container>
            <S.LeftSide>
                <img src={logo} alt="Logo"/>
            </S.LeftSide>

            <S.RigthSide>
                <a href="#">INÍCIO</a>
                <a href="#">NOVA TAREFA</a>
                <a href="#">SINCRONIZAR O CELULAR</a>
                <a href="#" id="notification">
                    <img src={bell} alt="Notificação"/>
                    <span>5</span>
                </a>
            </S.RigthSide>
        </S.Container>
    )
}

export default Header;