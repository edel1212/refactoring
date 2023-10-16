{
  /**
   👉 GPS 추적 기록의 총 거리를 계산하는 함수
  */
  function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = calculateDistance();
    const pace = totalTime / 60 / totalDistance;
    return {
      time: totalTime,
      distance: totalDistance,
      pace,
    };

    /**
    👉 총 거리 계산 함수
    */
    function calculateDistance() {
      let result = 0;
      for (let i = 0; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
      } // for
      return result;
    } // fun

    function distance(p1, p2) {} // 두 지점의 거리 계산
    function radians(degrees) {} // 라디안 값으로 변환
    function calculateTime() {} // 총 시간 계산
  } // fun
}

////////////////////////////////

// 👉 함수를 분리해준 후 매개변수"points"를 추가
function totalDistance(points) {
  let result = 0;
  for (let i = 0; i < points.length; i++) {
    result += distance(points[i - 1], points[i]);
  } // for
  return result;

  //
  /**
   * 👉 distance해당 함수를 사용 하는 부분은
   * trackSummary가 아닌 totalDistance 함수이므로 이동
   * - 추가적으로 radians()함수를 사용하는 부분은 distance(p1, p2)함수 내부이다 - 생략했음
   */
  function distance(p1, p2) {}
  function radians(degrees) {}
} // fun

// 👉 중첩함수에서 제거
function calculateTime() {}

function trackSummary(points) {
  const totalTime = calculateTime();
  // 👉 totalDistance -> totalDistance() 변수인라인으로 해결
  const pace = totalTime / 60 / totalDistance(points);
  return {
    time: totalTime,
    distance: totalDistance(points),
    pace,
  };
} // fun

///////////////////////////
