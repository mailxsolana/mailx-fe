import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { color } from "styles/theme";
import { Hex2Rgba } from "utils/helpers";
import { Wallet } from "wallet";
import App from "./app";
import { store } from "./services/store";
import Popups from "components/popups";
import { LightboxProvider } from "hooks/lightbox";
import { Tooltip } from 'react-tooltip'

export default function router() {

    return (
        <Provider store={store}>
            <div className="devnet">
                Solana Devnet only
            </div>
            <Wallet>
                <BrowserRouter>
                    <LightboxProvider>
                        <App />
                        <Popups />
                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                            toastOptions={{
                                style: {
                                    border: "1px solid " + color.black,
                                    color: color.white,
                                    background: Hex2Rgba(color.black, 0.95),
                                },
                            }}
                        />

                        <Tooltip id="tpp-tooltip" html="2PP Mail enables both the sender<br/>and the receiver to collaboratively delete the mail,<br/>given that they both consent to the deletion"  />
                    </LightboxProvider>
                </BrowserRouter>
            </Wallet>

        </Provider>
    );
}