import { Program } from "../program";
import { User } from "../user";
import { INVITE_STATUSES } from "./statuses";

export class Invite {
  _invitesDataset;

  _id;
  _program;
  _fromUser;
  _toUser;
  _status;

  constructor({ id, service }) {
    this._invitesDataset = service.data.invites;

    const { status, programId, fromUserId, toUserId } =
      this._invitesDataset.findWithId(id);

    this._id = id;
    this._status = status;
    this._program = new Program({ id: programId, service });
    this._toUser = new User({ id: toUserId, service });
    this._fromUser = new User({ id: fromUserId, service });
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

  accept() {
    const promiseInvite = this._invitesDataset.set({
      id: this._id,
      status: INVITE_STATUSES.ACCEPTED,
    });
    const promiseProgram = this._program.includeUser(this._toUser);
    return Promise.all([promiseInvite, promiseProgram]);
  }

  ignore() {
    return this._invitesDataset.set({
      id: this._id,
      status: INVITE_STATUSES.IGNORED,
    });
  }
}
