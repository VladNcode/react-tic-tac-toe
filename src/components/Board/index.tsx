import { useState } from 'react';
import Square from '../Square';

const Board: React.FC = () => {
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [history, setHistory] = useState<string[][]>([squares]);
	const [player, setPlayer] = useState('X');
	const [step, setStep] = useState(1);
	const [gameOver, setGameOver] = useState(false);

	let winner = false;

	const handleClick = (i: number) => {
		if (squares[i] || winner) return;

		const squaresCopy = [...squares];

		setPlayer(player === 'X' ? 'O' : 'X');

		squaresCopy[i] = player;

		let stepCount = step;
		setStep(++stepCount);

		const historyCopy = [...history];
		historyCopy.push(squaresCopy);

		setSquares(squaresCopy);

		if (history.length > step) {
			historyCopy[step] = squaresCopy;
			setGameOver(false);
		}

		setHistory(historyCopy.slice(0, step + 1));

		if (step === 9) setGameOver(true);
	};

	const renderSquare = (i: number): JSX.Element => {
		return (
			<Square
				value={squares[i]}
				onClick={() => {
					handleClick(i);
				}}
			/>
		);
	};

	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	lines.forEach(line => {
		const [a, b, c] = line;

		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			winner = squares[a];
		}
	});

	const status =
		!gameOver && !winner ? `Next player: ${player}` : `Game is over! ${winner ? `Winner is ${winner}!` : ''}`;

	return (
		<div>
			<div className="status">{status}</div>
			<div className="board-row">
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</div>
			<div className="board-row">
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>
			<div className="board-row">
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>

			<ol>
				{history.map((_, i) => {
					return (
						<li key={i}>
							<button
								key={i}
								onClick={() => {
									setSquares(history[i]);
									setPlayer(i % 2 === 0 ? 'X' : 'O');
									setStep(i + 1);
								}}
							>{`${i === 0 ? 'Go to game start' : 'Go to move #' + i}`}</button>
						</li>
					);
				})}
			</ol>
		</div>
	);
};

export default Board;
