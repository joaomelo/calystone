import { Program } from "../program";
import { User } from "../user";
import { INVITE_STATUSES } from "./statuses";

export class Invite {
  _id;
  _program;
  _fromUser;
  _toUser;
  _status;

  static service({ id, service }) {
    const { status, programId, fromUserId, toUserId } =
      service.data["invites"].findWithId(id);

    const program = Program.service({ id: programId, service });
    const toUser = User.service({ id: toUserId, service });
    const fromUser = User.service({ id: fromUserId, service });

    return new Invite({ id, status, program, toUser, fromUser });
  }

  constructor({ id, status, toUser, fromUser, program }) {
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
