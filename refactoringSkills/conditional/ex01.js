function plumages(birds) {
  // [key, value]
  return new Map(birds.map((b) => [b.name, plumage(b)]));
}

function speeds(birds) {
  return new Map(birds.map((b) => [b.name, airSpeedVelocity(b)]));
}

// 깃털 상태
function plumage(bird) {
  switch (bird.type) {
    case "유럽 제비":
      return "보통이다";
    case "아프리카 제비":
      return bird.nuberOfCocounts > 2 ? "지쳤다" : "보통이다";
    case "노르웨이 파랑 앵무":
      return bird.voltage > 100 ? "그을렸다" : "예쁘다";
    default:
      return "알 수 없다";
  }
}

// 비행 속도
function airSpeedVelocity(bird) {
  switch (bird.type) {
    case "유럽 제비":
      return 35;
    case "아프리카 제비":
      return 40 - 2 * bird.numberOfCocounts;
    case "노르웨이 파랑 앵무":
      return bird.isNailed ? 0 : 10 + bird.voltage / 10;
    default:
      return null;
  }
}

/** 👉 1단계 - 클래스로 묶기 */

function plumage(bird) {
  return new Bird(bird).plumage;
}

function speeds(bird) {
  return new Bird(bird).airSpeedVelocity;
}

// 💬 switch들을 내부 Class로 묶어줌
class Bird {
  constructor(birdObject) {
    Object.assign(this.birdObject);
  }

  get plumage() {
    switch (bird.type) {
      case "유럽 제비":
        return "보통이다";
      case "아프리카 제비":
        return bird.nuberOfCocounts > 2 ? "지쳤다" : "보통이다";
      case "노르웨이 파랑 앵무":
        return bird.voltage > 100 ? "그을렸다" : "예쁘다";
      default:
        return "알 수 없다";
    }
  }

  get airSpeedVelocity() {
    switch (bird.type) {
      case "유럽 제비":
        return 35;
      case "아프리카 제비":
        return 40 - 2 * bird.numberOfCocounts;
      case "노르웨이 파랑 앵무":
        return bird.isNailed ? 0 : 10 + bird.voltage / 10;
      default:
        return null;
    }
  }
} // class

/** 👉  최종 단계 */
function plumages(birds) {
  return new Map(
    birds.map((b) => createBird(b)).map((bird) => [bird.name, bird.plumage])
  );
}

function speeds(birds) {
  return new Map(
    birds
      .map((b) => createBird(b))
      .map((bird) => [bird.name, bird.airSpeedVelocity])
  );
}

// 💬 각각의 타입에 맞는 class 생성
function createBird(bird) {
  switch (bird.type) {
    case "유럽 제비":
      return new EropueanSwallow(bird);
    case "아프리카 제비":
      return new AfricanSwallow(bird);
    case "노르웨이 파랑 앵무":
      return new NorwegianBlueParrot(bird);
    default:
      return new Bird(bird);
  }
}

// ⭐️ 공통된 부분을 한곳에 모은 부모 클래스
class Bird {
  constructor(birdObject) {
    Object.assign(this.birdObject);
  }
  get plumage() {
    return "알 수 없다";
  }

  get airSpeedVelocity() {
    return null;
  }
}

// 👍 각각 상속 받아 필요부분만 구현하면 된다.
class EropueanSwallow extends Bird {
  get plumage() {
    return "보통이다";
  }
  get airSpeedVelocity() {
    return 35;
  }
}
