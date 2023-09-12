'use client';

export function Button({
	text,
	onClick,
}: {
	text: string;
	onClick?: () => void;
}): JSX.Element {
	return (
		<button
			className="bg-blue-200 text-black hover:bg-gradient-to-r from-blue-400 via-purple-400 font-medium py-2 px-4 rounded"
			onClick={onClick}
			type="button"
		>
			{' '}
			{text}{' '}
		</button>
	);
}
