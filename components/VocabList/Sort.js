import React, { useState } from 'react';
import styled from 'styled-components';

export default function Sort() {
  return (
    <div>
      Sort By:
      <select>
        <option>A-Z</option>
        <option>Z-A</option>
        <option>Difficulty 📈</option>
        <option>Difficulty 📉</option>
      </select>
    </div>
  );
}
