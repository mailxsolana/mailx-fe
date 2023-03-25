import { Link } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import { Container } from "styles"
import { deviceMax } from "styles/media"
import { color } from "styles/theme"
import { Hex2Rgba } from "utils/helpers"

export const Home = styled.div`

`

export const HeroBg = styled.div`
    position: absolute;
    z-index: -1;
    background: linear-gradient(76.45deg, #111827 0%, #192337 100%);
    height: 769px;
    width: 100%;

    & > img:nth-child(1) {
        position: absolute;
        top: 0;
        left: 0;
        max-width:460px;
        width: 100%;
    }

    & > img:nth-child(2) {
        position: absolute;
        bottom: 0;
        right: 0;
        max-width:860px;
        width: 100%;
    }

    @media ${deviceMax.md} {
        height:650px;
    }
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

export const MobileNavButton = styled.div`
    cursor:pointer;
    color: ${color.white};
    font-size:24px;

    @media ${deviceMax.md} {
        display: block;
    }

    display: none;
`

export const MobileNavClose = styled.div`
    position: absolute;
    top: 24px;
    right: 24px;
    cursor:pointer;
    color: ${color.white};
    font-size:24px;
`
export const MobileNav = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${Hex2Rgba(color.black, 0.95)};
    z-index: 999;
    display: none;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & > *:not(:last-child) {
        margin-bottom: 24px;
    }

    @media ${deviceMax.md} {
        display: flex;
    }
`

export const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media ${deviceMax.md} {
        display: none;
    }

`

export const NavItema = styled.a`
    color: ${color.white};
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
    padding-top:80px;
    border-radius:16px;
    /*background: url('/bg.png');
    background-size: cover;
    background-repeat: repeat;*/
    position: relative;

    height:679px;

    @media ${deviceMax.md} {
        height:560px;
    }
`

export const HeroText = styled.div`
    font-size: 20px;
    color: ${color.primary};
    font-weight: 500;

    @media ${deviceMax.md} {
        font-size: 14px;
    }
`

export const HeroTitle = styled.div`
    font-size: 48px;
    & span {
        color: ${color.primary};
    }
    color: ${color.white};
    font-weight: 600;

    @media ${deviceMax.md} {
        font-size: 32px;
        line-height:1.2;
    }
`

export const HeroDesc = styled.div`
    font-size: 20px;
    color: ${color.gray};
    font-weight: 500;
    margin-bottom: 40px;

    @media ${deviceMax.md} {
        font-size: 13px;
        margin-top: 16px;
    }
`

export const HeroActions = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;

    @media ${deviceMax.md} {
        flex-direction:column;
    }
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
        border: 1px solid ${color.lighterGray};
        background: transparent;
        color: ${color.lighterGray};

        &:hover {
            background: ${color.lighterGray};
            color: ${color.primary};
        }
    }

    @media ${deviceMax.md} {
        padding:8px 24px;
        margin-right:0px !important;

        &:first-child {
            margin-bottom:16px;
        }
    }
`

export const HeroImage = styled.div`
    display:flex;
    justify-content:center;
    width:100%;
    position: absolute;
    bottom: 0;
    & img{
        max-width: 930px;
        width: 100%;
        
    }
    

`

export const S1 = styled.div`
    display:flex;
    margin-top:80px;
    & > div:not(:last-child) {
        margin-right: 32px;
    }

    @media ${deviceMax.xl} {
        display: block;
    }
`

export const S1P1 = styled.div`
    flex:2;
    background-color:${color.black};
    color:${color.white};
    border-radius:16px;
    display:flex;

    @media ${deviceMax.md} {
        display: block;
        
    }

    @media ${deviceMax.xl} {
        margin-bottom: 32px;
        margin-right: 0 !important;
    }
`

export const S1P1Left = styled.div`
    
    padding-left:40px;
    padding-top:64px;
    padding-bottom:64px;
    padding-right:58px;

    @media ${deviceMax.md} {
        padding: 16px;
        padding-top: 24px;
        text-align: center;
    }
`

