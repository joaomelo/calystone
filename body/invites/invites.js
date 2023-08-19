import { Stateful } from "../../lib";
import { Invite } from "./invite";
import { INVITE_STATUSES } from "./statuses";

export class Invites extends Stateful {
  _auth;
  _invitesDataset;
  _invites = [];

  constructor(service) {
    super();
    this._auth = service.auth;
    this._invitesDataset = service.data.invites;

    this._invitesDataset.subscribe((invitesData) => {
      this._invites = service.loadedOnce
        ? invitesData.map(({ id }) => new Invite({ id, service }))
        : [];
      this.notify();
    });
  }

  listInvites() {
    return this._invites;
  }

  listInvitesToUser(userId) {
    return this._invites.filter((invite) => invite.isTo(userId));
  }

  listInvitesToCurrentUser() {
    return this.listInvitesToUser(this._auth.userId);
  }

  listPendingInvitesToCurrentUser() {
    const invites = this.listInvitesToCurrentUser();
    return invites.filter((invite) => invite.isPending());
  }

  listInvitesOfProgram(programId) {
    return this._invites.filter((invite) => invite.isOf(programId));
  }

  listPendingInvitesOfProgram(programId) {
    const invites = this.listInvitesOfProgram(programId);
    return invites.filter((invite) => invite.isPending());
  }

  invite({ toUserId, programId }) {
    const fromUserId = this._auth.userId;
    const status = INVITE_STATUSES.PENDING;
    return this._invitesDataset.add({
      fromUserId,
      toUserId,
      programId,
      status,
    });
  }
}
