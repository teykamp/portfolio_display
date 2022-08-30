import axios from 'axios'
import router from './router/index'
import { store } from './store/index'

// switch between online and offline mode by adding and 
// removing 'offline/' on requests to the portfolio API
const portfolioURL = '/api/portfolios/';
const accountsURL = '/api/accounts/';

// stores the current jwt of the client
const token = localStorage.getItem('sessionToken') ?? '';

// defines request timeout in milliseconds
const timeout = 3000;

interface AxiosRequestObject {
  method: string,
  url: string,
  timeout: number,
  headers: any
}

function axiosObj(method: string, url: string): AxiosRequestObject {
  return {
    method,
    url,
    timeout,
    headers: {
      'Authorization': token
    }
  };
}

function catchActions(error: any): Promise<any> {
  if (error.data?.status == 403) {
    store.state.snackbarText = 'Session Credentials Expired or Invalid';
    router.push({ name: 'Auth' })
  }

  return Promise.reject(error)
}

export default class DatabaseServices {

  // Portfolio API
  static async getAllPortfolios(): Promise<Array<string>> {
    try {
      const res = await axios(axiosObj('get', portfolioURL));
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getPortfolioContentByUsername(username: string): Promise<object> {
    try {
      const res = await axios(axiosObj('get', `${portfolioURL}${username}/content`));
      return res.data;
    } catch (error) {
      return catchActions(error);
    }
  }
  
  static async getPortfolioPrivacyByUsername(username: string): Promise<object> {
    try {
      const res = await axios(axiosObj('get', `${portfolioURL}${username}/privacy`));
      return res.data;
    } catch (error) {
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
      return catchActions(error);
    }
  }

  static async updatePorfolioPrivacy(username: string, privacySettings: object): Promise<object> {
    try {
      console.log('runnign try')
      const put = await axios.put(`${portfolioURL}${username}/privacy`, {
        privacySettings
      }, {
        timeout,
        headers: {
          'Authorization': token
        }
      });
      console.log(put)
      return put;
    } catch (error) {
      
      return catchActions(error);
    }
  }

  static async deletePortfolioByID(id: string): Promise<object> {
    try {
      const remove = await axios(axiosObj('delete', `${portfolioURL}${id}`));
      return remove;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Accounts API
  static async getAllAccounts(): Promise<Array<string>> {
    try {
      const res = await axios(axiosObj('get', accountsURL));
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async authorizeLogin(loginAttempt: object): Promise<object> {
    try {
      const authDetails = await axios.post('/api/auth/', loginAttempt, { timeout });
      return authDetails.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getAccountByUsername(username: string): Promise<object> {
    try {
      const res = await axios(axiosObj('get', `${accountsURL}${username}`));
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }  

  static async isUsernameTaken(username: string): Promise<boolean> {
    try {
      const res = await axios(axiosObj('get', `${accountsURL}${username}/istaken?`));
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // for account validation purposes
  // return array of _id strings
  static async getAllUsersWithUsername(username: string): Promise<Array<string>> {
    try {
      const res = await axios(axiosObj('get', `${accountsURL}/all/${username}`));
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async postAccount(account: object): Promise<object> {
    try {
      const post = await axios.post(accountsURL, account, { timeout });
      return post;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async deleteAccountByID(accountID: string): Promise<object> {
    try {
      const remove = await axios(axiosObj('delete', `${accountsURL}${accountID}`));   
      return remove;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}