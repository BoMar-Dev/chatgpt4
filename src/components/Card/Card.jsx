import PropTypes from 'prop-types';
import styles from './Card.module.scss'; // Importerar SCSS korrekt

const Card = ({ id, image, flipped, matched, onCardClick }) => {
    // Om du vill använda 'matched' för att visa något speciellt för matchade kort:
    const cardStyle = matched ? styles.matched : ''; // Lägg till klassen om kortet är matchat

    return (
        <div className={styles.card} onClick={() => onCardClick(id)}>
            <div className={`${styles.cardInner} ${flipped ? styles.flipped : ''} ${cardStyle}`}>
                <div className={styles.cardFront}>
                    {/* Plats för frågetecken eller annan ikon om så önskas */}
                </div>
                <div className={styles.cardBack}>
                    <img src={image} alt={`Memory Card ${id}`} className={styles.cardImage} />
                </div>
            </div>
        </div>
    );
};

// Definiera PropTypes för komponenten
Card.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    flipped: PropTypes.bool.isRequired,
    matched: PropTypes.bool,
    onCardClick: PropTypes.func.isRequired
};

export default Card;