export const S1P1Title = styled.div`
    font-size: 36px;
    & span {
        color: ${color.primary};
    }
    font-weight: 600;
    line-height: 1.2;

    @media ${deviceMax.md} {
        font-size: 24px;
    }
`

export const S1P1Desc1 = styled.div`
    margin: 16px 0;
    font-size: 16px;
    color: ${color.lighterGray};
`

export const S1P1Desc2 = styled.div`
    color: ${color.gray};
    font-size: 14px;
    margin-bottom:46px;
`

export const S1P1Metrics = styled.div`
    display:flex;
    padding:16px;
    justify-content:space-between;
    align-items:center;
    background-color:#212A3C;
    border-radius:8px;

    @media ${deviceMax.md} {
        padding: 8px;
    }
`

export const S1P1Metric = styled.div`
    
`

export const S1P1MetricTitle = styled.div`
    font-size:24px;
    & span {
        color: ${color.primary};
    }
    font-weight: 700;

    @media ${deviceMax.md} {
        font-size: 18px;
    }
`

export const S1P1MetricDesc = styled.div`
    font-size:14px;
    color: ${color.lighterGray};

    @media ${deviceMax.md} {
        font-size: 12px;
    }
`

export const S1P1Right = styled.div`
    display:flex;
    padding-top:64px;
    padding-right:40px;

    @media ${deviceMax.md} {
        padding: 16px;
    }
`

export const S1P1Image = styled.div`
    & img {
        height:fit-content;
    }

    @media ${deviceMax.md} {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 260px;
        overflow: hidden;
    }
`

export const S1P2 = styled.div`
    flex:1;
    background-color:${color.black};
    color:${color.white};
    border-radius:16px;
    position: relative;
    overflow:hidden;

    @media ${deviceMax.md} {
        height: 320px;
    }

    @media ${deviceMax.xl} {
        height: 460px;
    }
`

export const S1P2Title = styled.div`
    display: none;
    font-size: 24px;
    font-weight: 600;
    padding: 16px;
    padding-top: 24px;
    line-height: 1.2;
    text-align: center;

    @media ${deviceMax.md} {
        display: block;
    }

    & span {
        color: ${color.primary};
    }

`
export const S1P2Title1 = styled.div`
    font-size: 36px;
    font-weight: 600;
    padding-left: 40px;
    line-height: 1.2;
    padding-top:64px;

    @media ${deviceMax.md} {
        display: none;
    }
`

export const S1P2Title2 = styled.div`
    font-size: 36px;
    font-weight: 600;
    padding-left: 40px;
    line-height: 1.2;
    & span {
        color: ${color.primary};
    }

    @media ${deviceMax.md} {
        display: none;
    }
`

export const S1P2Image = styled.div`
    width:100%;
    display:flex;
    justify-content:flex-end;
    position: absolute;
    bottom: 0;
    right: 0;
    & img {
        width:80%;
    }

    @media ${deviceMax.xl} {
        & img {
            width:50%;
        }
    }

    @media ${deviceMax.md} {
        & img {
            width:60%;
        }
    }

    @media ${deviceMax.sm} {
        & img {
            width:80%;
        }
    }
`

export const S2 = styled.div`
    margin-top:80px;
    text-align:center;
    display:flex;
    flex-direction:column;
    align-items:center;
`

export const S2Text = styled.div`
    font-size: 36px;
    font-weight: 600;
    line-height: 1.2;
    & span {
        color: ${color.primary};
    }

    @media ${deviceMax.md} {
        font-size: 24px;
    }
`

export const S2Desc = styled.div`
    font-size: 14px;
    color: ${color.darkerGray};
    margin-top:16px;
    margin-bottom:16px;
`

