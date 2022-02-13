import styled from 'styled-components';


export const Container = styled.div`
    width:100%;
    height: 70px;
    background: #20295F;
    border-bottom:5px solid #EE6B26;
    display: flex;
`


export const LeftSide = styled.div`
    width: 50%;
    height: 70px;
    img {
        width: 100px;
        heigth: 40px;
    }

    display: flex;
    align-items: center;
    padding-left: 10px;
`

export const RigthSide = styled.div`
    width: 50%;
    height: 70px;
`