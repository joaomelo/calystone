import { Stateful } from "../../lib";

export class Brother extends Stateful {
  _auth;

  _programs = [];
  _artifacts = [];

  constructor({ service }) {
    super();

    service.select(
      ["auth", "programs", "artifacts", "users", "invites"],
      (selectData) => {
        const [, programsData, artifactsData, ,] = selectData;

        if (selectData.some((data) => !data)) {
          this._programs = [];
          this._artifacts = [];
          this.notify();
          return;
        }

        this._programs = programsData.map((programData) => {
          const { usersIds, ...program } = programData;
          const users = usersIds.map((userId) => this.findUserWithId(userId));
          program.users = users;
          return program;
        });

        this._artifacts = artifactsData;

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
}