export const S2Button = styled(Link)`

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
    color: ${color.white};
    background: linear-gradient(87.12deg, #3166DF 0%, #4A7FF7 100%);
    
    &:hover {
        background: linear-gradient(87.12deg, #3166DF 0%, #004EFF 100%);
        box-shadow: 0px 4px 16px rgba(19, 79, 214, 0.32);
    }

    @media ${deviceMax.md} {
        width: 100%;
    }
    

`

export const S3 = styled.div<{reverse?:string}>`
    margin-top:80px;
    display:flex;
    align-items:center;

    @media ${deviceMax.md} {
        flex-direction: column;

        ${props => props.reverse === "true" && `
            flex-direction: column-reverse;
        `}
    }
`

export const S3Left = styled.div`
    width:50%;

    @media ${deviceMax.md} {
        width: 100%;
    }
`

export const S3LeftImage = styled.div`
    & img {
        width:100%;
        max-width: 500px;
    }

    @media ${deviceMax.md} {
        display: flex;
        justify-content: center;
    }
`

export const S3Right = styled.div`
    width:50%;

    @media ${deviceMax.md} {
        width: 100%;
        text-align: center;
        margin-top: 16px;
    }
`

export const S3RightTitle = styled.div`
    font-size: 36px;
    font-weight: 600;
    line-height: 1.2;
    & span {
        color: ${color.primary};
    }

    @media ${deviceMax.md} {
        font-size: 24px;
    }
`

export const S3RightDesc = styled.div`
    font-size: 16px;
    color: ${color.darkerGray};
    margin:16px 0;
    max-width: 90%;

    @media ${deviceMax.md} {
        max-width: 100%;
    }
`

export const S3RightDesc2 = styled.div`
    font-size: 14px;
    color: ${color.darkerGray};
    max-width: 90%;

    @media ${deviceMax.md} {
        max-width: 100%;
    }
`

export const S4 = styled.div`
    margin-top:80px;
    width:100%;
    background-image: url("/s4.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display:flex;
    flex-direction:column;
    align-items:center;
`

export const S4Title = styled.div`
    font-size: 40px;
    color: ${color.white};
    text-align:center;
    font-weight: 600;
    line-height: 1.2;
    padding-top:41px;
    padding-bottom:47px;
`

export const S4Image = styled.div`
    display:flex;
    & img{
        width:100%;
    }
`

export const Footer = styled.div`
    background-color: ${color.black};
    color: ${color.white};
    padding:48px 0;

    & ${Container} {
        display:flex;
        align-items:center;
        justify-content:space-between;

        @media ${deviceMax.md} {
            flex-direction:column;
        }
    }
    
`

export const FooterLeft = styled.div`

`

export const FooterLeftTitle = styled.div`
    font-size: 30px;
    font-weight: 600;
    line-height: 1.2;
    & span {
        color: ${color.primary};
    }
`

export const FooterLeftTitle2 = styled.div`
    font-size: 32px;
    font-weight: 600;
    line-height: 1.2;
    & span {
        color: ${color.primary};
    }
`

export const FooterRight = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-end;

    @media ${deviceMax.md} {
        align-items:center;
    }
`

export const FooterRightLogo = styled.div`
    
    & img {
        width:90px
    }
    margin-bottom:16px;
`

export const FooterRightMenu = styled.div`
    display:flex;

    @media ${deviceMax.md} {
        flex-direction:column;
        align-items:center;
    }
`

export const FooterRightMenuItema = styled.a`
    &:not(:last-child) {
        margin-right: 32px;
    }
    text-decoration:none;
    color: ${color.white};

    &:hover {
        color: ${color.primary};
    }
`

export const FooterRightMenuItemLink = styled(Link)<{primary?:string}>`
    &:not(:last-child) {
        margin-right: 32px;
    }
    text-decoration:none;
    color: ${color.white};

    &:hover {
        color: ${color.primary};
    }

    ${props => props.primary === "true" && `
        color: ${color.primary};
    `}
`