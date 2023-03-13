import styled from 'styled-components'
import { deviceMax, deviceMin } from './media'

export const Container = styled.div`
    max-width:1150px;
    margin:0 auto;
    width:100%;
    padding-left:15px;
    padding-right:15px;

    @media (min-width: 1370px) {
        max-width: 1280px;
    }
`

export const Row = styled.div`
    display:flex;
    flex-wrap:wrap;
    margin:0 -15px;
    /*width:100%;*/
`

interface ICol {
    col?: string,
    xl?: string,
    xs?: string,
    xxl?: string,
    xxxl?: string,
    xxxxl?: string,
    lg?: string,
    md?: string,
    sm?: string,
    _2k?: string,
    _4k?: string,
}

export const Col = styled.div<ICol>`
    padding-left:15px;
    padding-right:15px;
    width:100%;

    ${(props) => props.col && `
        max-width: ${100 / (12 / parseInt(props.col!))}%;
    `}
    
    ${props => (() => {

        var media = "";

        if (props.xs)
            media += `
                @media ${deviceMin.xs} {
                    max-width: ${100 / (12 / parseInt(props.xs!))}%
                }
            `

        if (props.sm)
            media += `
                @media ${deviceMin.sm} {
                    max-width: ${100 / (12 / parseInt(props.sm!))}%
                }
            `

        if (props.md)
            media += `
                @media ${deviceMin.md} {
                    max-width: ${100 / (12 / parseInt(props.md!))}%
                }
            `

        if (props.lg)
            media += `
                @media ${deviceMin.lg} {
                    max-width: ${100 / (12 / parseInt(props.lg!))}%
                }
            `

        if (props.xl)
            media += `
                @media ${deviceMin.xl} {
                    max-width: ${100 / (12 / parseInt(props.xl!))}%
                }
            `

        if (props.xxl)
            media += `
                @media ${deviceMin.xxl} {
                    max-width: ${100 / (12 / parseInt(props.xxl!))}%
                }
            `
        if (props.xxxl)
            media += `
                @media ${deviceMin.xxxl} {
                    max-width: ${100 / (12 / parseInt(props.xxxl!))}%
                }
            `

        if (props.xxxxl)
            media += `
                @media ${deviceMin.xxxxl} {
                    max-width: ${100 / (12 / parseInt(props.xxxxl!))}%
                }
            `

        if (props._2k)
            media += `
                @media ${deviceMin._2k} {
                    max-width: ${100 / (12 / parseInt(props._2k!))}%
                }
            `

        if (props._4k)
            media += `
                @media ${deviceMin._4k} {
                    max-width: ${100 / (12 / parseInt(props._4k!))}%
                }
            `

        return media;
    })()}
`;