import { StatefulRepository } from "../../lib";
import { INVITE_STATUSES } from "./statuses";

export class Hostess extends StatefulRepository {
  _invites;
  _gatekeeper;
  _shepherd;

  constructor({ invites, gatekeeper, shepherd, strategist }) {
    super();
    this._invites = invites;
    this._gatekeeper = gatekeeper;
    this._shepherd = shepherd;
    this._strategist = strategist;

    this._invites.subscribe((rawItems) => this.load(rawItems));
  }

  list() {
    const rawItems = super.list();
    return rawItems.map((invite) => {
      const { toUserId, fromUserId, programId, ...rest } = invite;
      const toUser = this._shepherd.findById(toUserId);
      const fromUser = this._shepherd.findById(fromUserId);
      const program = this._strategist.findById(programId);
      return {
        ...rest,
        program,
        toUser,
        fromUser,
      };
    });
  }

  listInvitesToMe() {
    return this.filter(
      (invite) => invite.toUser.id === this._gatekeeper.userId
    );
  }

  invitesByProgram(programId) {
    return this.filter((invite) => invite.program.id === programId);
  }

  pendingInvitesByProgram(programId) {
    const invites = this.invitesByProgram(programId);
    return invites.filter(
      (invite) => invite.status === INVITE_STATUSES.PENDING
    );
  }

  invite({ toEmail, programId }) {
    const fromUserId = this._gatekeeper.userId;

    const toUser = this._shepherd.getByEmail(toEmail);
    const toUserId = toUser.id;

    const status = INVITE_STATUSES.PENDING;
    return this._invites.add({
      fromUserId,
      toUserId,
      programId,
      status,
    });
  }

  accept(inviteId) {
    console.log("accept", inviteId);
  }

  ignore(inviteId) {
    console.log("ignore", inviteId);
  }
}
