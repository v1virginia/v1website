import '../styles.css'
import fb from "../lib/firebase-config";
import Head from "next/head";


function MyApp({Component, pageProps}) {
    return <div className="app-container">
        <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <title>Venture@Brown</title>
        </Head>
        <Component {...pageProps} />
    </div>
}

export default MyApp
