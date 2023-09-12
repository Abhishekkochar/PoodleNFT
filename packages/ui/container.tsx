import { Button } from './button';
import { Grid } from './grid';

export function Container({
	text,
	showGrid,
}: {
	text?: string;
	showGrid?: boolean;
}): JSX.Element {
	return (
		<div className="flex justify-center items-center py-40">
			<div className="bg-gradient-to-r from-blue-900 via-purple-500 to-blue-300 rounded-lg shadow-lg w-11/12 h-2/5">
				{showGrid ? (
					<div>
						<Grid />
					</div>
				) : (
					<div className="flex justify-center mt-72 mb-2">
						{' '}
						{text ? <Button text={text} /> : ''}
					</div>
				)}
			</div>
		</div>
	);
}
