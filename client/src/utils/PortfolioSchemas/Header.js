export default class Header {

  constructor() {
    this.name = '',
    this.headshotURL = '',
    this.professionalTitle = '',
    this.links = [],
    this.email = '',
    this.phone = ''
  }

  static validate(header) {

    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    
    if (!header.name) return false
    if (!header.professionalTitle) return false
  
    if (header?.email) {
      if (!emailPattern.test(header.email)) {
        return false
      }
    }

    if (header?.phone) {
      if (!phonePattern.test(header.phone)) {
        return false
      }
    }

    return true
  }
}