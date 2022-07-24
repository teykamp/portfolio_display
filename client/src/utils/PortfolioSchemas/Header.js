export default class Header {

  // header obj structure

  // header: {
  //   name: '',
  //   headshotURL: '',
  //   professionalTitle: '',  
  //   links: [],    
  //   email: '',
  //   phone: ''
  // }

  static validate(header) {
    
    if (!header.name) return false
    if (!header.professionalTitle) return false

    return true
  }
}