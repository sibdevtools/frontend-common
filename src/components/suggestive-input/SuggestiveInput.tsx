import React, { useEffect, useRef, useState } from 'react';
import { FormControl, ListGroup } from 'react-bootstrap';
import styles from './style/SuggestiveInput.module.css';
import { SuggestiveItem } from './types';

export interface SuggestedItem {
  key?: string;
  value: string;
  data?: any;
}
export interface SuggestiveInputProps {
  id?: string;
  type?: 'text' | 'number'
  value?: string;
  suggestions: SuggestiveItem[];
  maxSuggestions?: number;
  mode: 'strict' | 'free';
  itemsToScroll?: number;
  onFilter?: (input: string) => SuggestiveItem[];
  onChange: (value: SuggestedItem) => void;
  placeholder?: string;
  required: boolean;
  disabled?: boolean;
  clarifyText?: string;
}

export const SuggestiveInput: React.FC<SuggestiveInputProps> = ({
                                                                  id,
                                                                  type = 'text',
                                                                  value,
                                                                  suggestions,
                                                                  maxSuggestions = 5,
                                                                  mode,
                                                                  itemsToScroll = 5,
                                                                  onFilter,
                                                                  onChange,
                                                                  placeholder,
                                                                  required,
                                                                  disabled,
                                                                  clarifyText = 'Clarify request'
                                                                }) => {
  const [inputValue, setInputValue] = useState(value ?? '');
  const [filteredSuggestions, setFilteredSuggestions] = useState<SuggestiveItem[]>(
    suggestions.slice(
      0,
      maxSuggestions
    )
  );
  const [filteredSliced, setFilteredSliced] = useState(suggestions.length > filteredSuggestions.length);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState<number | undefined>();
  const [dropdownLocation, setDropdownLocation] = useState<{ left: number, top: number } | undefined>();

  if (!onFilter) {
    onFilter = it => {
      const substring = it.toLowerCase();
      return suggestions.filter(it => it.value.includes(substring));
    };
  }

  useEffect(() => {
    const filtered = onFilter(inputValue);
    if (filtered.length === 0 && mode === 'strict') {
      setFilteredSuggestions(suggestions.slice(0, maxSuggestions));
      return
    }
    const sliced = filtered.slice(0, maxSuggestions);
    setFilteredSuggestions(sliced)
  }, [suggestions]);

  useEffect(() => {
    const inputElement = inputRef.current;
    if (!inputElement) {
      return;
    }
    setDropdownWidth(inputElement.offsetWidth);
    setDropdownLocation({ top: inputElement.offsetTop + inputElement.offsetHeight, left: inputElement.offsetLeft })
  }, [inputRef?.current?.offsetWidth, inputValue]);

  const handleValueChange = (value: string): SuggestiveItem[] => {
    setInputValue(value);

    const filtered = onFilter(value);
    const sliced = filtered.slice(0, maxSuggestions);
    setFilteredSuggestions(sliced);
    setFilteredSliced(filtered.length > sliced.length);
    return sliced;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const sliced = handleValueChange(value);

    setShowSuggestions(sliced.length > 0);

    if (sliced.length > 0) {
      const candidate = sliced[0];
      onChange({
        key: candidate.key,
        value: candidate.value,
        data: candidate.data
      });
    } else if (mode === 'free') {
      onChange({ value: value });
    } else {
      onChange({ value: '' });
    }
  };

  const handleSuggestionClick = (suggestion: SuggestiveItem) => {
    handleValueChange(suggestion.key);
    setShowSuggestions(false);
    onChange(suggestion);
  };

  return (
    <>
      <FormControl
        ref={inputRef}
        id={id}
        type={type}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(filteredSuggestions.length > 0)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      {showSuggestions && (
        <div
          className={styles['suggestions-dropdown']}
          style={{ width: dropdownWidth, top: dropdownLocation?.top, left: dropdownLocation?.left }}
        >
          <ListGroup style={{ maxHeight: `${itemsToScroll * 32}px`, overflowY: 'auto' }}>
            {filteredSuggestions.map((suggestion) => (
              <ListGroup.Item
                key={suggestion.key}
                action
                onClick={() => handleSuggestionClick(suggestion)}
                className={styles['suggestion-item']}
              >
                {suggestion.value}
              </ListGroup.Item>
            ))}
            {filteredSliced && (
              <ListGroup.Item
                key={'other-options'}
                className={`${styles['suggestion-text']} text-secondary`}
              >
                {clarifyText}
              </ListGroup.Item>
            )}
          </ListGroup>
        </div>
      )}
    </>
  );
};
