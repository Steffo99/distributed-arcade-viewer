import Head from "next/head"
import useSWR from "swr"
import {useRouter} from "next/router"


type LeaderboardEntry = {
	name: string,
	score: number,
}


// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())


export default function Home() {
	const location = useRouter()

	const hostHeader = location?.query?.["host"]
	const boardHeader = location?.query?.["board"]
	const decimalsHeader = location?.query?.["decimals"]
	const suffixHeader = location?.query?.["suffix"]

	let host = typeof hostHeader == "string" ? hostHeader : process.env.NEXT_PUBLIC_DEFAULT_HOST
	let board = typeof boardHeader == "string" ? boardHeader : process.env.NEXT_PUBLIC_DEFAULT_BOARD
	let decimals = typeof decimalsHeader == "string" ? parseInt(decimalsHeader) || 0 : 0
	let suffix = typeof suffixHeader == "string" ? suffixHeader : ""

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
					<td className={"score"}>{entry.score.toFixed(decimals)}<span className={"suffix"}>{suffix && ` ${suffix}`}</span></td>
				</tr>
			)
		})

		content = (
			<table id={"scores"} className={"panel box"}>
				<caption className={"table-caption-top"}>
					<h2>
						<div id={"host"}>
							{host}
						</div>
						<div id={"board"}>
							{board}
						</div>
					</h2>
				</caption>
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
				<title>{board} - Steffo's Arcade</title>
			</Head>
			<article>
				{content}
			</article>
		</>
	)
}
