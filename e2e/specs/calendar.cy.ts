import { pageOpen } from "../helpers";

describe("calendar", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  it("highlights calendar dates with uncompleted todos active in that day", () => {
    // create a todo starting yesterday and ending today
    // create a todo for tomorrow and complete it
    // go to calendar view
    // see that yesterday is highlighted
    // see that today is highlighted
    // see that tomorrow is not highlighted
  });

  it("shows todos' timeline for the selected date in calendar", () => {
    // create a todo starting today and ending tomorrom and complete it
    // create a todo starting and ending today
    // go to calendar view
    // selected yesterday and see that nothing is show
    // selected today and see that both todos are visible
    // select tomorrow and see that only on todo is shown
  });

});