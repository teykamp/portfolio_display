import axios from 'axios'

const url = '/api/users/';

export default class DatabaseServices {

  static async getAllUsers() {
    try {
      const res = await axios.get(url);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  static async getUserByUsername(username) {
    try {
      const res = await axios.get(`${url}${username}`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error)
    }
  }  
}

