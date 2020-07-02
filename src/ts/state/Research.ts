import { observable } from "mobx";

type RootResearchObject = Record<string, ResearchObject>;
type ResearchObject = Record<string, { [key: string]: number }>;

export class Research {
  @observable public research: RootResearchObject;

  constructor() {
    this.setResearch = this.setResearch.bind(this);
  }
  public setResearch(research: RootResearchObject) {
    this.research = research;
  }
}

export const research = new Research();
