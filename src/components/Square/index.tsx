interface SquareProps {
	onClick: () => void;
	value: string;
}

const Square: React.FC<SquareProps> = props => {
	const { value, onClick } = props;

	return (
		<button className="square" onClick={onClick}>
			{value}
		</button>
	);
};

export default Square;
