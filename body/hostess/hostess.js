import { INVITE_STATUSES } from "./statuses";

export class Hostess {
  _gatekeeper;
  _invitesDataset;
  _programsDataset;

  constructor({ gatekeeper, invitesDataset, programsDataset }) {
    this._gatekeeper = gatekeeper;
    this._invitesDataset = invitesDataset;
    this._programsDataset = programsDataset;
  }

  invite({ toUserId, programId }) {
    const fromUserId = this._gatekeeper.userId;
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
