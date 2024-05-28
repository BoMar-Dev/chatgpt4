import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card'; // Kontrollera importvägen
import styles from './GameBoard.module.scss'; // Importera SCSS-modul

// Importera bilderna
import airplaneImg from '../../assets/img/airplane.webp';
import ballImg from '../../assets/img/ball.webp';
import heartImg from '../../assets/img/heart.webp';
import kittenImg from '../../assets/img/kitten.webp';
import sunsetImg from '../../assets/img/sunset.webp';
import treeImg from '../../assets/img/tree.webp';

const GameBoard = ({ mode, difficulty, onBackToMenu }) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matched, setMatched] = useState([]);
    const [score, setScore] = useState({ player1: 0, player2: 0 });
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        loadCards(difficulty);
    }, [difficulty]);

    const loadCards = (selectedDifficulty) => {
        const allImages = [airplaneImg, ballImg, heartImg, kittenImg, sunsetImg, treeImg];
        let imageSubset;
        switch (selectedDifficulty) {
            case 'easy':
                imageSubset = allImages.slice(0, 3);
                break;
            case 'medium':
                imageSubset = allImages.slice(0, 5);
                break;
            case 'hard':
                imageSubset = allImages;
                break;
            default:
                imageSubset = allImages.slice(0, 5);
                break;
        }

        const initialCards = imageSubset.flatMap((image, index) => [
            { id: index * 2, matched: false, image },
            { id: index * 2 + 1, matched: false, image }
        ]).sort(() => Math.random() - 0.5);

        setCards(initialCards);
        setFlippedCards([]);
        setMatched([]);
        setScore({ player1: 0, player2: 0 });
    };

    const handleCardClick = (id) => {
        if (flippedCards.length === 2 || flippedCards.includes(id) || matched.includes(id)) {
            return;
        }

        const newFlippedCards = [...flippedCards, id];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            const firstCard = cards.find(card => card.id === newFlippedCards[0]);
            const secondCard = cards.find(card => card.id === newFlippedCards[1]);

            if (firstCard.image === secondCard.image) {
                setMatched([...matched, firstCard.id, secondCard.id]);
                setFlippedCards([]);
                setScore(prevScore => {
                    const updatedScore = { ...prevScore, [`player${currentPlayer}`]: prevScore[`player${currentPlayer}`] + 1 };
                    checkForWin(updatedScore);
                    return updatedScore;
                });
            } else {
                setTimeout(() => {
                    setFlippedCards([]);
                    if (mode === 'multiplayer') {
                        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
                    }
                }, 1000);
            }
        }
    };

    const checkForWin = (currentScore) => {
        const totalPairs = cards.length / 2;
        const maxScorePossible = Math.floor(totalPairs / 2) + 1;
        if (currentScore.player1 >= maxScorePossible || currentScore.player2 >= maxScorePossible) {
            setGameOver(true);
            setWinner(currentScore.player1 > currentScore.player2 ? 'Player 1' : 'Player 2');
        }
    };

    return (
        <div className={styles.gameBoard}>
            {gameOver ? (
                <div className={styles.gameOver}>
                    <h2>Grattis {winner}, du har vunnit spelet!</h2>
                    <button className={styles.backToMenu} onClick={onBackToMenu}>Återgå till huvudmenyn</button>
                </div>
            ) : (
                <>
                    <button className={styles.backToMenu} onClick={onBackToMenu}>Tillbaka till Meny</button>
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            id={card.id}
                            image={card.image}
                            flipped={flippedCards.includes(card.id) || matched.includes(card.id)}
                            matched={matched.includes(card.id)}
                            onCardClick={handleCardClick}
                        />
                    ))}
                    <div className={styles.scoreBoard}>Player 1: {score.player1}, Player 2: {score.player2}</div>
                </>
            )}
        </div>
    );
};

GameBoard.propTypes = {
    mode: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    onBackToMenu: PropTypes.func.isRequired
};

export default GameBoard;
