/* eslint-disable no-console,no-param-reassign */
const fs = require('fs').promises;
const path = require('path');
const SpreadsheetReader = require('./lib/spreadsheet_reader');
const config = require('./config.json');
const credentials = require('./client_secret.json');

const destinationPath = '../../data';
const { spreadsheetID, worksheetID, outputFile } = config;

const translations = {};
config.languages.forEach((lang) => {
  translations[lang] = {};
});

(async () => {
  const reader = new SpreadsheetReader();
  await reader.init(spreadsheetID, worksheetID, credentials);
  await reader.forEachRow(async (row, i) => {
    if (!(config.ignoredIDs.includes(row.id))) {
      Object.entries(translations).forEach(([lang, translation]) => {
        if (translation[row.id] === undefined) {
          translation[row.id] = {};
        }
        const object = translation[row.id];
        if (row[lang].trim().length > 0) {
          object[row.field] = row[lang].trim();
        } else {
          object[row.field] = row.en.trim();
        }
      });
    }
  });

  const filePromises = [];
  Object.entries(translations).forEach(([lang, translation]) => {
    const filename = path.resolve(path.join(destinationPath, `${lang}.json`));
    const jsonData = JSON.stringify({
      texts: translation,
    }, null, 2);

    filePromises.push(
      fs.writeFile(filename, jsonData).then(() => {
        console.log(`Data written to ${filename}`);
      })
    );
  });
  await Promise.all(filePromises);

  console.log(`Done. Created ${filePromises.length} data files.`);
})();
