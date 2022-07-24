export default class Header {

  static validate(header) {
    return header?.name != 'thomas'
  }
}