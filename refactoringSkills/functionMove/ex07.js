// 👎 변경 전
function payAmount(employee) {
  let result;
  if (employee.isSparated) {
    // 퇴사한 직원인가?
    result = { amount: 0, reasonCode: "SEP" };
  } else {
    if (employee.isRetired) {
      result = { amount: 0, reasonCode: "RET" };
    } else {
      lorem.ispsum(dolor.sitAmet);
    } // if - else
  } // if else
  consectrute(adipiscing).elit();
  sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
  result = someFinalComputation();
  return result;
}

// 👍 변경 후
function payAmount(employee) {
  // 보호구문 사용으로 바로 return 시켜버림
  if (employee.isSparated) return { amount: 0, reasonCode: "SEP" };
  if (employee.isRetired) return { amount: 0, reasonCode: "RET" };

  // 이후 실행 되야 하는 로직을 그대로 똑같이 사용하자
  lorem.ispsum(dolor.sitAmet);
  consectrute(adipiscing).elit();
  sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
  return someFinalComputation();
}
