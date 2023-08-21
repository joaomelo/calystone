import { Stateful } from "../../lib";
import { Invite } from "./invite";
import { INVITE_STATUSES } from "./statuses";

export class Invites extends Stateful {
  _auth;
  _invitesDataset;
  _programsDataset;
  _invites = [];

  constructor(service) {
    super();
    this._auth = service.auth;
    this._invitesDataset = service.data.invites;
    this._programsDataset = service.data.programs;

    service.select(
      ["invites", "programs", "users"],
      ([invitesData, programsData, usersData]) => {
        if (!invitesData || !programsData || !usersData) {
          this._invites = [];
          this.notify();
          return;
        }

        this._invites = invitesData.map(({ id: inviteId }) =>
          Invite.mount({ inviteId, invitesData, programsData, usersData })
        );
        this.notify();
      }
    );
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

  findInviteWithId(id) {
    return this.listInvites().find((invite) => invite.id === id);
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
    const promiseInvite = this._invitesDataset.set({
      id: invite.id,
      status: INVITE_STATUSES.ACCEPTED,
    });

    const { users: currentUsers } = invite.program.users;
    const currentUsersIds = currentUsers.map(({ id }) => id);
    const { toUser } = invite;
    const usersIds = [toUser.id, ...currentUsersIds];

    const { program } = invite;
    const promiseProgram = this._programsDataset.set({
      id: program.id,
      usersIds,
    });

    return Promise.all([promiseInvite, promiseProgram]);
  }

  ignore(invite) {
    const { id } = invite;
    return this._invitesDataset.set({
      id,
      status: INVITE_STATUSES.IGNORED,
    });
  }
}
