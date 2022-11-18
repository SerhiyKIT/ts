export const InputTemplate = ((inputNameP: string, InputSetName: React.Dispatch<React.SetStateAction<string>>, valueInputName: string) => {
	return (
		<div style={{ marginBottom: 16 }}>
			<p>{inputNameP}</p>
			<input
				onChange={(e) => InputSetName(e.target.value)}
				value={valueInputName}
			/>
		</div>
	)
});