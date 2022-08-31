import axios from 'axios'
import router from './router/index'

// switch between online and offline mode by adding and 
// removing 'offline/' on requests to the portfolio API
const portfolioURL = '/api/portfolios/';
const accountsURL = '/api/accounts/';

// stores the current jwt of the client
function getToken(): string {
  return localStorage.getItem('sessionToken') ?? '';
}

function getLoggedInUser(): string {
  return localStorage.getItem('username') ?? 'undefined';
}

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
      'Authorization': getToken()
    }
  };
}

function verifyAttemptAuthenticity(response: any): void {
  if (response.data?.status == 403) {
    router.push({ name: 'Auth' });
    localStorage.clear();
    location.reload();
  }
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
      return Promise.reject(error);
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
        timeout,
        headers: {
          'Authorization': getToken()
        }
      });
      return post;
    } catch (error) {
      return Promise.reject(error);
    }    
  }

  static async updatePortfolio(portfolioItem: object): Promise<object> {
    try {
      const put = await axios.put(`${portfolioURL}${getLoggedInUser()}`, {
        portfolioItem 
      }, {
        timeout,
        headers: {
          'Authorization': getToken()
        }
      });
      verifyAttemptAuthenticity(put);
      return put;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async updatePorfolioPrivacy(privacySettings: object): Promise<object> {
    try {
      const put = await axios.put(`${portfolioURL}${getLoggedInUser()}/privacy`, {
        privacySettings
      }, {
        timeout,
        headers: {
          'Authorization': getToken()
        }
      });

      verifyAttemptAuthenticity(put)
      return put.data;
    } catch (error) {
      return Promise.reject(error);
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