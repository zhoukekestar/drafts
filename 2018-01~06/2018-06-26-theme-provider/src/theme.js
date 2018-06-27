import React, { Component } from 'react';
import { render } from 'react-dom';

const VARS = {
  '@s1': '12',
  '@color-brand1-1': '#f00',
}

export const { Provider, Consumer } = React.createContext(VARS);
export const theme = (_stylesheet, name = 'theme') => (Target) => function Wrapper(props) {
  return (
    <Consumer>
    {
      (newVARS = {}) => {

        let stylesheet = JSON.parse(JSON.stringify(_stylesheet));
        let vars = Object.assign({}, VARS, newVARS);

        for (const rule in stylesheet) {
          const declaration = stylesheet[rule]
          for (const property in declaration) {
            declaration[property] = vars[declaration[property]] || declaration[property];
          }
        }

        return <Target {...props} {...{[name]: stylesheet}} />
      }
    }
    </Consumer>
  );
}
