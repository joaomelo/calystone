import { Stateful } from "../../lib";
import { INVITE_STATUSES } from "../hostess";
import { AUTH_STATUSES } from "./statuses";

export class Brother extends Stateful {
  _auth;

  _user;
  _authStatus = AUTH_STATUSES.UNSOLVED;

  _programs = [];
  _artifacts = [];
  _users = [];
  _invites = [];

  constructor({ service }) {
    super();
    this._auth = service.auth;

    service.select(
      ["auth", "programs", "artifacts", "users", "invites"],
      (selectData) => {
        const [authData, programsData, artifactsData, usersData, invitesData] =
          selectData;

        this._authStatus = authData
          ? AUTH_STATUSES.SIGNED_IN
          : AUTH_STATUSES.SIGNED_OUT;
        this._user = authData;

        if (selectData.some((data) => !data)) {
          this._users = [];
          this._programs = [];
          this._artifacts = [];
          this._invites = [];
          this.notify();
          return;
        }

        this._users = usersData;

        this._programs = programsData.map((programData) => {
          const { usersIds, ...program } = programData;
          const users = usersIds.map((userId) => this.findUserWithId(userId));
          program.users = users;
          return program;
        });

        this._artifacts = artifactsData;

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
    return this.listProgramsOfUser(this.userId);
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

  listPendingInvitesToCurrentUser() {
    return this.listInvitesToUser(this.userId).filter(
      (invite) => invite.status === INVITE_STATUSES.PENDING
    );
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

  get authStatus() {
    return this._authStatus;
  }

  get signedIn() {
    return this._authStatus === AUTH_STATUSES.SIGNED_IN;
  }

  get userId() {
    return this._user?.uid;
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
