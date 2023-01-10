import {Head, Html, Main, NextScript} from "next/document"


export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="stylesheet" href="https://unpkg.com/@steffo/bluelib@^6/dist/base.root.css" type="text/css"/>
				<link rel="stylesheet" href="https://unpkg.com/@steffo/bluelib@^6/dist/classic.root.css" type="text/css"/>
				<link rel="stylesheet" href="https://unpkg.com/@steffo/bluelib@^6/dist/glass.root.css" type="text/css"/>
				<link rel="stylesheet" href="https://unpkg.com/@steffo/bluelib@^6/dist/colors-royalblue.root.css" type="text/css"/>
				<link rel="stylesheet" href="https://unpkg.com/@steffo/bluelib@^6/dist/fonts-fira-ghpages.root.css" type="text/css"/>
			</Head>
			<body>
				<Main/>
				<NextScript/>
			</body>
		</Html>
	)
}
