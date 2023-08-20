import { Program } from "../programs";
import { User } from "../users";
import { INVITE_STATUSES } from "./statuses";

export class Invite {
  _id;
  _program;
  _fromUser;
  _toUser;
  _status;

  static mount({ inviteId, invitesData, programsData, usersData }) {
    const { fromUserId, toUserId, programId, ...inviteData } = invitesData.find(
      ({ id }) => id === inviteId
    );

    const program = Program.mount({ programId, programsData, usersData });
    const toUser = User.mount({ userId: toUserId, usersData });
    const fromUser = User.mount({ userId: fromUserId, usersData });

    return new Invite({ program, toUser, fromUser, ...inviteData });
  }

  constructor({ id, status, program, toUser, fromUser }) {
    this._id = id;
    this._status = status;
    this._program = program;
    this._toUser = toUser;
    this._fromUser = fromUser;
  }

  get id() {
    return this._id;
  }

  get status() {
    return this._status;
  }

  get program() {
    return this._program;
  }

  get toUser() {
    return this._toUser;
  }

  get fromUser() {
    return this._fromUser;
  }

  isPending() {
    return this.status === INVITE_STATUSES.PENDING;
  }

  isAccepted() {
    return this.status === INVITE_STATUSES.ACCEPTED;
  }

  isIgnored() {
    return this.status === INVITE_STATUSES.IGNORED;
  }

  isTo(userId) {
    return this.toUser.id === userId;
  }

  isFrom(userId) {
    return this.fromUser.id === userId;
  }

  isOf(programId) {
    return this.program.id === programId;
  }
}
