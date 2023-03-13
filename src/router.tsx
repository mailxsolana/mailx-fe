import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { color } from "styles/theme";
import { Hex2Rgba } from "utils/helpers";
import { Wallet } from "wallet";
import App from "./app";
import { store } from "./services/store";
import Popups from "components/popups";

export default function router() {

    return (
        <Provider store={store}>
            <div className="devnet">
                Solana Devnet only
            </div>
            <Wallet>
                <BrowserRouter>
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
                </BrowserRouter>
            </Wallet>

        </Provider>
    );
}