import { Program } from "../program";
import { User } from "../user";

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
}
