/* eslint-disable no-console */
const { GoogleSpreadsheet } = require('google-spreadsheet');

class SpreadsheetReader {
  constructor() {
    this.doc = null;
    this.sheet = null;
  }

  async init(spreadSheetID, worksheetID, creds) {
    this.doc = new GoogleSpreadsheet(spreadSheetID);
    await this.doc.useServiceAccountAuth(creds);
    await this.doc.loadInfo();
    this.sheet = this.doc.sheetsByIndex[worksheetID];
  }

  async forEachRow(callback) {
    let done = false;
    let offset = 0;
    const limit = 20;
    let rowNum = 0;

    while (!done) {
      // eslint-disable-next-line no-await-in-loop
      const rows = await this.sheet.getRows({ offset, limit });
      done = (rows.length === 0);
      for (let i = 0; i < rows.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await callback(rows[i], rowNum);
        rowNum += 1;
      }
      offset += limit;
    }
  }
}

module.exports = SpreadsheetReader;
