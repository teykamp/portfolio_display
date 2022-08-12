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
      return Promise.reject(error);
    }
  }

  static async getPortfolioByUsername(username: string): Promise<object> {
    try {
      const res = await axios.get(`${portfolioURL}${username}`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }  

  static async postPortfolio(portfolio: object): Promise<object> {
    try {
      const post = await axios.post(portfolioURL, portfolio);
      return post;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }    
  }

  static async updatePorfolio(username: string, portfolioItem: object): Promise<object> {
    try {
      const put = await axios.put(`${portfolioURL}${username}`, { portfolioItem });
      return put;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  static async deletePortfolioByID(id: string): Promise<object> {
    try {
      const remove = await axios.delete(`${portfolioURL}${id}`);
      return remove;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  // Accounts API
  static async getAllAccounts(): Promise<Array<string>> {
    try {
      const res = await axios.get(accountsURL);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  static async getAccountByUsername(username: string): Promise<object> {
    try {
      const res = await axios.get(`${accountsURL}${username}`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
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
      return Promise.reject(error);
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
      return Promise.reject(error);
    }
  }

  static async postAccount(account: object): Promise<object> {
    try {
      const post = await axios.post(accountsURL, account);
      return post;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  static async deleteAccountByID(accountID: string): Promise<object> {
    try {
      const remove = await axios.delete(`${accountsURL}${accountID}`);   
      return remove;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}

