const RiskManagement = require('metaapi.cloud-sdk').RiskManagement;
const EquityBalanceListener = require('metaapi.cloud-sdk').EquityBalanceListener;

// your MetaApi API token
const token = process.env.TOKEN || '<eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4OTNjMGM2OGY3M2Y3M2VkNDYzZWYwMWZhOGMxMjdjNCIsInBlcm1pc3Npb25zIjpbXSwiYWNjZXNzUnVsZXMiOlt7ImlkIjoidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJ0cmFkaW5nLWFjY291bnQtbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6ZmZhZWUzY2UtNTk5MC00ZmQ1LWE1NGEtNjU4Y2I5MzQ4ZmZhIl19LHsiaWQiOiJtZXRhYXBpLXJlc3QtYXBpIiwibWV0aG9kcyI6WyJtZXRhYXBpLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDpmZmFlZTNjZS01OTkwLTRmZDUtYTU0YS02NThjYjkzNDhmZmEiXX0seyJpZCI6Im1ldGFhcGktcnBjLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOmZmYWVlM2NlLTU5OTAtNGZkNS1hNTRhLTY1OGNiOTM0OGZmYSJdfSx7ImlkIjoibWV0YWFwaS1yZWFsLXRpbWUtc3RyZWFtaW5nLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOmZmYWVlM2NlLTU5OTAtNGZkNS1hNTRhLTY1OGNiOTM0OGZmYSJdfSx7ImlkIjoibWV0YXN0YXRzLWFwaSIsIm1ldGhvZHMiOlsibWV0YXN0YXRzLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDpmZmFlZTNjZS01OTkwLTRmZDUtYTU0YS02NThjYjkzNDhmZmEiXX0seyJpZCI6InJpc2stbWFuYWdlbWVudC1hcGkiLCJtZXRob2RzIjpbInJpc2stbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6ZmZhZWUzY2UtNTk5MC00ZmQ1LWE1NGEtNjU4Y2I5MzQ4ZmZhIl19XSwidG9rZW5JZCI6IjIwMjEwMjEzIiwiaW1wZXJzb25hdGVkIjpmYWxzZSwicmVhbFVzZXJJZCI6Ijg5M2MwYzY4ZjczZjczZWQ0NjNlZjAxZmE4YzEyN2M0IiwiaWF0IjoxNzI3MTA3Mzk2fQ.MSTiPaIBUQrz0k5_Kw1y4DYNj2PFSj91aDVIFueiLwYC-R3LFppuvVxdySbt4Fj3xeUPZabmGsLWrFU83nhdUB7hrqzSBX6AVYD_fCaGOkeyd8L3-Y1eIFQCTmYYfitECPoSSgdZPWpg-NuvSTFlAB3LsaNN9GZx9ftam04id_-gxnaMjATHqfeh4UIb_AYBTejZHlhM2K7cCRRFqmuJrBTptgs3C2hO2_uGRgUbLI4lqXBc6ikWY48xdgLH22or0VkOSgUAIFkLEYndzDVxJBAn01RhMFJJ5xh6BTWCOMLHWQikpuH0gXe8QMEOhVaVZN66d1ya5SzeJ0WyBqXgUTQl6b7jsxEfO2Gk8Z5CnGN5wwgJSsvZUWT0c1sRjKlrqIdJX7pF9hjcn2g73nlQclAgPfVqaGI2Zp0GCpiaYPRU-VOeTSk7Z1KboDLIpzHIcbOPXNlBT6vjtSPrUiCIhYC8nFaTa8CVNLn6QTwPPK1hOWpJYLWqmur2W1BCBM3c7XGbn54vDHavFJSfkrZk5gPKhDj2EvpQhgGvosY_rDwnEH6yCd2D9cAub6waray4Aw5PhHLhJmD3qTpMAr2ZYfUSdY5VDwaqo8ZsQz9y6ZnOLnSV0-ShGzA3JxTha4xIEnowGRyLdpvLvDlqErUfavj7-oi9SmnTkNNI8DIx5TU>';
// your MetaApi account id
// the account must have field riskManagementApiEnabled set to true
const accountId = process.env.ACCOUNT_ID || '<ffaee3ce-5990-4fd5-a54a-658cb9348ffa>';
const domain = process.env.DOMAIN;

const riskManagement = new RiskManagement(token, {domain});
const riskManagementApi = riskManagement.riskManagementApi;

class ExampleEquityBalanceListener extends EquityBalanceListener {
  async onEquityOrBalanceUpdated(equityBalanceData) {
    console.log('equity balance update received', equityBalanceData);
  }

  async onConnected() {
    console.log('on connected event received');
  }

  async onDisconnected() {
    console.log('on disconnected event received');
  }

  async onError(error) {
    console.log('error event received', error);
  }
}

async function main() {
  try {
    // adding an equity balance listener
    const equityBalanceListener = new ExampleEquityBalanceListener(accountId);
    const listenerId = await riskManagementApi.addEquityBalanceListener(equityBalanceListener, accountId);

    console.log('Streaming equity balance for 1 minute...');
    await new Promise(res => setTimeout(res, 1000 * 60));
    riskManagementApi.removeEquityBalanceListener(listenerId);
    console.log('Listener removed');
  } catch (err) {
    console.error(err);
  }
  process.exit();
}

main();
