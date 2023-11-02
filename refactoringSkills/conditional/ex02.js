/** 전력 회사에서 전력이 필요한 현장에 인프라를 설치해 서비스를 제공하는 기능 */
class Sit {
  get customer() {
    return this._customer;
  }
}

class Customer {
  get name() {} // 고객이름
  get billingPlan() {} // 요금제
  set billingPlan(arg) {}
  get paymentHistory() {}
}

/***
 *  💬 공통적으로 "미확인 고객"를 체크하는 로직이 들어가 있음
 */

// 클라이언트 1
const sit = new Sit();
const aCustomer = sit.customer;
let customerName;
if (aCustomer == "미확인 고객") cusomterName = "거주자";
else cusomerName = aCustomer.name;

// 클라이언트 2
const plan =
  aCustomer == "미확인 고객"
    ? registery.billingPlans.basic
    : aCustomer.billingPlan;

// 클라이언트 3
if (aCustomer !== "미확인 고객") aCustomer.billingPlan = newPaln;

// 클라이언트 4
const weeksDelinquent =
  aCustomer === "미확인 고객"
    ? 0
    : aCustomer.paymentHistory.weeksDelinquenIntLastYear;

////////////////////////////////////////
// 리팩터링 시작
////////////////////////////////////////

// 👉 사실 해당 리팩터링에서 특별할 건 없고 예시가 길뿐이지만 간단하게 요약하면
//   @ 공통 함수를 만들어 처리
//    - 중복되는 미확인 체크 코드를 함수화하여 사용하고 한곳을 모아사용하기
//    - 특별하게 사용해야하는 문자가 있으면 클래스 내부에 추가하기
//       - cusomterName = "거주자"
//   @ 해당 조건에 맞는 데이터를 반환하는 레터를을 각각 생서앟여 사용하기
//   @ JSON 데이터를 활용하는 방법이 있다.

// 해당 함수로 조건 비교!
const inUnknown = (arg) => {
  if (!(arg instanceof Customer || arg === "미확인 고객")) {
    throw new Error(`잘못된 값과 비교 : <${AbstractRange}>`);
  }
  return arg === "미확인 고객";
};
