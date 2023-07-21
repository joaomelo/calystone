import { StatefulRepository } from "../../lib";
import { INVITE_STATUSES } from "./statuses";

export class Hostess extends StatefulRepository {
  _invites;
  _gatekeeper;
  _shepherd;

  constructor({ invites, gatekeeper, shepherd }) {
    super();
    this._invites = invites;
    this._gatekeeper = gatekeeper;
    this._shepherd = shepherd;

    this._invites.subscribe((rawItems) => {
      const items = rawItems.map((invite) => {
        const { toUserId, fromUserId, ...rest } = invite;
        const toUser = this._shepherd.get(toUserId);
        const fromUser = this._shepherd.get(fromUserId);
        return {
          ...rest,
          toUser,
          fromUser,
        };
      });
      this.load(items);
    });
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

  invitesByProgram(programId) {
    return this.filter((invite) => invite.programId === programId);
  }

  pendingInvitesByProgram(programId) {
    const invites = this.invitesByProgram(programId);
    return invites.filter(
      (invite) => invite.status === INVITE_STATUSES.PENDING
    );
  }
}
