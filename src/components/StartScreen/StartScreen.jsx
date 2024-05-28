import PropTypes from 'prop-types'; // Import PropTypes for validation
import { Helmet } from 'react-helmet';

import styles from './StartScreen.module.scss'; // Import SCSS module for styling

const StartScreen = ({ onStartGame }) => {
    return (
        <>
            <Helmet>
                <title>Memory Spel - Startskärmen</title>
                <meta name="description" content="Välkommen till startskärmen av Memory spelet. Välj att spela ensam eller mot en vän och ha roligt!" />
                <meta name="keywords" content="Memory spel, spel, startskärm, välkommen, ensamspel, flerspelare" />
                <meta name="author" content="Ditt namn eller företag" />
            </Helmet>
            <div className={styles.startScreen}>
                <h1 className={styles.title}>Välkommen till Memoryspelet!</h1>
                <button className={styles.button} onClick={() => onStartGame('singleplayer')}>Spela ensam</button>
                <button className={styles.button} onClick={() => onStartGame('multiplayer')}>Spela mot en vän</button>
            </div>
        </>
    );
};

// Define PropTypes for the component
StartScreen.propTypes = {
    onStartGame: PropTypes.func.isRequired
};

export default StartScreen;
