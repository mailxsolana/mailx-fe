import { Link } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import { Container } from "styles"
import { color } from "styles/theme"
import { Hex2Rgba } from "utils/helpers"

export const Home = styled.div`

`

export const Header = styled.div`

    height:90px;
    display:flex;
    align-items:center;

    & ${Container} {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`

export const Logo = styled.div`
    & img{
        width:125px;
    }
`

export const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    

`

export const NavItema = styled.a`
    color: ${color.darkerGray};
    padding:8px 16px;
    font-weight:500;
    text-decoration:none;

    &:hover {
        color: ${color.primary};
    }
`

export const NavItemL = styled(Link)`
    margin-left:8px;
    text-decoration:none;
    cursor:pointer;
    color: ${color.white};
    font-size:16px;
    background: linear-gradient(87.12deg, #3166DF 0%, #4A7FF7 100%);
    & svg {
        width:24px;
        height:24px;
        color: ${color.white};
        margin-left:8px;
    }
    padding:8px 48px;
    border-radius:48px;
    display:flex;
    align-items:center;
    justify-content:center;
    width:fit-content;
    transition: all 0.1s ease-in-out;
    &:hover {
        background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
        box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
    }

`

export const Hero = styled.div`
    text-align: center;
    background: #D8E1F3;
    padding-top:80px;
    border-radius:16px;
`

export const HeroText = styled.div`
    font-size: 20px;
    color: ${color.primary};
    font-weight: 500;
`

export const HeroTitle = styled.div`
    font-size: 48px;
    & span {
        color: ${color.primary};
    }
    font-weight: 600;
`

export const HeroDesc = styled.div`
    font-size: 20px;
    color: ${color.darkerGray};
    font-weight: 500;
    margin-bottom: 40px;
`

export const HeroActions = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
`

export const HeroAction = styled(Link)`

    padding:8px 48px;
    border-radius:48px;
    display:flex;
    align-items:center;
    justify-content:center;
    width:fit-content;
    text-decoration:none;
    cursor:pointer;
    transition: all 0.1s ease-in-out;
    font-size:18px;
    &:first-child {
        color: ${color.white};
        background: linear-gradient(87.12deg, #3166DF 0%, #4A7FF7 100%);
        
        &:hover {
            background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
            box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
        }
        margin-right:24px;
    }
    &:last-child {
        border: 1px solid ${color.darkerGray};
        background: transparent;
        color: ${color.darkerGray};

        &:hover {
            background: ${color.darkerGray};
            color: ${color.white};
        }
    }
`

export const HeroImage = styled.div`
    margin-top:80px;
    & img{
        max-width: 930px;
        width: 100%;
    }
    

`

export const Domain = styled.div`
    background: ${color.lighterGray};
    margin-top:40px;
    border-radius:16px;
    padding:48px;
    margin-bottom:40px;
`

export const DomainUpper = styled.div`
    display:flex;
`

export const DomainUpperLeft = styled.div`
    flex:1;
`

export const DomainTitle = styled.div`
    font-weight:500;
    font-size:24px;

    & span {
        color: ${color.primary};
    }
`

export const DomainDesc = styled.div`
    color: ${color.darkerGray};
`

export const DomainUpperRight = styled.div`
    flex:1;
    display:flex;
    position:relative;
    align-items:center;
`

export const DomainSearchInput = styled.input`

    width:100%;
    height:40px;
    border-radius:32px;
    background:${color.white};
    border:2px solid ${color.lighterGray};
    padding:16px 24px;
    font-size:14px;
    color: ${color.darkerGray};
    margin-top:8px;
    margin-bottom:8px;
    outline:none;

    &::placeholder {
        color: ${color.gray};
    }

    &:focus {
        border:2px solid ${color.primary};
        
    }

`

export const DomainSearchButton = styled.div`
    position:absolute;
    right:8px;
    padding:4px 16px;
    border-radius:48px;
    display:flex;
    align-items:center;
    justify-content:center;
    width:fit-content;
    text-decoration:none;
    cursor:pointer;
    transition: all 0.1s ease-in-out;
    font-size:14px;
    color: ${color.white};
    background: linear-gradient(87.12deg, #3166DF 0%, #4A7FF7 100%);
        
    &:hover {
        background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
        box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
    }
    
`

export const DomainLower = styled.div`
    display:flex;
    align-items:center;
    background: ${color.white};
    border-radius:16px;
    padding:24px;
    margin-top:32px;
`

export const DomainLowerLeft = styled.div`
    flex:1;
`

export const DomainLowerLeftInfo = styled.div`
    display:flex;
    align-items:center;
`

export const DomainLowerLeftTitle = styled.div`
    font-weight:500;
    font-size:24px;
    margin-right:16px;
`

export const DomainStatus = styled.div<{active?:string}>`

    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${props => props.active === 'true' ? "#2FB444": color.danger};
    margin-right:8px;

`

export const DomainStatusText = styled.div`
    font-size:14px;
    color: ${color.darkerGray};
    font-weight:500;
`

export const DomainLowerLeftPrice = styled.div`
    font-size:24px;
    font-weight:600;
    color: ${color.primary};
`

export const DomainLowerRight = styled.div`
    flex:1;
    display:flex;
    justify-content:flex-end;
`

export const DomainBuyButton = styled.div`
    text-decoration:none;
    cursor:pointer;
    color: ${color.white};
    font-size:16px;
    background: linear-gradient(87.12deg, #3166DF 0%, #4A7FF7 100%);
    & svg {
        width:24px;
        height:24px;
        color: ${color.white};
        margin-left:8px;
    }
    padding:8px 48px;
    border-radius:48px;
    display:flex;
    align-items:center;
    justify-content:center;
    width:fit-content;
    transition: all 0.1s ease-in-out;
    &:hover {
        background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
        box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
    }
`