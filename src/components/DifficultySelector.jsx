import PropTypes from 'prop-types'; // Importera PropTypes

const DifficultySelector = ({ onDifficultyChange }) => {
    return (
        <div className="difficulty-selector">
            <button onClick={() => onDifficultyChange('easy')} aria-label="Välj enkel svårighetsgrad">Easy</button>
            <button onClick={() => onDifficultyChange('medium')} aria-label="Välj medium svårighetsgrad">Medium</button>
            <button onClick={() => onDifficultyChange('hard')} aria-label="Välj svår svårighetsgrad">Hard</button>
        </div>
    );
};

// Definiera PropTypes för komponenten
DifficultySelector.propTypes = {
    onDifficultyChange: PropTypes.func.isRequired
};

export default DifficultySelector;
