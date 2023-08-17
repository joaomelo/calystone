import { Invite } from "../invite";
import { INVITE_STATUSES } from "./statuses";

export class Hostess {
  _auth;
  _invitesDataset;
  _programsDataset;
  _invites = [];

  constructor({ service }) {
    this._auth = service.auth;
    this._invitesDataset = service.data["invites"];
    this._programsDataset = service.data["programs"];

    this._invitesDataset.subscribe((invitesData) => {
      this._invites = invitesData
        ? invitesData.map(({ id }) => Invite.service({ id, service }))
        : [];
      this.notify();
    });
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

  accept(invite) {
    const { id } = invite;
    this._invitesDataset.set({
      id,
      status: INVITE_STATUSES.ACCEPTED,
    });

    const { toUser, program } = invite;
    const currentUsers = program.users.map(({ id }) => id);
    const usersIds = [toUser.id, ...currentUsers];
    this._programsDataset.set({ id: program.id, usersIds });
  }

  ignore(invite) {
    const { id } = invite;
    this._invitesDataset.set({
      id,
      status: INVITE_STATUSES.IGNORED,
    });
  }
}
