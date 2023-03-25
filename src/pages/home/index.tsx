import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Container } from "styles";
import * as C from "./style";

const Home = () => {

    const [mobileNavVisible, setMobileNavVisible] = React.useState(false);

    return (
        <C.Home>
            <C.HeroBg>
                <img src="/herobg1.png" />
                <img src="/herobg2.png" />
            </C.HeroBg>
            <C.Header>
                <Container>
                    <C.Logo>
                        <img src="/logo-white.png" alt="logo" />
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

                    {mobileNavVisible && (
                    <C.MobileNav>

                        <C.MobileNavClose onClick={() => setMobileNavVisible(false)}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </C.MobileNavClose>

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
                    </C.MobileNav>
                    )}

                    <C.MobileNavButton onClick={() => setMobileNavVisible(true)}>
                        <FontAwesomeIcon icon={faBars}/>
                    </C.MobileNavButton>
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

            </Container>

            <Container>
                <C.S1>
                    <C.S1P1>
                        <C.S1P1Left>
                            <C.S1P1Title>
                                Yes! <span>Fully decentralized</span>, not a little...
                            </C.S1P1Title>
                            <C.S1P1Desc1>
                                We don't trick you like other products, we created and it's done!
                            </C.S1P1Desc1>
                            <C.S1P1Desc2>
                                You own your data! Everything is kept on the blockchain and it is impossible for a 3rd parties to spy.
                            </C.S1P1Desc2>
                            <C.S1P1Metrics>
                                <C.S1P1Metric>
                                    <C.S1P1MetricTitle>
                                        110.000<span>+</span>
                                    </C.S1P1MetricTitle>
                                    <C.S1P1MetricDesc>
                                        Sent Emails
                                    </C.S1P1MetricDesc>
                                </C.S1P1Metric>
                                <C.S1P1Metric>
                                    <C.S1P1MetricTitle>
                                        25.000<span>+</span>
                                    </C.S1P1MetricTitle>
                                    <C.S1P1MetricDesc>
                                        Mail Accounts
                                    </C.S1P1MetricDesc>
                                </C.S1P1Metric>
                                <C.S1P1Metric>
                                    <C.S1P1MetricTitle>
                                        1.000<span>+</span>
                                    </C.S1P1MetricTitle>
                                    <C.S1P1MetricDesc>
                                        Domains
                                    </C.S1P1MetricDesc>
                                </C.S1P1Metric>
                            </C.S1P1Metrics>
                        </C.S1P1Left>
                        <C.S1P1Right>
                            <C.S1P1Image>
                                <img src="/s1p1.png" alt="s1p1" />
                            </C.S1P1Image>
                        </C.S1P1Right>
                    </C.S1P1>

                    <C.S1P2>
                        <C.S1P2Title>
                            Light, simple and <span>fast</span>!
                        </C.S1P2Title>
                        <C.S1P2Title1>
                            Light, simple
                        </C.S1P2Title1>
                        <C.S1P2Title2>
                            and <span>fast</span>!
                        </C.S1P2Title2>
                        <C.S1P2Image>
                            <img src="/s1p2.png" alt="s1p2" />
                        </C.S1P2Image>
                    </C.S1P2>
                </C.S1>

                <C.S2>
                    <C.S2Text>
                        <span>“</span>Send mail on the blockchain without signing a transaction... just like you're used to!<span>”</span>
                    </C.S2Text>
                    <C.S2Desc>
                        With our virtual wallet technology, experience simple and fast mail sending with tiny gas fees, just as you are used to in web2!
                    </C.S2Desc>
                    <C.S2Button to="/dashboard">
                        Explore MailX
                    </C.S2Button>
                </C.S2>

                <C.S3>
                    <C.S3Left>
                        <C.S3LeftImage>
                            <img src="/s3p1.png" alt="s3p1" />
                        </C.S3LeftImage>
                    </C.S3Left>
                    <C.S3Right>
                        <C.S3RightTitle>
                            Get a <span>unique</span> and <span>custom</span> web3 <span>domain name</span>!
                        </C.S3RightTitle>
                        <C.S3RightDesc>
                            Uniqueize yourself, your friend, company or project
                        </C.S3RightDesc>
                        <C.S3RightDesc2>
                            You can open an e-mail with a custom domain name by paying a single fee!
                        </C.S3RightDesc2>
                    </C.S3Right>
                </C.S3>

                <C.S3 reverse="true">
                    <C.S3Right>
                        <C.S3RightTitle>
                            Create an account for <span>anyone</span>
                        </C.S3RightTitle>
                        <C.S3RightDesc>
                            Your friend, employee, partner or whoever!
                        </C.S3RightDesc>
                        <C.S3RightDesc2>
                            Open an account for yourself in a simple and fast way! If you want, you can open an account for anyone and send them a gift, the decision and management is entirely yours.
                        </C.S3RightDesc2>
                    </C.S3Right>
                    <C.S3Left>
                        <C.S3LeftImage>
                            <img src="/s3p2.png" alt="s3p2" />
                        </C.S3LeftImage>
                    </C.S3Left>
                </C.S3>
            </Container>

            <C.S4>
                <C.S4Title>
                    Not your mail,<br /> not your privacy.
                </C.S4Title>
                <C.S4Image>
                    <img src="/s4i1.png" alt="s4" />
                </C.S4Image>
            </C.S4>

            <C.Footer>
                <Container>
                    <C.FooterLeft>
                        <C.FooterLeftTitle>
                            Stay in touch on
                        </C.FooterLeftTitle>
                        <C.FooterLeftTitle2>
                            Web3, with Mail<span>X</span>
                        </C.FooterLeftTitle2>
                    </C.FooterLeft>
                    <C.FooterRight>
                        <C.FooterRightLogo>
                            <img src="/logo-white.png" alt="logo-footer" />
                        </C.FooterRightLogo>
                        <C.FooterRightMenu>
                            <C.FooterRightMenuItema href="" target="_blank">
                                Contact Us
                            </C.FooterRightMenuItema>
                            <C.FooterRightMenuItema href="" target="_blank">
                                Whitepaper
                            </C.FooterRightMenuItema>
                            <C.FooterRightMenuItema href="https://twitter.com/mailx_io" target="_blank">
                                Twitter
                            </C.FooterRightMenuItema>
                            <C.FooterRightMenuItema href="https://discord.gg/cWPHPHujAM" target="_blank">
                                Discord
                            </C.FooterRightMenuItema>
                            <C.FooterRightMenuItemLink primary="true" to="/dashboard">
                                Launch App
                            </C.FooterRightMenuItemLink>
                        </C.FooterRightMenu>
                    </C.FooterRight>
                </Container>
            </C.Footer>


        </C.Home>
    );
}

export default Home;
