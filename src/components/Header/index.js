import React from 'react';
import * as S from './styles'

import logo from '../../assets/logo.png';

function Header() {
    return (
        <S.Container>
            <S.LeftSide>
                <img src={logo} alt="Logo"/>
            </S.LeftSide>
            <S.RigthSide>
                
            </S.RigthSide>
        </S.Container>
    )
}

export default Header;