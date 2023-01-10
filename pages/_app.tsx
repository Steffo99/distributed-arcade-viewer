import type {AppProps} from "next/app"
import "../styles/globals.css"
import Head from "next/head"


export default function App({Component, pageProps}: AppProps) {
	return <>
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<link rel="icon" href="/favicon.ico"/>
		</Head>
		<header>
			<h1>
				Steffo's Arcade
			</h1>
		</header>
		<main>
			<Component {...pageProps} />
		</main>
		<footer>
			© {new Date().getFullYear()} Stefano Pigozzi - <a href={"https://github.com/Steffo99/distributed-arcade-scores"}>Source code</a> - AGPL-3.0-or-later
		</footer>
	</>
}
