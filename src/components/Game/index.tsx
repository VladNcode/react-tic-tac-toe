import { useState } from 'react';
import Board from '../Board';

const Game: React.FC = () => {
	const [state, setState] = useState({
		history: [Array(9).fill(null)],
		stepNumber: 0,
		xIsNext: true,
	});

	const handleClick = (i: number) => {
		const history = state.history.slice(0, state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = [...current];

		if (calcWinner(squares) || squares[i]) return;

		squares[i] = state.xIsNext ? 'X' : 'O';

		setState({
			history: history.concat([squares]),
			stepNumber: history.length,
			xIsNext: !state.xIsNext,
		});
	};

	const jumpTo = (step: number) => {
		setState({
			stepNumber: step,
			xIsNext: step % 2 === 0,
			history: state.history,
		});
	};

	const history = state.history;
	const current = history[state.stepNumber];
	const winner = calcWinner(current);

	const moves = history.map((_, move) => {
		return (
			<li key={move}>
				<button key={move} onClick={() => jumpTo(move)}>{`${
					move === 0 ? 'Go to game start' : 'Go to move #' + move
				}`}</button>
			</li>
		);
	});

	let status = winner ? 'Winner: ' + winner : 'Next player: ' + (state.xIsNext ? 'X' : 'O');

	return (
		<div className="game">
			<div className="game-board">
				<Board squares={current} onClick={i => handleClick(i)} />
			</div>
			<div className="game-info">
				<div className="status">{status}</div>
				<ol>{moves}</ol>
			</div>
		</div>
	);
};

const calcWinner = (squares: string[]) => {
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

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];

		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}

	return null;
};

export default Game;
