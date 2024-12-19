import React from 'react';
import { languages } from '../constants/languages'; // Adjust the path as necessary

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
    return (
        <select value={selectedLanguage} onChange={onLanguageChange}>
            {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                    {lang.name}
                </option>
            ))}
        </select>
    );
};

export default LanguageSelector;