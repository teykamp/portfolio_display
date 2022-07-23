export default class Accomplishment {
  constructor() {
    this.title = '',
    this.organization = '',
    this.description = '',
    this.date = ''
  }

  static validate(accomplishment) {
    return accomplishment.title === 'yona'
  }
}