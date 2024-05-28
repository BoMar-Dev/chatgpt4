import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom'; // Antag att du använder React Router för navigation

function HomePage() {
    return (
        <>
            <Helmet>
                <title>Memory Spel - Starta Spelet</title>
                <meta name="description" content="Starta och spela Memory spel. Testa ditt minne och ha roligt samtidigt!" />
            </Helmet>
            <div className="home-page">
                <h1>Välkommen till Memory Spelet!</h1>
                <p>Testa ditt minne och ha roligt samtidigt. Klicka på knappen nedan för att starta spelet!</p>
                <Link to="/game" className="start-game-button">Starta Spelet</Link> {/* Exempel på navigationslänk */}
            </div>
        </>
    );
}

export default HomePage
