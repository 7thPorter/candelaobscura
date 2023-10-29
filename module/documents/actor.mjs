export class CandelaActor extends Actor {
  prepareData() {
    super.prepareData();
  }

  prepareBaseData() {}

  prepareDerivedData() {
    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags.boilerplate || {};

    this._prepareCircleMemberData(actorData);
    this._prepareNpcData(actorData);
    this._prepareCircleData(actorData);
  }
}
