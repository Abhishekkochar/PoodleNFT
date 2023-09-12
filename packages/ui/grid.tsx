export function Grid(): JSX.Element {
	// Sample data for the table
	const tableData = [
		{
			address: 'John',
			tokenId: 30,
			stakedId: '23/05/2023',
			txHash: '65rdfyb76',
		},
		{
			address: 'Jane',
			tokenId: 25,
			stakedId: '23/03/2023',
			txHash: '65rdfyb76',
		},
		{
			address: 'Bob',
			tokenId: 35,
			stakedId: '23/04/2023',
			txHash: '65rdfyb76',
		},
	];
	return (
		<table className="table-auto w-full">
			<thead>
				<tr>
					<th className="px-4 py-2">Address</th>
					<th className="px-4 py-2">Token ID</th>
					<th className="px-4 py-2">Staked At</th>
					<th className="px-4 py-2">Transaction Hash</th>
				</tr>
			</thead>
			<tbody>
				{tableData.map((row, index) => (
					<tr key={index}>
						<td className="border px-4 py-2">{row.address}</td>
						<td className="border px-4 py-2">{row.tokenId}</td>
						<td className="border px-4 py-2">{row.stakedId}</td>
						<td className="border px-4 py-2">{row.txHash}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
