import React, { useState, useRef, useEffect } from 'react';
import './MultiSelectDropdown.scss'

interface Option {
    label: string;
    value: number;
}

interface MultiSelectDropdownProps {
    options: Option[];
    onChange: (selectedValues: number[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<number[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (value: number, isChecked: boolean) => {
        let newSelectedValues: number[] = [];

        if (value === -1) {
            newSelectedValues = isChecked ? options.map(option => option.value) : [];
        } else {
            newSelectedValues = isChecked
                ? [...selectedValues, value]
                : selectedValues.filter(v => v !== value);
        }


        const allOtherOptionsSelected = options.every(option =>
            option.value === -1 || newSelectedValues.includes(option.value)
        );


        setSelectedValues(
            allOtherOptionsSelected ? options.map(option => option.value) : newSelectedValues.filter(v => v !== -1)
        );

        onChange(newSelectedValues.filter(v => v !== -1));
    };

    return (
        <div className="multi-select-dropdown" ref={dropdownRef}>
            <div className="dropdown-toggle" onClick={handleToggleDropdown}>
                Filter by Stops <span className="caret">&#9662;</span>
            </div>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map(option => (
                        <li key={option.value}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={option.value}
                                    checked={selectedValues.includes(option.value)}
                                    onChange={e => handleCheckboxChange(option.value, e.target.checked)}
                                />
                                {option.label}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
