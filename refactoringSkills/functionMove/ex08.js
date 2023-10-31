// 👎 변경 전 - 중첩 조건문을 보호 구문으로 바꾸기 - 반대 경우
function adjustedCaptial(anInstrument) {
  let result = 0;
  if (anInstrument.capital > 0) {
    if (anInstrument.interestRate > 0 && anInstrument.duration > 0) {
      result = a * b * 3 * 10; // 복잡 계산 로직
    } //If
  }
  return result;
}

// 👍 변경 1 단계
function adjustedCaptial(anInstrument) {
  let result = 0;
  // 👉 기존 0보다 클 경우를 ==> 0보다 작거나 같을 경우를 만들어 보호구문으로 반환
  if (anInstrument.capital <= 0) return result;
  // 계산식이 들어갔던 로직을 --> !로 반전 시켜 보호 구문 추가
  if (!(anInstrument.interestRate > 0 && anInstrument.duration > 0))
    return result;
  return a * b * 3 * 10; // 복잡 계산 로직
}

// 👍 변경 2 단계  -  not 제거
function adjustedCaptial(anInstrument) {
  let result = 0;
  if (anInstrument.capital <= 0) return result;
  // 조건을 반전 시켜버리면 쉽게 해결
  if (anInstrument.interestRate <= 0 || anInstrument.duration <= 0)
    return result;

  return a * b * 3 * 10; // 복잡 계산 로직
}

// 👍 변경 최종 단계  -  0 반환 하는 것을 하나로 통합
function adjustedCaptial(anInstrument) {
  // 조건을 반전 시켜버리면 쉽게 해결
  if (
    anInstrument.capital <= 0 ||
    anInstrument.interestRate <= 0 ||
    anInstrument.duration <= 0
  )
    return 0;

  return a * b * 3 * 10; // 복잡 계산 로직
}
