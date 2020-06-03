import React from 'react';
import style from './style.module.css';
/**
 * Code used from here https://loading.io/css/
 */
function Loading() {
  return (
    <div className={style.ripple} data-testid="loading">
      <div />
      <div />
    </div>
  );
}

export default Loading;
