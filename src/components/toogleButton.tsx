'use client';

import React, { useId } from 'react';
import styled from 'styled-components';

interface ToggleButtonProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const ToggleButton = ({ checked, onChange, disabled }: ToggleButtonProps) => {
  const checkboxId = useId();

  return (
    <StyledWrapper>
      <div>
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
        />
        <label className="switch" htmlFor={checkboxId}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="slider">
            <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" />
          </svg>
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  input[type="checkbox"] {
    display: none;
  }

  .switch {
    position: relative;
    width: 44px;
    height: 44px;
    background-color: #1a1a1a;
    border-radius: 50%;
    z-index: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #232323;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .switch:hover {
    border-color: #444;
    background-color: #222;
  }

  .switch svg {
    width: 1.2em;
    transition: all 0.3s ease;
  }

  .switch svg path {
    fill: #555555;
    transition: all 0.3s ease;
  }

  input[type="checkbox"]:disabled + .switch {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input[type="checkbox"]:checked + .switch {
    background-color: #fafafa;
    border-color: #ffffff;
    box-shadow: 
      0px 0px 8px rgba(255, 255, 255, 0.4),
      0px 4px 12px rgba(0, 0, 0, 0.2);
  }

  input[type="checkbox"]:checked + .switch svg {
    filter: drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.5));
  }

  input[type="checkbox"]:checked + .switch svg path {
    fill: #090909;
  }
`;

export default ToggleButton;
