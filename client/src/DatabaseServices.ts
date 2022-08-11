import axios from 'axios'

// switch between online and offline mode by adding and 
// removing 'offline/' on requests to the portfolio API
const portfolioURL = '/api/portfolios/';
const accountsURL = '/api/accounts/';

// defines request timeout in milliseconds
const timeout = 2000;

export default class DatabaseServices {

  // Portfolio API
  static async getAllPortfolios(): Promise<Array<string>> {
    try {
      const res = await axios({
        method: 'get',
        url: portfolioURL,
        timeout
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  static async getPortfolioByUsername(username: string): Promise<object> {
    try {
      const res = await axios.get(`${portfolioURL}${username}`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }  

  static async postPortfolio(portfolio: object) {
    const post = await axios.post(portfolioURL, portfolio);
    return post;
  }

  static async updatePorfolio(username: string, portfolioItem: object) {
    const put = await axios.put(`${portfolioURL}${username}`, { portfolioItem });
    return put;
  }

  static async deletePortfolioByID(id: string) {
    const remove = await axios.delete(`${portfolioURL}${id}`);
    return remove;
  }

  // Accounts API
  static async getAllAccounts(): Promise<Array<string>> {
    try {
      const res = await axios.get(accountsURL);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  static async getAccountByUsername(username: string): Promise<object> {
    try {
      const res = await axios.get(`${accountsURL}${username}`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }  

  static async isUsernameTaken(username: string): Promise<boolean> {
    try {
      const res = await axios({
        method: 'get',
        url: `${accountsURL}${username}/istaken?`,
        timeout
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return true;
    }
  }

  // for account validation purposes
  // return array of _id strings
  static async getAllUsersWithUsername(username: string): Promise<Array<string>> {
    try {
      const res = await axios.get(`${accountsURL}/all/${username}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  static async postAccount(account: object) {
    const post = await axios.post(accountsURL, account);
    return post;
  }

  static async deleteAccountByID(accountID: string) {
    const remove = await axios.delete(`${accountsURL}${accountID}`);
    return remove;
  }
}

