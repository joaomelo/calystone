import { Stateful } from "../../lib";
import { INVITE_STATUSES } from "./statuses";

export class Hostess extends Stateful {
  _invites;
  _gatekeeper;
  _shepherd;

  constructor({ invites, gatekeeper, shepherd, strategist }) {
    super();
    this._invites = invites;
    this._gatekeeper = gatekeeper;
    this._shepherd = shepherd;
    this._strategist = strategist;

    this._invites.subscribe(() => this.notify());
  }

  listInvites() {
    const rawItems = this._invites.list();
    return rawItems.map((invite) => {
      const { toUserId, fromUserId, programId, ...rest } = invite;
      const toUser = this._shepherd.findUserWithId(toUserId);
      const fromUser = this._shepherd.findUserWithId(fromUserId);
      const program = this._strategist.findProgramWithId(programId);
      return {
        ...rest,
        program,
        toUser,
        fromUser,
      };
    });
  }

  listInvitesToCurrentUser() {
    return this._invites.filter((invite) => {
      return invite.toUserId === this._gatekeeper.userId;
    });
  }

  invitesByProgram(programId) {
    return this._invites.filter((invite) => invite.program.id === programId);
  }

  pendingInvitesByProgram(programId) {
    const invites = this.invitesByProgram(programId);
    return invites.filter(
      (invite) => invite.status === INVITE_STATUSES.PENDING
    );
  }

  invite({ toEmail, programId }) {
    const fromUserId = this._gatekeeper.userId;

    const toUser = this._shepherd.findUserWithEmail(toEmail);
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
