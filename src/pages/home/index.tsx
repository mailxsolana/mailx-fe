import React, { useEffect } from "react";
import { Container } from "styles";
import * as C from "./style";

const Home = () => {

    return (
        <C.Home>
            <C.Header>
                <Container>
                    <C.Logo>
                        <img src="/logo.png" alt="logo" />
                    </C.Logo>

                    <C.Nav>
                        <C.NavItema href="#">
                            Whitepaper
                        </C.NavItema>
                        <C.NavItema href="https://twitter.com/mailx_sol" target="_blank">
                            Twitter
                        </C.NavItema>
                        <C.NavItema href="https://discord.gg/cWPHPHujAM" target="_blank">
                            Discord
                        </C.NavItema>
                        <C.NavItemL to="/dashboard">
                            Launch MailX
                        </C.NavItemL>
                    </C.Nav>
                </Container>

            </C.Header>

            <Container>

                <C.Hero>

                    <C.HeroText>
                        WE ARE ON GRIZZLYTHON
                    </C.HeroText>
                    <C.HeroTitle>
                        Stay in touch on Web3, with Mail<span>X</span>
                    </C.HeroTitle>
                    <C.HeroDesc>
                        Decentralized, end to end encrypted, transactionless, open source, and free email service.
                    </C.HeroDesc>

                    <C.HeroActions>
                        <C.HeroAction to="/dashboard">
                            Launch MailX
                        </C.HeroAction>
                        <C.HeroAction to="/dashboard">
                            Search & Buy Domain
                        </C.HeroAction>
                    </C.HeroActions>

                    <C.HeroImage>
                        <img src="/hero.png" alt="hero" />
                    </C.HeroImage>

                </C.Hero>

{/*
                <C.Domain>
                    <C.DomainUpper>
                        <C.DomainUpperLeft>
                            <C.DomainTitle>
                                Find your Mail<span>X</span> <span>Web3</span> domain.
                            </C.DomainTitle>
                            <C.DomainDesc>
                                Mail<span>X</span> is a decentralized email service that allows you to send and receive emails on the blockchain. Mail<span>X</span> domains are unique and can be used to send and receive emails on the blockchain.
                            </C.DomainDesc>
                        </C.DomainUpperLeft>
                        <C.DomainUpperRight>
                                <C.DomainSearchInput type="text" placeholder="Search for a domain" />
                                <C.DomainSearchButton>
                                    Search
                                </C.DomainSearchButton>
                        </C.DomainUpperRight>
                    </C.DomainUpper>
                    <C.DomainLower>
                        <C.DomainLowerLeft>
                            <C.DomainLowerLeftInfo>
                                <C.DomainLowerLeftTitle>
                                    domainname
                                </C.DomainLowerLeftTitle>
                                <C.DomainStatus active="true"></C.DomainStatus>
                                <C.DomainStatusText>
                                    Available
                                </C.DomainStatusText>
                            </C.DomainLowerLeftInfo>
                            <C.DomainLowerLeftPrice>
                                20.00 USDC
                            </C.DomainLowerLeftPrice>
                        </C.DomainLowerLeft>
                        <C.DomainLowerRight>
                            <C.DomainBuyButton>
                                Buy Now
                            </C.DomainBuyButton>
                        </C.DomainLowerRight>
                    </C.DomainLower>
                </C.Domain>
                */}

            </Container>


        </C.Home>
    );
}

export default Home;
