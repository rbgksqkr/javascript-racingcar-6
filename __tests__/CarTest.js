import { MissionUtils } from "@woowacourse/mission-utils";
import CarList from "../src/CarList";
import App from "../src/App.js";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("CarList 메소드 테스트", () => {
  test("자동차 이름이 여러개 입력했을 때 split 되는 지 체크", () => {
    const carList = new CarList();
    carList.setCarList("park,gyu,han");
    expect(carList.getCarList()[0].name).toBe("park");
  });

  test("1번 시도했을 때 CarList 점수를 출력하는 메소드", async () => {
    const inputs = ["park,gyu", "1"];
    const random = [4, 3];
    const output = ["park : -", "gyu : "];
    const logSpy = getLogSpy();
    mockQuestions(inputs);
    mockRandoms([...random]);

    const app = new App();
    await app.play();

    output.forEach((element) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(element));
    });
  });
});
