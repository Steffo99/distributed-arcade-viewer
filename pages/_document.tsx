// @ts-nocheck

import {Head, Html, Main, NextScript} from "next/document"


export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="stylesheet" href="https://unpkg.com/@steffo/bluelib@9.0.1/dist/base.root.min.css" type="text/css" />
				<link rel="stylesheet" href="https://unpkg.com/@steffo/bluelib@9.0.1/dist/classic.root.min.css" type="text/css" />
				<link rel="stylesheet" href="https://unpkg.com/@steffo/bluelib@9.0.1/dist/layouts-center.root.min.css" type="text/css" />
				<link rel="stylesheet" href="https://unpkg.com/@steffo/bluelib@9.0.1/dist/fonts-fira-ghpages.root.min.css" type="text/css" />
				<link rel="stylesheet" href="https://unpkg.com/@steffo/bluelib@9.0.1/dist/colors-royalblue.root.min.css" type="text/css" />
			</Head>
			<body>
				<Main/>
				<NextScript/>
			</body>
		</Html>
	)
}
