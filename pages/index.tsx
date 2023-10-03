// @ts-nocheck

import Head from "next/head"
import useSWR from "swr"
import {useRouter} from "next/router"


type LeaderboardEntry = {
	name: string,
	score: number,
}


const NOTABLE_BOARDS = {
	"ld52": {
		title: "Pineapple Surf",
		decimals: 3,
		suffix: "s"
	},
	"ld54": {
		title: "Swear Jar",
		decimals: 2,
		prefix: "$"
	}
}


// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())


export default function Home() {
	const location = useRouter()

	const hostHeader = location?.query?.["host"]
	const boardHeader = location?.query?.["board"]
	let host = typeof hostHeader == "string" ? hostHeader : process.env.NEXT_PUBLIC_DEFAULT_HOST
	let board = typeof boardHeader == "string" ? boardHeader : process.env.NEXT_PUBLIC_DEFAULT_BOARD

	const titleHeader = location?.query?.["title"]
	const decimalsHeader = location?.query?.["decimals"]
	const prefixHeader = location?.query?.["prefix"]
	const suffixHeader = location?.query?.["suffix"]
	let title = typeof titleHeader == "string" ? titleHeader : NOTABLE_BOARDS[board ?? ""]?.title ?? ""
	let decimals = typeof decimalsHeader == "string" ? parseInt(decimalsHeader) || 0 : NOTABLE_BOARDS[board ?? ""]?.decimals ?? 0
	let prefix = typeof prefixHeader == "string" ? prefixHeader : NOTABLE_BOARDS[board ?? ""]?.prefix ?? ""
	let suffix = typeof suffixHeader == "string" ? suffixHeader : NOTABLE_BOARDS[board ?? ""]?.suffix ?? ""

	const swr = useSWR<LeaderboardEntry[]>(`${host}/board/?board=${board}&offset=0&size=500`, fetcher, {refreshInterval: 30000})

	let content

	if(swr.isLoading || swr.data === undefined) {
		content = (
			<div className={"panel box"}>
				<h3>Loading</h3>
				<p>
					Please wait...
				</p>
			</div>
		)
	}
	else if(swr.error) {
		content = (
			<div className={"panel box red"}>
				<h3>Error</h3>
				<p>
					{swr.error}
				</p>
			</div>
		)
	}
	else {
		const rows = swr.data.map((entry, rank) => {
			let className = ""

			rank += 1

			if(rank == 1) {
				className += "gold"
			}
			else if(rank == 2) {
				className += "silver"
			}
			else if(rank == 3) {
				className += "bronze"
			}

			return (
				<tr className={className}>
					<td className={"rank"}>{rank}</td>
					<td className={"player"}>{entry.name}</td>
					<td className={"score"}><span className={"prefix"}>{prefix && `${prefix} `}</span>{entry.score.toFixed(decimals)}<span className={"suffix"}>{suffix && ` ${suffix}`}</span></td>
				</tr>
			)
		})

		content = (
			<table id={"scores"} className={"panel box"}>
				<thead>
					<tr>
						<th>Rank</th>
						<th>Player</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		)
	}

	return (
		<>
			<Head>
				<title>{title} ({board})</title>
			</Head>
			<header>
				<h1>
					{title}
				</h1>
				<h2>
					Leaderboards
				</h2>
			</header>
			<main>
				{content}
			</main>
			<footer>
				© {new Date().getFullYear()} <a href="https://www.steffo.eu/">Stefano Pigozzi</a> - <a href={"https://github.com/Steffo99/distributed-arcade-scores"}>Source code</a> - AGPL-3.0-or-later
			</footer>
		</>
	)
}
