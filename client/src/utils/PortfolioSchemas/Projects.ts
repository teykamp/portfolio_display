import PortfolioEntry, { ComponentType } from "../PortfolioSchemas/PortfolioEntry"

// logo to be removed (GitHub issue #185)
interface Tech {
  logo: string,
  name: string
}

export default class Project extends PortfolioEntry {
  name = '';
  technologies: Array<Tech> = [];
  linkToDeploy = '';
  linkToRepo = '';
  type = ComponentType.PROJECT
}