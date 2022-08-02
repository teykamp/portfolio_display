import axios from 'axios'

// switch between online and offline mode by adding and removing 'offline/'
const url = '/api/users/';

export default class DatabaseServices {

  static async getAllUsers(): Promise<Array<string>> {
    try {
      const res = await axios.get(url);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  static async getUserByUsername(username: string): Promise<object> {
    try {
      const res = await axios.get(`${url}${username}`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }  

  static postPortfolio(portfolio: object) {
    return axios.post(url, portfolio)
  }

  static updatePorfolio(username: string, portfolioItem: object) {
    return axios.put(`${url}${username}`, { portfolioItem })
  }
}

