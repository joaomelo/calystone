import { Stateful, select } from "../../lib";
import { INVITE_STATUSES } from "../hostess";

export class Brother extends Stateful {
  _gatekeeper;
  _programsDataset;
  _usersDataset;
  _invitesDataset;
  _programs = [];
  _users = [];
  _invites = [];

  constructor({ gatekeeper, programsDataset, invitesDataset, usersDataset }) {
    super();
    this._gatekeeper = gatekeeper;
    this._programsDataset = programsDataset;
    this._usersDataset = usersDataset;
    this._invitesDataset = invitesDataset;
    select(
      [programsDataset, usersDataset, invitesDataset],
      ([programsData, usersData, invitesData]) => {
        if (!programsData || !usersData || !invitesData) {
          this._users = [];
          this._programs = [];
          this._invites = [];
          this.notify();
          return;
        }

        this._users = [...usersData];

        this._programs = programsData.map((programData) => {
          const { usersIds, ...program } = programData;
          const users = usersIds.map((userId) => this.findUserWithId(userId));
          program.users = users;
          return program;
        });

        this._invites = invitesData.map((inviteData) => {
          const { toUserId, fromUserId, programId, ...invite } = inviteData;
          invite.toUser = this.findUserWithId(toUserId);
          invite.fromUser = this.findUserWithId(fromUserId);
          invite.program = this.findProgramWithId(programId);
          return invite;
        });

        this.notify();
      }
    );
  }

  listPrograms() {
    return this._programs;
  }

  listProgramsOfUser(userId) {
    return this.listPrograms().filter((item) =>
      item.users.find((user) => user.id === userId)
    );
  }

  listProgramsOfCurrentUser() {
    return this.listProgramsOfUser(this._gatekeeper.userId);
  }

  findProgramWithId(id) {
    return this.listPrograms().find((program) => program.id === id);
  }

  listInvites() {
    return this._invites;
  }

  listInvitesToUser(userId) {
    return this._invites.filter((invite) => invite.toUser.id === userId);
  }

  listInvitesToCurrentUser() {
    return this.listInvitesToUser(this._gatekeeper.userId);
  }

  listInvitesOfProgram(programId) {
    return this._invites.filter((invite) => invite.program.id === programId);
  }

  listPendingInvitesOfProgram(programId) {
    const invites = this.listInvitesOfProgram(programId);
    return invites.filter(
      (invite) => invite.status === INVITE_STATUSES.PENDING
    );
  }

  listUsers() {
    return this._users;
  }

  findUserWithId(id) {
    return this._users.find((user) => user.id === id);
  }

  findUserWithEmail(email) {
    return this._users.find((user) => user.email === email);
  }
}
