import sinon from "sinon";
import { getWords } from "../../thunks";
import "node-fetch";
import fetchMock from "fetch-mock";
import {
  LOAD_WORDS_IN_PROGRESS,
  LOAD_WORDS_SUCCESS,
  LOAD_WORDS_FAILURE,
} from "../../actions";

describe("The getWords thunk", () => {
  test("Dispatches the correct actions on success", async () => {
    const fakeDispatch = sinon.spy();

    const fakeWords = [
      { char: "a", isCorrect: null },
      { char: "a", isCorrect: null },
    ];
    fetchMock.get("http://localhost:3004/words?_start=721&_end=821", fakeWords);

    const expectedFirstAction = { type: LOAD_WORDS_IN_PROGRESS };
    const expectedSecondAction = {
      type: LOAD_WORDS_SUCCESS,
      payload: { wordList: fakeWords },
    };

    await getWords()(fakeDispatch);

    expect(fakeDispatch.firstCall.args[0]).toEqual(expectedFirstAction);
    expect(fakeDispatch.secondCall.args[0]).toEqual(expectedSecondAction);

    fetchMock.reset();
  });

  test("Dispatches the correct actions on failure", async () => {
    const fakeDispatch = sinon.spy();

    fetchMock.get(
      "http://localhost:3004/words?_start=721&_end=821",
      Promise.reject("Sample Error")
    );

    const expectedFirstAction = { type: LOAD_WORDS_IN_PROGRESS };
    const expectedSecondAction = {
      type: LOAD_WORDS_FAILURE,
      payload: { error: "Sample Error" },
    };

    await getWords()(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).toEqual(expectedFirstAction);
    expect(fakeDispatch.getCall(1).args[0]).toEqual(expectedSecondAction);

    fetchMock.reset();
  });
});
