import axios from 'axios'

// switch between online and offline mode by adding and 
// removing 'offline/' on requests to the portfolio API
const portfolioURL = '/api/portfolios/';
const accountsURL = '/api/accounts/';

// defines request timeout in milliseconds
const timeout = 3000;

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
      const res = await axios({
        method: 'get',
        url: `${portfolioURL}${username}`,
        timeout
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
  
  static async getPortfolioPrivacyByUsername(username: string): Promise<object> {
    try {
      const res = await axios({
        method: 'get',
        url: `${portfolioURL}${username}/privacy`,
        timeout
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  static async postPortfolio(portfolio: object): Promise<object> {
    try {
      const post = await axios.post(portfolioURL, portfolio, { 
        timeout 
      });
      return post;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }    
  }

  static async updatePorfolio(username: string, portfolioItem: object): Promise<object> {
    try {
      const put = await axios.put(`${portfolioURL}${username}`, {
        portfolioItem 
      }, {
        timeout
      });
      return put;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  static async deletePortfolioByID(id: string): Promise<object> {
    try {
      const remove = await axios({
        method: 'delete',
        url: `${portfolioURL}${id}`,
        timeout
      });
      return remove;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  // Accounts API
  static async getAllAccounts(): Promise<Array<string>> {
    try {
      const res = await axios({
        method: 'get',
        url: accountsURL,
        timeout
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  static async getAccountByUsername(username: string): Promise<object> {
    try {
      const res = await axios({
        method: 'get',
        url: `${accountsURL}${username}`,
        timeout
      });
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
      const res = await axios({
        method: 'get',
        url: `${accountsURL}/all/${username}`,
        timeout
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  static async postAccount(account: object): Promise<object> {
    try {
      const post = await axios.post(accountsURL, account, { timeout });
      return post;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  static async deleteAccountByID(accountID: string): Promise<object> {
    try {
      const remove = await axios({
        method: 'delete',
        url: `${accountsURL}${accountID}`,
        timeout
      });   
      return remove;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}

