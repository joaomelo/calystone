import { StatefulRepository } from "../../lib";
import { INVITE_STATUSES } from "./statuses";

export class Hostess extends StatefulRepository {
  _invites;
  _gatekeeper;
  _shepherd;
  _strategist;

  constructor({ invites, gatekeeper, shepherd, strategist }) {
    super();
    this._invites = invites;
    this._gatekeeper = gatekeeper;
    this._shepherd = shepherd;
    this._strategist = strategist;

    this._invites.subscribe((rawItems) => {
      const items = rawItems.map((invite) => {
        return {
          ...invite,
          // inject program and user data
        };
      });
      this.load(items);
    });
  }

  invite({ email, program }) {
    const from = this._gatekeeper.userId;

    const userTo = this._shepherd.getByEmail(email);
    const to = userTo.id;

    const status = INVITE_STATUSES.OPEN;

    return this._invites.add({ from, to, program, status });
  }

  filterByProgram(programId) {
    return this.filter((invite) => invite.program === programId);
  }
}
