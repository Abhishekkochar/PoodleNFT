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
			className="bg-blue-200 text-black font-medium py-2 px-4 rounded"
			onClick={onClick}
			type="button"
		>
			{' '}
			{text}{' '}
		</button>
	);
}
