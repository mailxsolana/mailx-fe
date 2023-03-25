import styled, { keyframes } from "styled-components"
import { deviceMax } from "styles/media"
import { color } from "styles/theme"

export const Home = styled.div`
    display:flex;

    @media ${deviceMax.md} {
        flex-direction:column;
    }
` 