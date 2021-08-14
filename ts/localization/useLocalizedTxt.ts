import React from 'react';
import english from './strings/english.json';

type LocalizationObject = {
  [key: string]: string;
};

type LocalizationParamObject = {
  [key: string]: any;
};

export const formatLocalizedTxt = (
  message: string,
  params: LocalizationParamObject,
) => {
  const regex = new RegExp(`:${Object.keys(params).join('|:')}`, 'g');
  const resultMessages = message.split(regex);
  const nodes = [];
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const keyRegex = new RegExp(`:${key}`, 'gi');
      let searchResult;
      while ((searchResult = keyRegex.exec(message))) {
        nodes.push({
          key: searchResult.index,
          render: params[key],
        });
      }
    }
  }
  nodes
    .sort((a, b) => a.key - b.key)
    .forEach((node, key) => {
      resultMessages.splice(key * 2 + 1, 0, node.render(key));
    });
  return resultMessages;
};

export default function useLocalizedTxt(): LocalizationObject {
  return english;
}
