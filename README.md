# Refactoring

<hr/>

## 기본적인 리팩토링

### 함수 추출하기

- 코드 조각을 찾아 무슨 일을 하는지 파악한 다음, 독립된 함수로 추출하고 목적에 맞는 이름을 붙인다.
- 목적과 구현을 분리하는 방식을 기준으로 잡으면 좋다

  - 코드를 보고 무슨 동작을 하는지 파악하는데 시간이 한참 걸린다면 그 부분을 함수로 추출한 뒤 `무슨일`에 걸 맞는 이름을 지어주는 것이 좋다.
    - 이러한 방식을 사용하면 코드가 길어질 수는 있지만, 함수의 목적이 눈에 명확하게 들어온다.
    - 함수 안에 들어갈 코드가 `대 여섯줄을 넘어`갈 떄부터 함수 추출하기를 고려해 보자
      - 저자의 경우 `단 한줄`짜리 메서드를 만드는 경우도 적지 않았다 하였다.
        - ex) 화면의 색을 바꾸는 기능을 하는 메서드의 명이 `highlight()`이지만 내부 코드는 `reverse()`뿐이 었다.
          - 메서드 명보다 내부 실행 함수가 더 짧지만 단 한줄의 메서드로 추출함으로 써 조금 더 직관적으로 변함
          - 단! 위와 같은 경우는 `메서드명`을 잘 짓는것이 가장 중요하다.

- 예시
  - 유효 범위를 벗어나는 변수가 없을 때 : [링크](https://github.com/edel1212/refactoring/blob/main/refactoringSkills/extaractFunction/ex01.js)
    - 중첩 함수를 통해 해결함
  - 지역 변수를 사용할 때 : [링크](https://github.com/edel1212/refactoring/blob/main/refactoringSkills/extaractFunction/ex02.js)
    - 추출한 함수에 매개변수로 지역변수를 전달하여 해결함
  - 지역 변수의 값을 변경 할 때 : [링크](https://github.com/edel1212/refactoring/blob/main/refactoringSkills/extaractFunction/ex03.js)
    - 함수를 추출 후 반환 값이 있는 `return`하는 함수로 만든 후 지역변수에 해당 값을 할당하여 해결함
    - **값을 반환할 변수가 여러개 일 경우 ?**
      - 각각 반환환하는 함수를 여러개로 만드는 방법
      - 반환 값들을 한 레코드로 묶어서 반환해도 되지만 이러한 방법 보다는 `임시 변수를 질의함수로 바꾸기` 혹은 `변수를 쪼개기`를 사용하여 쪼개서 보내주는 것이 좋다.

### 함수 인라인하기

- 해당 리팩토링 기법 반대의 기법은 위에서 설명했던 `함수 추출하기`이다.
- 해당 책에서는 분명 목적이 들어나는 이름으로 함수를 추출하라고 권하였지만, 때때로 함수 본문이 이름만큼 명확한 경우에는 오히려 그 함수를 `제거` 한다.
  - 간접 호출은 유용할 할 수 있지만 쓸데 없는 간접 호출은 거슬릴 뿐이기 떄문이다.
- ✅ 배워야하는 중요 포인트는 언제 `함수 추출하기` 또는 `함수 인라인하기`를 사용할지 정하는 방법이다.
- 간접 호출을 너무 과하게 쓰는 코드 또는 위임 관계가 복잡하게 얽혀 있으면 `함수 인라인`의 대상이다.
- 재귀호출, 반환문이 여러개인 함수, 접근자가 없이 다른 메서드를 인하인 함수 와 같은 복잡한 함수는 `인라인하기를 적용하면 안되는` 함수라고 판단하자.

- 예시
  - 함수로 추출되어 있지만 코드의 내용이 직관적인 상황 : [링크](https://github.com/edel1212/refactoring/blob/main/refactoringSkills/inlineFunction/ex01.js)
    - 로직 자체를 단순히 잘라낸 후 함수내에 인라인 시켜서 해결
  - 단순 잘라내기 붙여넣기로 해결하기 힘든 상황 : [링크](https://github.com/edel1212/refactoring/blob/main/refactoringSkills/inlineFunction/ex02.js)
    - 상황이 복잡해진다면 한 문장씩 단계를 잘게 나눠서 처리해주자.

### 변수 추출하기

- 코드내 표현식이 너무 복잡하고 이해하기 어려울때 `지역변수`를 활용하면 표현식을 쪼개 관리하기 더 쉽게 만들 수 있다.
- 복잡한 로직을 구성하는 단계마다 이름을 붙일 수 있어서 코드 의 목적을 훨씬 명확하게 드러낼 수 있다.
  - 이과정에서 디버거에 중단점을 지정하거나 상태를 출력하는 등의 `디버깅`에 도움이 된다.
- 함수를 벗어난 넓은 문맥에서까지 의미가 사용된다면 그 넓은 범위에서 통용되는 이름을 생각하여 사용해야한다.

  - 이러한 경우 변수가 아닌 함수로 추출해야한다.
  - 이름이 통용되는 문맥이 많아 늘어날 것 같다면 `임시 변수를 질의 함수로 바꾸기`를 적용할 수 있을때까지 일단 놔둔다.

- 예시
  - 기본 예시 : [링크](https://github.com/edel1212/refactoring/blob/main/refactoringSkills/inlineFunction/ex03.js)
    - 복잡한 표현식을 지역변수를 사용하여 해결
  - 클래스 안에서 : [링크](https://github.com/edel1212/refactoring/blob/main/refactoringSkills/inlineFunction/ex04.js)
    - 생성자를 통해 받은 값을 사용하여 `get()`를 통해 함수를 생성

### 변수 인라인하기

- 변수의 이름이 원래 표션식과 다를 바 없을 때 적용해 주면 좋다.
- JSON 데이터를 추출만하여 변수를 만드는 무의미한 변수에 적용하면 된다.
- 예시
  - `let basPrice = anOrder.basePrice;  return  basePrice > 1_000` ===> `return anOrder.basePrice > 1_000;`

### 함수 선언 바꾸기

- 다른 이름으로는 `함수 이름 바꾸기` 또는 `매개변수명 바꾸기`이다.
- 함수는 실질적으로 스포트웨어 시스템의 구성 요소를 조리바하는 연결부 역할을 한다.
- 연결부에서 가장 주용한 요소는 함수의 이름이다.
  - 이름이 좋으면 함수의 구현 코드를 살펴볼 필요 없이 호출문만 보고도 무슨 일을 하는지 파악 할 수 있다.
- 하지만 좋은 이름을 떠올리는 것은 쉽지 않고 코드를 읽다가 의미가 와닿지 않는 코드를 발견해도 그대로 두고 싶은 유혹에 빠지기 쉽다 `굉장히 귀찮기 때문 ...`
  - 하지만! 이는 '혼란'이라는 악마의 유혹이다 이 유혹에 넘어가지 말고 즉시 바꾸는 습관을 들이자
  - 분명 나중에 다시 볼때 코드를 다시 한번 `또` 이해하려는 노력을 하지 않아도 되어서 미래를 생각하면 훨씬 더 효율 적일 것이다.
- > 좋은 이름을 떠올리는데 효과적인 방법은 주석을 이용해 함수의 목적을 설명해보는것이다. 그러다보면 주삭이 멋진 이름이 바뀌어 돌아올 떄가 있다.
- 매개변수의 경우 함수의 문맥을 설정한다.
  - 전화번호 포매팅 함수가 있 경우 매개변수로 사람이 들어가는 것보다 전화번호 자체를 받고록 정의하면 함수의 `활용 범위가 더욱 넓어` 진다.
  - 위와 같은 방법은 다른 모듈과의 결합 또한 제거 할 수 있다.
    - 도장에 필요한 모듈 수가 줄어들 수록 무언사 수정할 때 머리에 담아둬야 하는 내용도 적어진다 `💬 쉽게말해 결합도를 낮추는 것! `
- 매개변수를 올바르게 선택하기란 단순히 규칙 몇개로 표현할 수 없기다. 코드의 구현 목적에 또는 상황에 따라 달라지기 떄문이다.
  - 따라서 어떻게 연결하는 것이 더 나인지 더 잘이해하게 될 때마다 그에 맞게 코드를 개선할 수 있도록 `함수 선언 바꾸기`에 익숙해 져야한다.
- 간단한 절차 👉 `함수명과 매개변수 둘다 변경 하고 싶을 경우 독립적으로 나눠서 진행 하자`

  - 예시

    ```javascript
    // 함수 이름이 너무 축약한 예  - 원 둘래를 구하는 함수
    //  변경 전 👎
    function circum(radius) {
      return 2 * Math.PI * radius;
    }

    ////////////////////////////
    ////////////////////////////

    //  리팩토링 후 👍
    function circumference(radius) {
      return 2 * Math.PI * radius;
    }
    ```

- 마이그레이션 절차 👉 `이름 자체만을 변경이 불가능할 경우 -> API 혹은 복잡하게 얽혀있는 경우 사용`

  - 1 . 이어지는 추출 단계를 수월하게 만들어야한다면 함수 본문을 적절하게 리팩토링 해주자.
  - 2 . 함수 본문을 새로운 함수로 추출한다.
  - 3 . 추출한 함수에 매개변수를 추가해야 한다면 `간단한 절차`를 따라 추가한다.
  - 4 . 테스트한다.
  - 5 . `기존 함수를 인라인`한다.
  -
  - 예시

    ```javascript
    // 함수 이름 바꾸기 (마이그레이션 절차)
    //  변경 전 👎
    function circum(radius) {
      return 2 * Math.PI * radius;
    }

    ////////////////////////////
    ////////////////////////////

    //  리팩토링 후 👍
    /**
      - circum함수는 다른 API에서 사용하는 등의 변경할 수 없는 경우라 생각하자\
      - 가능하다면 해당 함수를 폐기 예정(@deprecate) 표시를 해주자
      - 이후 수정이 가능하게 된다면 해당 메서드 명으로 변경해 주자
    **/
    function circum(radius) {
      return circumference(radius);
    }

    function circumference(radius) {
      return 2 * Math.PI * radius;
    }
    ```

### 매개변수를 속성으로 바꾸기

- 고객이 뉴잉글랜드에 살고있는지 확인하는 함수

```javascript
// 변경 전 👎
function inNewEngland(aCustomer) {
  return ["MA", "CT", "ME", "VT"].includes(aCustomer.address.state);
}

// 호출
const newEnglanders = someCustomers.filter((c) => inNewEngland(aCustomer));

////////////////////////////
////////////////////////////

/***  리팩토링 👍  */

// 코드 자체를 받게 끔 변경
function inNewEngland(stateCode) {
  return ["MA", "CT", "ME", "VT"].includes(stateCode);
}

// 호출
const newEnglanders = someCustomers.filter((c) =>
  inNewEngland(aCustomer.address.state)
);
```

### 변수 캡슐화하기

- 데이터는 함수보다 다루기 까다롭다. 그 이유는 데이터는 참조하는 모든 부분을 한 번에 바꿔야 코드가 제대로 작동한다.
  - 짧은 함수안에서의 임시 변수처럼 유효범위가 좁은 데이터는 다루기가 그렇게 까지 어렵지 않지만 `유효범위가 넒을 수록` 다루기 어려워진다.
    - 💬 전역 데이터가 골칫거리인 이유기도 함.
- 그렇기에 데이터로의 접근을 독점하는 함수를 만드는 식으로 캡슐화 하는 것이 가장 좋은 방법이다.
  - 데이터 재구성이라는 어려운 작업을 함수 재구성`(Getter, Setter)`이라는 더 단순한 작업으로 변환하는 것이다.
- 데이터 캡슐화의 이점
  - 데이터를 변경하고 사용하는 코드를 감시 할 수 확실한 통로가 되어주기에 검증 및 변경 후 추가 로직을 쉽게 끼워 넣을 수 있다.
- 앵간하면 데이터에 접근하는 방법은 캡술화로 처리해주자!
- 불변 데이터는 가변데이터보다 캡슐화할 이유가 적다

  - 데이터가 변경될 일이 없기 떄문에 갱신 전 검증 같은 추가 로직 또한 필요 없음
  - 데이터 또한 옮길 필요 없이 복제하여 사용하면 된다.
  - 따라서 불변성은 강력한 방부제 역할을 해준다.

- 예시

  ```javascript
  // 전역변수에 중요한 데이터가 담겨있다는 가정을 하자
  let defaultOwner = {fiestName:"유", lastName :"정호"};

  // 해당 데이터를 참조하는 코드
  spaceship.owner = defaultOwner;

  // 해당 코드를 갱신 하는 코드
  defaultOwner = {fiestName:"김", lastName :"덕배"};

  ////////////////////////////////////////////////////////

  // 💬 1 . 기본적인 캡슐화를 위해 가장 먼저 데이털르 읽고 쓰는 함수부터 정의한다.
  function geDefaultOwner() {return defaultOwner;}
  function setDefaultOnwer(arg) {defaultOwner = arg;}

  // 💬 2 . 그런 다음 위의에서의 defaultOwner를 참조 혹은 갱신 코드를 찾아서 방금 게터 함수를 호출하도록 변경해 주자
  spaceship.owner = geDefaultOwner();
  setDefaultOnwer({fiestName:"김", lastName :"덕배"});

  // 💬 3 . 모든 참조하는 부분을 수정했다면 변수의 가시 범위를 제한해주자. 그러면 미처 발견하지 못한 참조가 없는지 확인 또한 가능하고,
  //        나중에 수정하는 코드에서도 이변수에 직접 접근하지 못다도록 만들 수 있다. [ ✅ 쉽게말해서 모듈화 해주라는 말임! ]
  let defaultOwnerData = {fiestName:"마틴", lastName :"파울러"}
  exprot function geDefaultOwner() {return defaultOwnerData;}
  exprot function setDefaultOnwer(arg) {defaultOwnerData = arg;}

  // 💬 4 . 위의 구조를 캡슐화하면, 그 구조로의 접근이나 구조 자체를 다시 대입하는 행위는 제어할수 있다. 하지만 필드 값을 변경하는 일은 제어할수 없다.
  const owner1 = defualtOwner();
  assert.equal("파울러", owner1.lastName, "값 확인" );
  const owner2 = defualtOwner();
  owner2.lastName = "퍼거슨";
  assert.equal("퍼거슨"", owner2.lastName, "값 확인2" );
  /** 위와 같이 참조하는 부분만 캡슐화가 되어있다, 이정도로도 충분하짐나 변수 뿐아니라 분수의 내용까지 제어하고 싶다면 다른 방법을 사용해야한다. */

  // 💬 4 - 1 . 가장 간단한 방법 getter메서드에서 복제본을 반환하게하여 원본 데이터 수정을 막는다.
  let defaultOwnerData = {fiestName:"마틴", lastName :"파울러"};
  exprot function geDefaultOwner() { return Object.assign({}, defaultOwnerData); }
  /** 특히 리스트에서 이 기법을 많이 적용함. 데이터의 복제본을 반환하면 클라이언트는 게터로 얻은 데이터를 변경 할 수 있지만 원본에는 영향을 주지 못한다. **/

  // 💬 4 - 2 . 가장 좋은 방법인 레코드 캡슐화하기
  let defaultOwnerData = {fiestName:"마틴", lastName :"파울러"};
  exprot function geDefaultOwner() {return new Person(defaultOwnerData);}
  exprot function setDefaultOnwer(arg) {defaultOwnerData = arg;}

  class Person{
    constructor(data){
      this._lastName = data.lastName;
      this._firstName = data.firstName;
    }
    get lastName() { return this._lastName };
    get firstName() { return this._firstName };
  }
  /**
    위와같이 class를 통해 적용하면 defaultOwnerData의 속성을 다시 대입하는 연산은 모두 무시된다. ==> Class 객체가 반환 되기 때문이다.
    - 이처럼 class를 통해 접근 및 수정을 하는 방법이 가장 좋은 방법이다.
    - 복제본을 사용하는 방법을 사용것도 좋은 방법이며 이러한 복제가 성능에 주는 영향은 대체로 미미하기 떄문에 성능에 신경을 쓸필요가 없고 오히려
      이와 같이 복제본을 사요하지 않고 원본을 수정하는 로직은 디버깅이 어렵고 시간도 오래걸리는 위험이 크다.
    - ✅ 하지만 명심해야하는 점은 앞에서 설명한 복제본 만들기와 클래스로 감싸는 방싱은 레코드 구조에서 깊이가 1인 속성들까지만 효과가 있다.
         더 깊이 들어가면 복제본과 객체 래핑 단계가 더 늘어나게 된다. ==> 데이터의 구조가 복잡해지면 코드가 오히려 복잡해진다는 말임
                                                           ex) {key : {key:value}} 와 같은 중첩 구조를 말함
  **/
  ```

### 변수 이름 바꾸기

- 명확한 프로그래밍의 핵심은 이름 짓기이다.
- 변수는 프로그래머가 하려는 일에 관해 많은 것을 설명해준다.
- 이름의 중요성은 그 사용 범위에 영향을 많이 받는다.
  - 한줄짜리 람다식에서 사용하는 변수는 대체로 쉽게 파악이 가능하여 한글자로 된 이름을 짓기도 한다.
  - 간단한 함수의 매개변수 이름도 짧게 지어도 될때가 많다.
  - 함수 호출이 한번으로 끝나지 않고 영속되는 필드라면 이름에 더 신경을 써주자

### 매개변수 객체 만들기

- 데이터 항목 여러 개가 같은 형식으로 다른 함수에 몰려 다니는 경우 하나로 모아주는 것이 좋다.
- 한 곳으로 모아 데이터 구조를 하나로 묶어주면 데이터 사이의 관계가 명확해진다는 이점이 있다.
- 함수에서 받는 매개변수의 수가 줄어들어 가독성이 좋아진다.
- 같은 데이터구조를 사용하는 모든 함수가 이 데이터 구조를 참조할떄 같은 이름을 사용하기에 일관성 또한 높아진다.
- 데이터 구조에 담길 데이터에 공통으로 적용되는 동작을 추출해서 함수로 만들 수도 있고 더 나아가서 함수들과 데이터를 합쳐 클래스로 만들 수 도 있다.
- 새로 만든 데이터 구조가 문제영역을 훤씬 간결하게 표현하는 추상 개념으로 격상되면서 코드의 개념을 다시 그릴 수도 있다.

- 예시

  ```javascript
  /** 온도 측정값 배열에서 정상 작동 범위를 벗어난 것이 있는지 검사하는 코드 */

  // 온도 측정값
  const station = {
    name: "ZB1",
    reading: [
      { temp: 46, time: "2016-11-10 09:10" },
      { temp: 53, time: "2016-11-10 09:20" },
      { temp: 16, time: "2016-11-10 09:30" },
    ],
  };

  // 정상 범위를 벗어난 측정값을 찾는 함수
  function readingOutsideRange(station, min, max) {
    return station.readings.filter((r) => r.temp < min || r.temp > max);
  }

  // 함수 호출
  alerts = readingsOutsideRange(
    station,
    operatingPlan.temperaturFloor, // 최저 온도
    operatingPlan.temperaturCeiling
  ); // 최고 온도

  // 👉 위에서 사용하는 최저,최고 온도를 class로 묶어줌
  class NumberRange {
    constructor(min, max) {
      this._data = { min: min, max: max };
    }
    get min() {
      return this._data.min;
    }
    get max() {
      return this._data.max;
    }
  }

  // 👉 기존 함수를 "함수 선언 바꾸기"를 사용해서 매개변수를 변경
  function readingOutsideRange(station, range) {
    return station.readings.filter(
      (r) => r.temp < range.min || r.temp > range.max
    );
  }

  // 👉 변경된 형식으로 호출
  const range = new NumberRange(
    operatingPlan.temperaturFloor,
    operatingPlan.temperaturCeiling
  ); // 객체 생성
  alerts = readingOutsideRange(station, range);
  ```

- 진정한 값 객체로 거듭나기

  - 쉽게 설명하면 같은 묶어 놓은 매개변수들이 사용하는 로직등을 class의 이점을 살려서 class내부의 메서드로 만들어주는 것이다.
  - 간단한 예시로는 페이징을 사용할때 만들었던 DTO를 생각하면 될듯하다.
    - 항상 받는 파라미터는 정해져있고 그걸로 목록함수, 다음, 이전 유무 메서드 등등 을 작성해준다.

  ```javascript
  // 👉 데이터 범위 class
  class NumberRange{
    constructor(min, max){
      this._data = {min : min, max : max}
    }
    get min() {return this._data.min}
    get max() {return this._data.max}
    // ✅ 범위 체크 로직을 메서드로 추가
    contains(arg) {retun  arg < this.min || arg > this.max }
  }

  // 계산 실행 로직
   function readingOutsideRange(station, range){
    // ✅ range객체의 범위 체크 메서드를 실행
    return station.readings.filter(r => rnage.conatins(r.temp));
  }
  ```

### 여러 함수를 클래스로 묶기

- 클래스는 데이터와 함수를 하나의 공유 환경으로 묶은 후 다른 프로개름 요소와 어우러질 수 있도록 그 중의 일부를 외부에서 제공해준다.
- 프로그램의 다른 부분에서 데이터를 갱신할 가능성이 꽤 있을 때는 클래스로 묶어두면 큰 도움이 된다.
- 공통 데이터를 중심으로 긴밀하게 엮여 작동하는 함수 무리를 발견하면 클래스로 묶어 주도록 노력해보자.
  - 각 함수에 전달 되는 인수를 줄여 객채 안에서 함수 호출을 간결하게 할 수 있는 장점이있다.
  - 객체 시스템의 다른 부분에 전달하기 위한 참조를 제공해준다.
- 이미 만들어진 함수들을 재구성할 때는 물론 새로 만든 클래스와 관렪하여 놓친 연찬을 찾아서 새 클래스의 메서드로 뽑아내는 데도 간편해진다.
- 클래스로 묶었을 때 의 두드러진 장점은 클라이언트가 객체의 핵심 데이터를 변경할 수 있고, 파생 객체들을 일관되게 관리 할 수 있다는 것이다.
  - 위와 같은 함수들은 중첨 함수 형태로 묶어도 되지만 해당 방법보다는 `클래스로 묶어주는 것이` 더욱 관리하기 편함!!
  - 외부에 공개할 함수가 여러개일 경우에도 `클래스`의 경우가 더욱 구현 및 관리하기가 편할 것이다.
- 클래스를 지원하지 않는 언어를 사용할 떄는 같은 기능을 `함수를 객체처럼 패턴`을 이용해서 구현하기도한다.

  - javascript에서 class가 없을 당시 이렇게 사용했음

- 예시

  ```javascript
  /** 정부에처 차를 수돗물처럼 제공하는 프로그램 예시 사람들은 매달 차 계기량을 읽어서 측정값을 기록함 */

  // 차량 계기량 측정값
  reading = { customer: "ivan", quantity: 10, month: 5, year: 2017 };

  /** 문제의 코드 같은 로직의 함수가 중복되어 사용되고 있다👎 **/
  // 클라이언트1
  const aReading = acquiredRading();
  const baseChage = baseRate(aReading.monht, aReading.year) * aReading.quantity; // 기본 요금 계산

  // 클라이언트2
  const aReading = acquiredRading();
  const base = baseRate(aReading.monht, aReading.year) * aReading.quantity; // 기본 요금 계산
  const taxableCharge = Math.max(0, base - taxThreshold(aReading.year)); // 차 소비량만큼 면세

  // 클라이언트3
  const aReading = acquiredRading();
  const basicChargeAmount = calcualteBaseChage(aReading);

  function calculateBaseCharge(aReading) {
    // 기본 요금 계산 함수
    return baseRate(aReading.monht, aReading.year) * aReading.quantity;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 리팩토링 👍 **/
  //  레코드를 클래스로 변환하기위해 캡슐화를 진행
  class Reading {
    constructor(data) {
      this._customer = data.customer;
      this._quantity = data.quantity;
      this._month = data.month;
      this._year = data.year;
    }
    get customer() {
      return this._customer;
    }
    get quantity() {
      return this._quantity;
    }
    get month() {
      return this._month;
    }
    get year() {
      return this._year;
    }

    // 👉 함수 이름을 원하는대로 바꿔주자 "함수 이름 바꾸기"
    get baseCharge() {
      return baseRate(this._monht, this._year) * this._quantity;
    }

    // 👉 클라이언트2에서 사용하던 불필요하게 긴 로직을 같은 레코드를 쓰는 해당 클래스에서 메서드로 만들어줌
    get taxableCharge() {
      return Math.max(0, this.baseChage - taxThreshold(this._year));
    }
  }

  // 클라이언트 3
  const rawReading = acquiredRading();
  const aReading = new Reading(rawReading);
  // 💬 아래와 같이 이름을 바꾸고 나면 해당 baseCharge 값이 "필드 값" 인지 "계산된 값(메서드 호출 값)"인지 구분할수 없다
  //    이는 "단일 접근 원칙"을 따르므로 권장하는 방식이다. 👍
  const basicChargeAmount = aReading.baseCharge;

  // 클라이언트 1
  const rawReading = acquiredRading();
  const aReading = new Reading(rawReading);
  const baseCharge = aReading.baseCharge;

  // 클라이언트2
  const rawReading = acquiredRading();
  const aReading = new Reading(rawReading);
  const taxableCharge = aReading.taxableCharge;
  ```

### 여러 함수를 변환 함수로 묶기

- 소프트웨어의 데이터는 입력 받아 여러가지 정보를 도출하는데 이 과정에서 해당 정보가 여러곳에서 사용될 수 있다.
  - 그러다보면 이정보가 사용되는 곳마다 같은 도출 로직이 `반복`되기도하는데 이러한 도출 작업을 한곳에 모아두는 것이 좋다.
    - 모아두면 검색과 갱신을 일관된 장소에서 처리할 수 있으며 로직 중복을 막을 수 있는 장점이 있음
- `변환 함수`는 원본 데이터를 입력받아 필요한 정보를 도출한뒤 각각 출력 데이터를 필드에 넣어 반환 하는 기능을 한다.
  - 도출과정을 검토할 일이 생셨을 때 해당 함수만 파악하면 해결이 가능한 장점
- 가장 중요한 포인트는 `원본 데이터의 데이터 일관성을 유지`해주는 것이다.
- `여러 함수를 변환 함수로 묶기`와 비슷한 리팩터링 기술로는 `여러 함수를 클래스로 묶기`가 있다.

  - 하지만 둘사이의 중요한 차이가 하나 있다.
    - 원본 데이터가 코드 안에서 갱신될 떄는 `클래스로 묶는 편이` 훤씬 좋다.
      - `변환 함수`로 묶으면 가공한 뎅이터를 새로운 레코드로 저장하므로, 원본 데이터가 수정되면 일관성이 깨질 수 있기 때문임

- 예시

  ```javascript
  /** 정부에처 차를 수돗물처럼 제공하는 프로그램 예시 사람들은 매달 차 계기량을 읽어서 측정값을 기록함 */

  // 차량 계기량 측정값
  reading = { customer: "ivan", quantity: 10, month: 5, year: 2017 };

  /** 문제의 코드 같은 로직의 함수가 중복되어 사용되고 있다👎 **/
  // 클라이언트1
  const aReading = acquiredRading();
  const baseChage = baseRate(aReading.monht, aReading.year) * aReading.quantity; // 기본 요금 계산

  // 클라이언트2
  const aReading = acquiredRading();
  const base = baseRate(aReading.monht, aReading.year) * aReading.quantity; // 기본 요금 계산
  const taxableCharge = Math.max(0, base - taxThreshold(aReading.year)); // 차 소비량만큼 면세

  // 클라이언트3
  const aReading = acquiredRading();
  const basicChargeAmount = calcualteBaseChage(aReading);

  function calculateBaseCharge(aReading) {
    // 기본 요금 계산 함수
    return baseRate(aReading.monht, aReading.year) * aReading.quantity;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 리팩토링 👍 **/

  //  👉 입력 객체를 그대로 복사해 반환하는 변환 함수
  function enrichReading(original) {
    // ✅ lodash라는 외부 라이브러리의 cloneDeep(obj)이라는 메서드를 사용하여 깊은 복사를 사용
    const result = _.clonDeep(original);
    /**
      ✅ calculataBaseCharge를 추가하는 정보를 해당 메서드에서 한번에 처리 해서 반환 해줌
         - 해당 방법으로 처리하므로 원본 데이터가 변경하지 않고 반환이 가능함
         - 변환된 레코드를 사용해야한다는 의도를 명확하게 표현도 가능해짐
    */
    result.baseCharge = calculataBaseCharge(aReading);
    // ✅ 세금 계산 로직 또한 위와 같이 추가
    reult.taxableCharge = Math.max(
      0,
      result.baseCharge - taxThreshold(result.year)
    );
    return result;
  }

  // 👉 변경하려는 계산 로직중 하나를 골라 계산 로지겡 측정값을 전당하기 전에 부가정볼르 덧붙이도록 수정함
  const rawReading = acquiredRading();
  const aReading = enrichReading(rawReading);
  // ✅ 중첩함수를 사용하므로써 의도를 파악하는데 더욱 쉬워짐
  const basicChargeAmount = aReading.baseCharge;
  const taxableCharge = aReading.taxableCharge;
  ```

### 단계 쪼개기

- 서로 다른 두대상을 한꺼번에 다루는 코드를 발견하면 가각을 별 모듈로 나누는 방법을 모색하자
  - 수정이 생겼을 경우 두 대상을 동시에 생각할 필요 없이 하나에만 집중할수 있다.
- 모듈이 잘 분리 되어 있다면 다른 모듈의 상세 내용은 전혀 기억하지 못해도 원하는대로 수정을 할 수 있다.
- 가장 간편한 방법 연이은 두 단계로 쪼개는 것이다.
  - ex)
    - 입력처리 로직에 적합하지 않은 형태로 들어오는 파라미터를 다루기 쉬운형태로 파싱하는 경우
    - 프로그램이 컴파일 되는 경우 -> 텍스트를 토큰화하고 토큰을 파싱 -> 구문트리 생성 -> 구문트리 변환 -> 목적 코드를 생성
- 다른 단계로 볼 수 있는 코드 영역들이 마침 서로 다른 데이터와 함수를 사용한다면 `단계 쪼개기`에 적합한 상태이다.
- `단계 쪼개기`에서 가장 중요한 핵심은 `단계를 명확히 분리`하는 것이다.
- 예시 `( 절차의 설명이 불친절하여 스킵함 )`

  ```javascript
  /** 삼품의 결제 금액을 계싼하는 코드 */

  /** 계산이 두단계로 이뤄져 있지만 한곳에처 처리중임👎 **/
  function priceOrder(product, quantity, shoppingMethod) {
    // 상품 가격 계산
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;

    // 배송비 관련 계산
    const shippingPerCase = (basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee :                 shippingMethod.feePerCase;
    const shippingCost = quantity * shippingPerCase;
    const price = basePrice - discount + shippingCost;

    return price;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 리팩토링 (상품 가격과 배송비 계산을 두 단계로 나눔) 👍 **/
  function priceOrder(product, quantity, shoppingMethod) {
    // ✅ 계산 로직을 생성하며 중간 데이터를 만들어준다 ( Object 형태 )
    const priceData = calculatePricingData(product, quantity);
    // ✅ 배송비 계산 로직
    return applyShipping(priceData, shippingMethod);
  }

  // 👉 중간 데이터
  function calculatePricingData(product, quantity) {
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;
    return {basePrice: basePrice, quantity: quantity, discount: discount};
  }
  // 👉 배송비 계산
  function applyShipping(priceData, shippingMethod) {
    const shippingPerCase = (priceData.basePrice) > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
    const shippingCost = priceData.quantity * shippingPerCase;
    return priceData.basePrice - priceData.discount + shippingCost;
  }
  ```

### 레코드 캡슐화하기

- 레코드는 연관된 여러 데이터를 직관적인 방식으로 묶을 수 있어서 가각을 따로 취급 할떄 보다 훨씬 의미 있는 단위로 전달할 수 있게 해준다.
  - 하지만 단점으로는 계산해서 얻을 수 있는 값과 그렇지 않은 값을 명확히 구분해 저장해야한다는 점이 번거롭다.
    - ex) 값의 범위 `{start : 1, end : 5}` 혹은 `{start :1 , length : 5}` 어더한 식으로든 "시작"과 "길이"를 알수 있어야한다.
- 위와 같은 문제는 `객체를 사용하면` 어떻게 저장했는지를 숨긴 채 게사지 값을 각각의 메서드로 제공할 수 있다.
  - 사용자는 무엇이 저장된 값이고 무엇이 계싼된 값인지 알 필요없이 사용이 가능해짐
  - 필드 이름을 바꿔도 기존 이름과 새이름 모두를 각각의 메서드로 제공하기에 사용자와 무두가 새로운 메서드로 옮겨갈 떄까지 점진적 수정 또한 가능하다.
- 불변의 레코드일 경우에는 딱히 캡슐화를 해줄 필요는 없다 만약 변수의 이름 변경이 필요하면 `해당 필드를 복제하여` 사용함
- 레코드를 `해시, 맵, 해시맵, 배열`과 같은 라이브러리에 사용하면 다양한 작업에는 유용하지만 필드를 명확히 알려주지 않는다는 `단점`이 있다.
  - 불분명한 레코드를 명시적인 레코드로 리팩토링 해도 괜찮지만 그럴바에는 레코드를 `클래스`로 만드는 편이 훨씬 낫다.
- 예시

  - 간단한 레코드 캡슐화하기

  ```javascript
  // 프로그램 곳곳에서 레코드 구조ㄹ로 사용하는 객체
  const organization = {namr : "애크미 구스베리", country : "GB"};

  // 읽기
  result += `<h1>${organization.name}</h1>`
  // 쓰기
  organization.name = newName;

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 리팩토링 캡슐화 👍 **/
  class Organization{
    constructor(data){
      this._name = data.name;
      this._country = data.country;
    }
    // getter, setter
    get name() {return this._name};
    set name(aString) {this._name = aString};
    get country() {return this._country};
    get country(aCountry) {this._country = aCountry};
  }

  // 사용
  const organization = new Organization({namr : "애크미 구스베리", country : "GB"});
  ```

  - 중첩된 레코드 캡슐화하기

  ```javascript
  // 여러겹이 중첩된 레코드 - 중첩 정도가 심할수록 읽거나 쓸 떄 데이터 구조안으로 더 깊숙히 들어가야함
  const customerData = {
    1994: {
      name: "seunghwan",
      id: "1994",
      usages: {
        2020: {
          1: 50,
          2: 55,
        },
        2021: {
          1: 70,
          2: 63,
        },
      },
    },
    1997: {
      name: "pauler",
      id: "1994",
      usages: {
        2020: {
          1: 50,
          2: 55,
        },
        2021: {
          1: 70,
          2: 63,
        },
      },
    },
  };

  // 쓰기 예
  customerData[customerID].usages[year][month] = amount;

  // 읽기 예
  function compareUsage(customerID, laterYear, month) {
    const later = customerData[customerID].usage[lateYear][month];
    const earlier = customerData[customerID].usage[lateYear - 1][month];
    return { laterAmount: later, change: later - earlier };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 리팩토링 캡슐화 👍 **/
  class CustomerData {
    constructor(data) {
      this._data = data;
    }

    // 내부 데이터 수정
    setUsage(customerID, year, month, amount) {
      this._data[customerID].usages[year][month];
    }

    // 데이터 복사본을 반환함
    get rawData() {
      // 👉 깊은 복사
      return _.cloneDeep(this.data);
    }

    // 사용량 반환
    usage(customerID, year, month) {
      return this._data[customerID].usages[year][month];
    }
  }

  function getCustomerData() {
    return constoerData;
  }
  function setRawDataOfCustomers(arg) {
    customerData = new CustomerData(arg);
  }
  function getRawDataOfCustomers() {
    return customerData.rawData;
  }
  ```

### 컬렉션 캡슐화하기

- 대부분의 개발자는 객체지향개발을 할시 캡슐화를 사용하는데 이떄 컬렉션을 다룰 때 실수를 저지르곤한다.
  - 컬렉션 변수로의 접근을 캡술화하면서 게터가 컬렉션 자체를 반환하게하면 그 컬렉션을 감싼 클래스가 눈치재지 못하는 상태에서 컬렉션 원소들이 바뀌어벌리 수 있다.
- 위와같은 문제를 방지하기위해 컬렉션을 감싼 클래스에 `add()` 혹은 `remove()`라는 이름이 컬렉션 변경자 메서드를 만들어주자
  - 컬렉션을 소유한 클래스를 통해서만 우너소를 변경하도록 하면 컬렉션 변경 방식도 원하는 대로 수정할 수 있다.
- 컬렉션 게터가 원본 컬렉션을 반환하지 않게 만들어서 클라이언트가 실수로 컬렉션을 바꿀 가능성을 차단하는 방법도 좋다.
  - 컬렉션 게터를 제공하되 내부 컬렉션의 복제본을 반환하게 하는 방법이 가장 흔히 사용하는 방식이다.
    - 성능에 지장을 줄 만큼 컬렉션이 큰 경우는 별로 없으니 성능에 대한 일반 규칙을 따르도록 하자
- 예시

  ```javascript
  /** 수업 목록을 필드로 지니고 있는 Person 클래스 */
  Class Person {
    constructor(name){
      this.name = name;
      this._courses = [];
    }
    get name() {return this.name;}
    get courses() {return this._courses; }
    set courses(aList) {this._courses = aList;}
  }

  Class Course{
    constructor(name, isAdvanced){
      this._name = name;
      this._isAdvanced = isAdcanced;
    }
    get name() {return this._name;}
    get isAdvanced() {return this._isadvanced;}
  }

  // 수업 정보를 얻음
  // 캡슐화는 되어 있지만 세터를 이용해 수업 컬렉션을 통쨰로 설정한다면 누구든 컬레션을 수정할 수 있게 되는 문제가 있음
  let numAdvancedCourses = aPerson.courses.filter(c=> c.isAdvanced).lenght;

  // 마음대로 컬레션 데이터 변경
  const basicCourseNames = readBaiscCourseNames(fileName);
  aPserson.courses = basicCourseNames.map(name => newCourse(name, false));

  // 마음대로 컬레션 데이터 변경2
  for(const name of readBasicCourseName(fileName)){
    aPerson.courses.push(new Course(name, false))
  }

  /**
    * 위와 같은은 방법을 목륵을 갱신하면 Person클래스가 더는 컬렉션을 제어할수 없으니 캡슐화가 꺠지게 된다.
    *  - 필드를 참조하는 과정만 캡슐화 헀을 뿐 필드 내용은 캡슐화하지 않은게 원인임.
  */

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 리팩토링 캡슐화 👍 **/

  // 다른 언어들은 컬렉션을 수정하는 연산들이 기본적으로 복제본을 만들어 처리하짐나 자바스크립트는 배열을 정렬할 떄 원본을 수정한다.
  // 컬렉션 관리를 책임지는 클래스라면 항상 복제몬을 제공하여 사용하자!!

  Class Person {
    constructor(name){
      this.name = name;
      this._courses = [];
    }
    get name() {return this.name;}
    // 💬 복제본 생성
    get courses() {return this._courses.slice(); }
    // 💬 복제본 생성
    set courses(aList) {this._courses = aList.slice();}

    addCourse(aCourse){
      this._courses.push(aCourse);
    }
    removeCourse(aCourse, fnIfAbsent => {throw new RangeError();}){
      const index = this._courses.indexOf(aCourse)
      if(index === -1) fnIfAbsent();
      else this._courses.splice(index, 1);
    }
  }

  // 추가시 컬렉션을 건드는 것이 아닌 함수를 사용
  for(const name of readBasicCourseName(fileName)){
    aPerson.addCourse(new Course(name, false))
  }

  ```

### 기본형을 객체로 바꾸기

- 단순한 출력 이상의 기능이 필요해지는 순간 그데이털르 표현하는 전용 클래스를 정의해주자.
  - 시작은 기본형 데이터를 단순히 감싼것이라 큰 효과를 느낄 수 없지만 특별한 동작이 필요해지면 해당 클래스에 동작을 추가하면 되니 프로그램이 커질수록 점점 편해진다.
    - 대단해 보이지 않아 보여도 코드베이스에 미치는 효과는 놀라울 만큼 크다.
    - 여거 가지 리팩터링 중에서도 가장 유용한 방법으로 손꼽힌다.
- 예시

  ```javascript
  class Order {
    constructor(data) {
      this.priority = data.priority;
      // 나머지 코드 생량..
    }
  }

  // 클라이언트에서 사용
  let gightPriorityCount = order.filter(
    (o) => "hight" === o.priority || "rush" === o.priority
  ).length;

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 리팩토링 캡슐화 👍 **/

  // 우선 순위 속성을 표한하는 값 클래스 생성
  class Priority {
    constructor(value) {
      this._value = value;
    }
    // 💬 게터와 같은 기능을함 취향에 맞춰서 사용하자
    toString() {
      return this._value;
    }
  }

  class Order {
    constructor(priority) {
      this._priority = priority;
      // 나머지 코드 생량..
    }

    get priority() {
      return this._priority;
    }
    set priority(aString) {
      this._priority = new Priority(aString);
    }
  }

  // 클라이언트에서 사용
  let gightPriorityCount = order.filter(
    (o) => "hight" === o.priority.toString() || "rush" === o.priority.toString()
  ).length;

  /** 상위 리펙토링에 추가적인 로직이 있을 경우 추가 예시  **/

  class Priority {
    constructor(value) {
      if (value instanceof Priority) return value;
      if (Priority.legalValues().includes(value)) {
        this._value = value;
      } else {
        throw new Error(`[${value}] is invalid for [Priority]`);
      }
    } // constructor

    get value() {
      return this._value;
    }

    static legalValues() {
      return ["low", "normal", "hight", "rush"];
    }

    get _index() {
      return Priority.legalValues().findIndex((s) => s === this.value);
    }

    higherThan(other) {
      return this._index > other._index;
    }
  }

  // 클라이언트의 입장에서 사용되는 인터페이스를 좀 더 추상화해보자.
  hightPriorityCount = orders.filter((o) =>
    o.priority.higherThan(new Priority("normal"))
  ).length;
  ```

### 임시 변수를 질의 함수로 바꾸기

- 임시변수를 사용하면 값을 계산하는 코드가 반복되는 걸 줄이고 값의 의미를 설명 할 수도 있어서 유용하다.
  - 하지만 여기서 그치지 않고 변수를 아예 함수로 만들어 사용하는 편이 나을 떄가 많다.
    - 추출한 함수에 변수를 따로 전달할 필요가 없어지기 때문이다.
    - 추출한 함수와 원래 함수의 경계가 더욱 분명해져서 의존 관계나 부수 효롸를 찾고 제거 하는데 도움이 된다.
    - 비슷한 계산을 수행하는 다른 훔수에도 사용 할수 있어서 코드 재사용에도 좋다.
- 여러 곳에서 `똑같은 방식으로 계산되는 변수`를 발견할 떄마다 함수로 바꿀 수 있는지 확인하자
- 해당 리팩터링 방법은 클래스 안에서 적용할 떄 효과가 가장 크다.
  - 클래스는 추출할 메서드들에 공유 컨텍스트를 제공하기 때문이다.
- 임시 변수를 질의 함수로 바꾼다고 무조건 좋은것은 아니다.
  - 옛날주소 처럼 스냅숏 용도로 쓰이는 변수에는 사용하면 오히려 좋지 않기 떄문이다.
- 예시

  ```javascript
  class Order {
    constructor(quantity, item) {
      this._quantity = quantity;
      this._item = item;
    }

    get price() {
      let basePrice = this._quantity * this._item.price;
      let discountFactor = 0.98;

      if (basePrice > 1_000) discount -= 0.03;
      return basePrice * discountFactor;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 리팩토링 임시 변수를 질의 함수로 바꾸기 👍 **/
  class Order {
    constructor(quantity, item) {
      this._quantity = quantity;
      this._item = item;
    }

    // 👉 base값을 함수로 추출
    get basePrice() {
      return this._quantity * this._item.price;
    }

    // 👉 discount값을 함수로 추출
    get discountFactor() {
      let dicountFactor = 0.98;
      if (basePrice > 1_000) discount -= 0.03;
      return dicountFactor;
    }

    // 👉 두 값을 조합하는 함수로 변경
    get price() {
      return this.basePrice * this.discountFactor;
    }
  }
  ```

### 클래스 추출하기

- 클래스란 반드시 명확하게 추상화하고 소수의 주어진 역할만 처리해야한다.
  - 이러한 규칙이 실무에서는 몇 가지 연산을 추가하고 데이터도 보강하면서 점점 클래스가 비대해지는 문제가 있다.
    - 역할이 갈수록 많아지고 새끼를 치면서 클래스가 굉장히 복잡해지는데 이렇게 계속 진행하다보면 **전자렌지로 바짝 익힌 음식처럼 딱딱해지고 만다.**
- 클래스는 메서드와 데이터가 너무 많으면 이해하기 쉽지 않으니 적절히 분리하는 것이 좋다.
  - 일부 `데이터와 메서드를 따로 묶을 수 있다면` 어서 분리해야한다는 신호이니 꼭 분리하는 습관을 들이자.
  - 함께 변경되는 일이 만헉나 서로 의존하는 데이터들도 분리해줘야한다.
  - 제거해도 다른 픽드나 메서드 들이 논리적으로 문제가 없다면 분리해주자
- 작은 일부 기능만을 위해 서브클래스를 만들거나 확장해야 할 기능이 무엇이냐에 따라 서브클래스르 만드는 방식도 달라진다면 클래스를 나눠야한다는 신호이다.

- 예시

  ```javascript
  class Person {
    get name() {
      return this._name;
    }
    set name(arg) {
      this._name = age;
    }
    get telephoneNumber() {
      return `(${this.officeAreaCode}) ${this.officeNumber}`;
    }
    get officeAreaCode() {
      return this.officeAreaCode;
    }
    set officeAreaCode(arg) {
      this.officeAreaCode = arg;
    }
    get officeNumber() {
      return this._officeNumber;
    }
    set officeNumber(arg) {
      this.officeNumber = arg;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 리팩토링 클래스 추출 👍 **/

  // 👉 전화번호 관련 동작을 별도로 클래스로 추출
  class TelephoneNumber {
    get areaCode() {
      return this._areaCode;
    }
    set areaCode(arg) {
      this._areaCode = arg;
    }
    get number() {
      return this._number;
    }
    set number(arg) {
      this._number = arg;
    }
    toString() {
      return `(${this.areaCode}) ${this.number}`;
    }
  }

  // 👉 기존 Person에서 사용중이던 함수를 TelephoneNumber 클래스를 받아와 사용
  class Person {
    constructor() {
      // 💬 TelephoneNumber를 인스턴스로 생성
      this.telephoneNumber = new TelephoneNumber();
    }
    get name() {
      return this._name;
    }
    set name(arg) {
      this._name = age;
    }
    // ⭐️ telephoneNumber기준으로 분리한 class로 처리함
    get telephoneNumber() {
      return this.telephoneNumber.toString();
    }
    get officeAreaCode() {
      return this.telephoneNumber.areaCode;
    }
    set officeAreaCode(arg) {
      this.telephoneNumber.areaCode = arg;
    }
    get officeNumber() {
      return this.telephoneNumber.number;
    }
    set officeNumber(arg) {
      this.telephoneNumber.number = arg;
    }
  }
  ```

### 클래스 인라인하기

- `클래스 추출하기`를 거꾸로 돌리는 리팩토링이다. 해당 방법을 반대로 하면 된다.
- 더 이상 제 역할을 하지못하고 그대로 두면 안 되는 클래스를 인라인 해준다.
- 역할을 옮기는 리팩터링을 한 후 특정 클래스에 남은 역할이 거의 없을 때 사용한다
  - 해당 경우에는 해당 클래스를 가장 많이 사용하는 클래스에 흡수 시켜준다.
- ✅ 예시 코드는 `함수 추출하기` 리팩토링 방식을 반대로 돌리면 되기에 생략한다!

### 위임 숨기기

- 캡슐화는 모듈 셀계를 제대로 하는 핵심이다.
- 캡슐화가 잘 되어 있다면 무언가를 변경해야 할 때 함께 고려해야 할 모듈 수가 적어져서 코드를 변경하기 훨씬 쉬워진다.
- 쉽게 설명하자면 client에서 사용하는 정보를 최대한 숨겨서 보여주게 끔하는 것
  - `manager = aPerson.department.manager` => `manager = aPserson.manager` 와 같은 형식으로
- 예시

  ```javascript
  class Person {
    constructor() {
      this._name = name;
    }
    get name() {
      return this._name;
    }
    get department() {
      return this._department;
    }
    set department(arg) {
      this._department = arg;
    }
  }

  class Department {
    get cargeCode() {
      return this._department;
    }
    set cargeCode(arg) {
      this._department = arg;
    }
    get manager() {
      return this._manager;
    }
    set manager(arg) {
      this._manager = arg;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 위임 숨기기 👍 **/

  class Person {
    constructor() {
      this._name = name;
    }
    get name() {
      return this._name;
    }
    get department() {
      return this._department;
    }
    set department(arg) {
      this._department = arg;
    }
    // 👉 manager를 가져오는 부분을 굳이 위임을 하지 않고 해당 class 내부에서 함수를 만들어 처리
    get manager() {
      return this._department.manager;
    }
  }

  const aPerson = new Person();
  // .. 중간 코드 생략
  console.log(aPerson.manager); // 위임을 숨김으로 써 department를 중간에 쓸 필요가 없음
  ```

### 중개자 제거하기

- `위임 숨기기`를 거꾸로 돌리는 리팩토링이다. 해당 방법을 반대로 하면 된다.
  - 위윔 숨기기를 너무 자주 사용하면 단순히 전달만 하는 위임 메서들이 점점 많아지며 성가셔진다.
  - 서버 클래스는 그저 중재자 역할로만 전락하는 문제가 생길 수 있다
- 차리리 클라이언트가 위임 객체를 직접 호출하는 방식으로 다시 되돌리는게 나을 수도 있다.
  - `위임 숨기기`를 반대로하는 것!
- 어느정도까지 숨겨야하고 어느 정도까지 중개자를 사용해야하는지 판단하는 것은 쉽지 않겠지만 상황에 따라 `위임 숨기기` or `중개자 제거하기`를 선택하여 사용하자
- ✅ 예시 코드는 `위임 숨기기` 리팩토링 방식을 반대로 돌리면 되기에 생략한다!

### 알고리즘 교체하기

- 사용 중인 로직의 알고리즘이 더 간단한 방법을 찾거나 훨씬 효율적인 코드를 사용 또는 같은 기능을 하는 라이브러리를 찾을 경우 사용한다.
- 해당 리팩토링의 핵심
  - 거대하고 복잡한 알고리즘의 경우 잘게 나눴는지 확인 -> 유닛별로 테스트하기 위함
  - 알고리즘을 간소화가 잘되었느지
  - TDD를 사용하여 꼭 기존의 값과 정합성을 테스트해야한다.
- 예시

  ```javascript
  const foundPerson = (people) => {
    for (let item of people) {
      if (item === "Don") return "Done";
      if (item === "John") return "John";
      if (item === "Kent") return "Kent";
      return "";
    } //for
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 알고리즘 교체 👍 **/

  const foundPerson = (people) => {
    const dandidates = ["Don", "John", "Kent"];
    return people.find((p) => dandidates.includes(p)) || "";
  };
  ```

<hr/>

## 기능 이동

### 함수 옮기기

- 좋은 소프트웨어 설계의 핵심은 모듈성이다.
  - 프로그램의 어딘가를 수정할 때 해당 기능과 깊이 관련된 작은 일부만 이해 해도 가능하게 해주는 능력이다.
- 모듈성을 높이는 방법
  - 서로 연관된 요소들을 함께 묶고, 요소 사이의 연결 관계를 쉽게 찾고 이해할 수 있도록 해야한다.
    - 이해도가 높아질수록 소프트웨어 요소들을 더 잘 묶는 새로운 방법을 꺠우치게 된다.
- 객체 지향 프로그램의 핵심 모듈화 컨텍스트는 클래스이다. 프로그래밍 언어들은 저마다 모듈화 수단을 제공하며 각각의 수단이 함수가 살아 숨쉬는 컨텍스트를 만들어 준다.
- `함수 옮기기`를 쉽게 이해하기
  - 자신이 속한 모듈A의 요소들보다 모듈B의 요소들을 더 많이 참조한다면 모듈B로 옮겨주는것이 마땅하다.
  - 함수를 옮길지 말지를 정하기 어렵다면 대상 함수의 현재 컨텍스트와 후보 컨텍스트를 둘러보면 도움이 된다.
    - 대상 함수를 호출하는 함수들은 무엇인지
    - 대상 함수가 호출하는 함수들은 또 무엇이 있는지
    - 대상 함수가 사용하는 데이터는 무엇이 있는지
- ⭐️ javascript기준 중첩함수는 되도록 만드는것을 피하자 --> 모듈화를 사용하자 `import or exprot`
- 예시

  ```javascript
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 함수 옮기기 👍 **/

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
  ```

### 필드 옮기기

- 프로그램의 진짜 힘은 데이터 구조에서 나온다.
  - 주어진 문제에 적합한 데이터 구조를 활용하면 동작 코드는 자연스럽게 단순하고 직관적이게 짜여진다.
  - 데이터 구조 선택을 잘못하여 아귀가 맞지 않게 짜여진다면 데이터를 해당 데이터를 다루기위해 불필요한 코드가 더럽게 추가된다.
- 데이터의 구조가 적절치 않음을 깨닫게 된다면 **곧바로** 수정해주자
  - 귀찮다고 냅두면 훗날 작성하게 될 코드를 더욱 복잡하게 만들어버린다.
- 언제 옮기는게 좋은가?
  - 함수에 어떤 레코드 또는 클래스를 넘길때 마다 또 다른 레코드의 필드도 함께 넘기고 있다면 데이터 위치를 옮기야 할 타이밍이다.
    - 함수에 항상 함꼐 던네지는 데티어 조각들은 상호 관계가 명확하게 드러나도록 한개의 레코드에 답는 것이 가장 좋다.
  - 한 레코드를 변경할 때 다른 레코드의 필드까지 변경해야만 한다면 필드의 위치가 잘못 선정되었다는 신호다.

### 문장을 함수로 옮기기

- 반대의 리팩토링 `문장을 호출한 곳으로 옮기기`
- 중복 제거는 코드를 건강하게 관리하는 가장 효과적인 방법 중 하나이다.
  - 중복적으로 사용되느 코드를 하나로 뭉쳐주자
    - 수정할 일이 생겼을 때 단 한곳만 수정하면 되는 유지보수의 강점을 가져갈 수 있다.
  - 혹시나 뭉쳤던 코드를 여러 변형들로 나눠야 하는 순간이 오면 `문장 호출한 곳으로 옮기기`로 쉽게 해결 가능하다.
- 해당 리팰토링을 사용하려면 옮기려는 문장들이 피호출 함수의 일부라는 확신이 있어야햔다.
  - 피호출 함수와 한몸은 아니지만 여전히 함께 호출돼야 하는 경우라면 단순하게 문장들과 피호출 함수를 통쨰로 또 하나의 함수로 추출해주자.
- 예시

  ```javascript
  result.push(`<p>제목: ${person.photo.title}</p>`);
  result.concat(photoData(person.photo));

  function photoData(aPhoto) {
    return [
      `<p>위치: ${aPhoto.location}</p>`,
      `<p>날짜: ${aPhoto.date.toDateString()}</p>`,
      `<p>태그: ${aPhoto.tag}</p>`,
    ];
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 문장을 함수로 옮기기 👍 **/
  result.concat(photoData(person.photo));

  function photoData(aPhoto) {
    return [
      // 👉 불필요하게 외부에서 push하던 기능을 내부 함수로 옮겨 줌
      `<p>제목: ${aPhoto.title}</p>`,
      `<p>위치: ${aPhoto.location}</p>`,
      `<p>날짜: ${aPhoto.date.toDateString()}</p>`,
      `<p>태그: ${aPhoto.tag}</p>`,
    ];
  }
  ```

### 문장을 호출한 곳으로 옮기기

- 함수란 프로그래머가 쌓아올린 추상화의 기본 빌딩 블록이다.
  - 하지만 추상화는 경계를 항상 올바르게 긋는것이 쉼지 않다.
    - 코드베이스의 기능 범위가 달라지면 추상화의 경계도 변경되기 떄문임
    - 초기에는 응집도가 높고 한 가지 일만 수행하던 함수도 어느새 둘 이상의 다른 일을 수행 하게게 바뀔 수 도 있다.
- 여러 곳에서 사용하던 기능이 일부 호출자에게는 다르게 동작 하도록 바뀌어야한다면 `문장을 호출한 곳으로 옮기기`가 필요한 시점이다.
  - 함수가 둘 이상의 다른 일을 하는데, 그 중 하나만 변경이 필요할 때
- 너무 당연한 코드기에 예시는 스킵한다. 로직이 바뀜으로 구조를 변경하는 개념이기 떄문임.

### 인라인 코드를 함수 호출로 바꾸기

- 함수는 여러 동장을 하나로 묶어주며 함수명이 코드의 동장 방식보다는 목적을 말해주기 떄문에 함수를 활용하면 코드를 이해하기 쉬워진다.
- 함수는 중복을 없애는 데도 효과적이다.
  - 똑같은 코드를 반복하는 대신 함수를 호출하면 되기 떄문임.
- 수정 및 유지보수에도 강점이 된다 - 함수만 수정하면 되니깐!
- 라이브러리가 제공하는 함수로 대체할 수 있는 함수가 있다면 꼭 활용 해주자.
- 예시

  ```javascript
  let appliesToMass = false;
  for (const item of arr) {
    if (item === "MA") appliesToMass = true;
  } // for

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 인라인 코드를 함수 호출로 바꾸기 👍 **/

  appliesToMass = arr.includes("MA");
  ```

### 문장 슬라이드하기

- 관련된 코드들이 가까이 모여 있다면 코드를 이해할때 훨씬 더 이해하기가 쉬워진다.
- 사람마다 스타일이 다를 수 있다 어떤 사람은 함수 첫 시작할 때 변수를 한번에 모아 두는사람이 있을 수 도있으나 필요한 흐름에 변수를 선언
  하고 사용하면 훨씬 코드를 이해 및 적용하는데 도움이 될 수 있다.
- 문장을 슬라이드할 때 두가지를 확인 해야한다.
  - **무엇**을 슬라이드 할것인가, 슬라이드가 가능한 **여부**이다.
- 예시

  - 변수 슬라이드

    ```javascript
    const pricingPlan = retrievePricingPlan();
    const order = retrieveOrder();
    let charge;
    const chargePerUnit = pricingPlan.unit;

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    /** 문장 슬라이드하기 - 변수 👍 **/

    // 👉 관련있는 변수끼리 가까이!
    const pricingPlan = retrievePricingPlan();
    const chargePerUnit = pricingPlan.unit;

    // 👉 부수효과가 없는 코드는 밑으로 혹은 제거
    const order = retrieveOrder();
    let charge;
    ```

  - 조건문 내부 슬라이드

    ```javascript
    function test(){
      if(item === 0){
        result = "Hi";
        goHome();
      } eles {
        result = "Bye";
        goHome();
        return result;
      } // if - else
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    /** 문장 슬라이드하기 - 조건문 👍 **/

    function test(){
      if(item === 0){
        result = "Hi";
      } eles {
        result = "Bye";
      } // if - else
      // 👉 공통을 사용되는 로직은 조건문 밖으로!
      goHome();
      return result;
    }
    ```

### 반복문 쪼개기

- 종종 반복문 하나에서 두가지 이상의 일을 수행하는 모습을 보거나 그렇게 일부러 구현 했던적이 있을 것이다.
  - 두개의 일을 한번에 처리하는게 좀 더 효율 적이라 생각 했기 떄문이었을 것이다.
- 하지만 각각의 반복문을 분리해 두면 수정할 동작 하나만 이해하면 된다는 장점이 생긴다.
  - 구조를 이해하는게 더욱 시워지고 수정 또한 한개의 계산만 파악해도 된다.
  - 사용 또한 훨씬 간결해진다.
- 반복문 쪼개기는 서로 다른 일들이 한 함수에서 이뤄지고 있다는 신호일 수 있고, 따라서 `반복문 쪼개기`와 `함수 추출하기`는 연이어 수행하는 일이 잦다.
- ⭐️ 중요 포인트

  - 리팩터링과 최적화는 구분하자
    - 리팩터링을 위해 같은 배열을 2번이나 반복해야하는 것 같아서 성능상 무리가 있는 비효율적 코들 보일 수 있으나 리팩터링 이후 안정화가  
      된다면 해당 부분에서 성능상 이슈(병목현상)이 있을 경우 수정해주는 방향으로 가도 좋은 방법이다.
    - 엄청나게 긴 배열이 아닌 이상 사실상 반복문을 쪼갠다고해도 성능상 이슈는 생기지 않는다.

- 예시

  ```javascript
  function fn() {
    let youngest = people[0] ? people[0].age : Infinity;
    let totalSalary = 0;

    // 반복문 내부에서 최소 나이와 총 급여를 구하는 두가지를 구행 함👎
    for (const p of people) {
      if (p.age < youngest) youngest = p.age;
      totalSalary += p.salary;
    } // for

    return `최연소: ${youngest}, 총급여: ${totalSalary}`;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 반복문 쪼개기 👍 **/
  function fn() {
    return `최연소: ${youngestAge()}, 총급여: ${totalSalary()}`;

    /** 👉 반복문을 쪼갠 후 함수화 하여 내장 함수로 코드를 간결화 시킴 */

    function totalSalary() {
      return people.reduce((total, p) => total + p.salary, 0);
    }

    function youngestAge() {
      return Math.min(...people.map((p) => p.age));
    }
  }
  ```

### 반복문을 파이프라인으로 바꾸기

- 언어는 계속해서 발전하여 더 나은 구조로 제공하는 쪽으로 발전했다.
- 컬렉션 파이프라인을 이용하면 처리 과정을 일련의 연산을 표현할 수 있다.
  - javascript에서는 `map, filter, find, include`등등 ..
  - java에서는 `stream()`
- 위와 같은 방식은 체이닝 방식으로 코드가 더 간결해지고 직관적이라 이해하기가 쉬워진다.
- 예시

  ```javascript
  function acquireData(input) {
    const lines = input.split("\n");
    let firstLine = true;
    const result = [];

    for (const line of lines) {
      if (firstLine) {
        firstLine = false;
        continue;
      }
      if (line.trim() === "") continue;

      const record = line.split(",");

      if (record[1].trim() === "India") {
        result.push({ city: record[0].trim(), phone: record[2].trim });
      }
    }
    return result;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 반복문을 파이프라인으로 바꾸기 👍 **/

  function acquireData(input) {
    const lines = input.split("\n");

    const result = lines
      .slice(1)
      .filter((line) => line.trim() !== "")
      .map((line) => line.split(","))
      .filter((fields) => fields[1].trim() === "India")
      .map((fields) => ({ city: fields[0].trim(), phone: fields[2].trim }));

    return result;
  }
  ```

### 죽은 코드 제거하기

- 죽은 코드 = 쓰지 않는 코드...
- 쓰이지 않는 코드가 있다고해서 시스템이 느려지는것도 아니도 주석 혹은 호출만 안하면 시스템 자체에도 영향이 가지 않는다.
- 단 ... 그건 코드 히스토리를 아는사람만 ..이다..
  - 운 나쁜 프로그래머는 이 코드의 동작을 이해하기 위해, 그리고 코드를 수정 했는데도 원하는 결과가 나오지 않는 이유를 파악하기 위해 시간 낭비를한다.
    - 실제로 이런 경험이 있다 ... 최신 소스가 뭔지 모르는 상황에서 어떤게 진짜인지 몰라서 다 까봐서 확인했다 ..
    - 굉장히 비슷한 코드인데 파일명만 뒤에 숫자만 다른 코드 .. 뭘 써야하지 .. 하는 경험 ..
    - 포함 코드 찾기 해서 찾은 파일 수정했는데 왜 안바뀌지 했는데 .. 숫자만 다른 비슷한 로직파일 ..
- 사용하지 않는 코드가 보이면 바로 바로 지우자 ..`형상관리 도구`라는 강력한 기능이 있으니!!!

<hr/>

## 데이터 조직화

- 하나의 값이 여러 목적으로 사용된다면 혼란과 버그를 낳는다.
  - `변수 쪼개기`를 적용해 용도별로 분리하자.
  - 변수 이름을 잘 지어주자
  - `파생 변수를 질의 함수로 바꾸기`를 활용하여 변수 자체를 완전히 없애는게 가장 좋은 해법일 수도있다.

### 변수 쪼개기

- 변수는 다양한 용도로 쓰이며 변의 값을 여러 번 대입할 수 밖에 없는 경우가 있다.
- 변수는 긴 코드의 결과를 저장했다가 나중에 쉽게 참조하려는 목적으로 흔히 쓰인다.
- 여기서 중요한 포인트는 `변수에는 값을 단 한번만 대입해야 한다`이다.
  - 대입이 두번 이상 이뤄진다면 여러가지 역할을 수행한다는 신호이다.
  - 역할이 둘 이상인 변수가 있다면 쪼개야 한다. **예외란 없다!!**
- 변수를 쪼갤때 가능하다면 `불변타입`으로 선언해 주자
- 예시

  - 일반적인 변수 쪼개기

    ```javascript
    let tmp = 2 * (height * width);
    console.log(tmp);
    tmp = height * width;
    console.log(tmp);

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    /** 변수 쪼개기 👍 **/

    //👉 불변 선언 및 파악하기 쉬운 변수명 사용
    const perimeter = 2 * (height * width);
    console.log(perimeter);
    const area = height * width;
    console.log(area);
    ```

  - 입력 매개변수 값을 수정할 경우

    ```javascript
    function discount(inputValue, quantity) {
      if (inputValue > 50) inputValue = inputValue - 2;
      if (quantity > 50) inputValue = inputValue - 2;
      return inputValue;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    /** 변수 쪼개기 - 매개변수 값 수정 👍 **/

    // 👉 result라는 변수를 생성 직관적이게 변경
    function discount(inputValue, quantity) {
      let result = inputValue;
      if (inputValue > 50) result = result - 2;
      if (quantity > 50) result = result - 2;
      return result;
    }
    ```

### 필드 이름 바꾸기

- 이름이란 정말 중요하다.
- 레코드 구조체의 필드 이름들은 특히 더 중요하다. 데이터구조는 프로그램을 이해하는데 더 큰 역할을 한다.
- 필드나 변수든 책에서 강조한느 것은 항상 직관적이고 이해하기 쉬운 이름을 짓는 것이다.
- 예시 코드는 특별할게 없으니 제외힌다.

####

### 파생 변수를 질의 함수로 바꾸기

- 가변 데이터는 소프트웨어에 문제를 일이키는 가장 큰 골칫거리에 속한다.
  - 가변 데이터는 서로 다른 두 코드를 이상한 방식으로 결합하기도 하는데, 한 쪽 코드에서 수정한 값이 연쇄 효과를 일으켜  
    다른 쪽 코드에 원인을 찾기 어려운 문제를 만들기도 한다.
- 그렇다고 가변 데이터를 완전히 배제하기란 현실적으로 불가능할떄가 많지만 가변 데이터의 `유효 범위를 가능한 좁혀`야 한다.
  - 가장 효과적인 방법으로는 값을 쉽게 계산해낼 수 있는 변수들을 모두 `제거`할 수 있다.
    - 계산 과정을 보여주는 코드자체가 데이터의 의미를 더 분명하게 드러내는 경우도 자주 있으며 변경된 값을 깜빡하고 결과 변수에 반영하지 않는 실수를 막아준다.
  - 단 예외가 있는데 피연산자 데이터가 불변이라면 계산 결과도 일정하므로 역시 불변으로 만들어 줄 수 있다.
- 예시

  ```javascript
  get discountedTotal(){ return this._discountedTotal; }
  set discount(aNumber) {
    const old = this._discount;
    this._discount = aNumber;
    this.discountedTotal += old - aNumber;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 파생 변수를 질의 함수로 바꾸기 👍 **/

  // 👉 리팩터링 전 불필요하게 discount()에서 _discountedTotal를 만들던 부분을 한번에 처리하게 끔 처리
  get discountedTotal(){ return this._baseTotal - this._discount; }
  // 👉 se해주는 부분은 필요한 기능만 하게 끔 처리
  set discount(aNumber) {this.discount = aNumber}
  ```

### 참조를 값으로 바꾸기

- 객체를 다른 객체에 중첩하면 내부 개겣를 참조 혹은 값 으로 취급할 수 있다.
  - 참조냐 값이냐의 차이는 내부 객체의 속성을 갱신하는 방식에서 가장 극명하게 드러난다.
- 유형별 특징
  - 참조로 다루는 경우에는 내부 객체는 그대로 둔 채 그 객체의 속성만 갱신한다.
  - 값으로 다루는 경우에는 새로운 속성을 담은 객체로 기존 내부 객체를 통째로 대체한다.
- 필드 값을 내부 객체의 클래스를 수정하여 값 객체로 만들 수 있다.
  - 값객체는 대체로 자유롭게 활용하기 좋은데 가장 큰 이유는 `불변`이기 떄문이다.
  - 불변 데이터구조는 값이 나 몰래 바뀌어서 내부에 영향을 줄까 염려할 필요가 없어서 좋다.
  - 값을 복제해 이곳 저곳에서 사용하더라도 `서로간의 참조를 관리하지 않아도 된다`는 장점이 있다.
    - 분산 시스템과 동시성 시스템에서 특히 유용하다.
- 예시

  ```javascript
  class Person {
    constructor() {
      this._telephoneNumber = new TelephoneNumber();
    }

    get officeAreaCode() {
      return this._telephoneNumber.areaCode;
    }

    set officeAreaCode(arg) {
      this._telephoneNumber.areaCode = arg;
    }

    get officeNumber() {
      return this._telephoneNumber.number;
    }

    set officeNumber(arg) {
      this._telephoneNumber.number = arg;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 참조를 값으로 바꾸기 👍 **/

  // 💬 변경 후 해당 인스턴스객체는 각각의 값이 TelephoneNumber객체의 값을 사용하게 끔 처리 됨 [ 참조를 값으로 변경 ]
  class Person {
    // 👉 생성자에서 값을 받아 객체를 생성하게 끔 변경
    constructor(areaCode, number) {
      this._telephoneNumber = new TelephoneNumber(areaCode, number);
    }

    get officeAreaCode() {
      return this._telephoneNumber.areaCode;
    }
    // 👉 set값 자체를 불변으로 만들어줌 - 객체를 생성 하기 때문임
    set officeAreaCode(arg) {
      this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
    }

    get officeNumber() {
      return this._telephoneNumber.number;
    }

    // 👉 set값 자체를 불변으로 만들어줌 - 객체를 생성 하기 때문임
    set officeNumber(arg) {
      this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
    }
  }
  ```

### 값을 참조로 바꾸기

- `참조를 값으로 바꾸기`리팩터링과 반대 개념의 방식이다.
- 하나의 데이터 구조 안에 논리적으로 똑같은 제3의 데이터 구조를 참조하는 레코드가 여러개 있을 떄가 있다.
  - ex) 주문목록에서 고객이 요청한 주문한 주문이 여래개 섞여 있는 경우
  - 이러한 경우 고객을 `값으로`도 혹은 `참조로`도 다룰 수 있다.
  - 값일 경우 : 고객 데이터가 각 주문에 복사된다.
    - 데이터를 여러 벌 복사하는 방식이라 조금 꺼림칙 할지 모르곘지만 별달리 문제가 되는 경우는 많지 않아 흔히 사용하는 방식이다.
      - 복사본이 많아져 가끔 메모리가 부족할 수도 있지만, 다른 성능이슈와 마찬가지로 아주 드문 일이다.
    - 데이터를 갱신할 경우 모든 복제본을 찾아서 빠짐없이 갱신하야 하며, 하나라도 놓치면 데이터의 일관성이 깨져버린다.
  - 참조일 경우 : 여러 주문이 단 하나의 데이터 구조를 참조하게 된다.
    - 데이터가 하나면 갱신된 내용이 한번에 수정 되기는 이점이 있다.
    - 엔티티 하나당 객체도 단 하나만 존재하게 되는데. 그러면 보통 이런 객체들을 한데 모아 놓고 클라이언들의 접근을 관리해주는 일종의 저장소가 필요해진다.
      - 각 엔티티를 표현하는 객체를 한 번만 만들고 각 객체가 필요한 모든 곳에서는 모두 이 저장소로부터 얻어 쓰는 방식 [ Reect Recoil 을 생각하자!]
- 예시

  ```javascript
  let customer = new Customer();

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 값을 참조로 바꾸기 👍 **/

  // 👉 customerRepository라는 저장소를 만들어 customerData.id를 통해 중앙관리 데이터에서 값을 받아옴
  let customer = customerRepository.get(customerData.id);
  ```

### 매직 리터럴 바꾸기

- 매직 리터런이란 소스 코드에 등장하는 일반적인 리터럴 값을 말한다.
  - 코드를 읽는 사람이 이 값의 의미를 모르다면 숫자 자체로 의미를 명확히 알려주지 못하므로 매직 리터럴이라 말할 수 있다.
  - 매직이러털은 대체로 숫자가 많지만 다른 타입의 리터럴도 특별한 의미를 지닐 수 있다.
    - "1월 1일"은 새로운 해
    - "M"은 남성을
    - "서울"은 본사를 뜻할 수 있다.
- 이러한 해당 값이 쓰이는 모든 곳을 적절한 이름의 상수로 바꿔주는 방법이 가장 좋은 방법이다.
- 단 상수를 너무 과용하는 모습을 보이지는 말자

  - 예를 들면 `const ONE = 1`와 같이 누가봐도 1인것을 상수로 만들 필요는 없다.
  - 또한 리터럴이 함수 하나에서만 쓰이고 그 함수가 맥락정보를 충분히 제공하여 헷갈릴 일이 없다면 상수로 바꿔서 얻는 이득은 크지 않다.

## 조건부 로직 간소화

- 조건부 로직은 프로그램의 힘을 강화하는데 크게 기여하지만 안타깝게도 프로그램을 복잡하게 마드는 주요 원흉이기도 하다.
- 조건부 로직을 이해하기 쉽게 바꾸는 리팩터링을 꼭 사용해주자.

### 조건문 분해하기

- 다양한 조건, 그에 따라 동작도 다양한 코드를 작성하면 순식간에 꽤 긴 함수가 탄생한다.
  - 긴함수는 그 자체로 읽기 어렵지만, 조건문 내부에 있다면 그 코드를 이해하는데 어려움은 배가 된다.
  - 조건을 검사하고 그 결과에 따른 동작을 표현한 코드는 무슨 일이 일어나는지 이야기해주지만 **"왜?"** 일어났는지 제대로 말해주지 않을 떄가 많은 것이 문제이다.
- 위와 문제의 코드는 코드를 부위 별로 분해한 다음 해체된 코드 덩어리들을 각 덩어리의 `의도를 살린 이름의 함수 호출`로 변경해 주자
  - 이러한 식으로 변경해주면 전체적인 의도가 더 확실히 드러난다.
  - 조건식과 각 조건절에 이 작업을 해주는 것을 추천한다! 포인트는 조건식에도 해주는 것이다!
    - 단 직관적인 조건식에는 불필요하니 생략해주자
  - 이러한 방법은 조건이 무엇인지 `강조`하고 그래서 무엇을 분기했는지가 `명확해`진다.
- 예시

  ```javascript
  // 여름철이면 할인율이 다라지는 서비스 요금 계산 조건부 로직
  if (!aDate.isBfore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) {
    charge = quantity * plan.summerRate;
  } else {
    chage = quantuty * plan.regularRate + plan.regularServiceCharge;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 조건문을 분해하기 👍 **/

  // 👉 각각의 조건식, 조건 이행문을 이해하기 쉬움 함수명으로 함수화한 후 삼항 연산자 사용!
  charge = summer() ? summerCharge() : regularCharge();

  const summer = () => {
    return !aDate.isBfore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
  };
  const summerCharge = () => quantity * plan.summerRate;
  const regularCharge = () => {
    return quantuty * plan.regularRate + plan.regularServiceCharge;
  };
  ```

### 조건식 통합하기

- 비교하는 조건식은 다르지만 그 결과로 수행하는 조건 이행문은 똑같은 로직이 있다.
  - 어차피 같은 일을 할거면 조건 검사를 하나로 통합하여 사용하는 것이 좋다.
  - `and연산자` or `or`연산자를 사용함녀 여러 개의 비교 로직을 하나로 합칠 수 있다.
- 조건부 코드를 통합하는게 중요한 이유는
  - 여러 조각으로 나뉜 조건들을 하나로 통합함으롱써 내가 하려는 일이 더 명확해진다.
  - 해당 작업을 하면 `함수 추출하기`까지 이러질 가능성이 높기 떄문이다.
    - 복잡한 조건식을 함수로 추출하면 코드의 으디고 훨씬 분명하게 드러나는 경우가 많다.
    - 함수 추출하기는 '무엇'을 하는지를 기술하던 코드를 **'왜'**하는지를 말해주는 코드로 바꿔주는 효과적인 도구임을 꼭 기억해주자.
- 단 유의 사항은 진짜로 `독립된 검사들이라고 판단되는 조건식은 통합하면 큰일나`니 꼭 확인 하고 통합해주자!
- 예시

  - or을 사용할 경우

    ```javascript
    const disabilityAmount = (anEmpolyee) => {
      if (anEmpolyee.seniority < 2) return 0;
      if (anEmpolyee.monthsDisabled > 12) return 0;
      if (anEmpolyee.isPartTime) return 0;
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    /** 조건식 통합하기 - OR 사용 👍 **/

    const disabilityAmount = (anEmpolyee) => {
      // 👉 내부 함수로 변경 -- 해당 조건이 true 일 경우 0 반환!!!
      if (isNotEligibleForDisabilty()) return 0;

      // 👉 조건 로직을 한곳으로 몰아 넣음
      function isNotEligibleForDisabilty() {
        return (
          anEmpolyee.seniority < 2 ||
          anEmpolyee.monthsDisabled > 12 ||
          anEmpolyee.isPartTime
        );
      }
    };
    ```

  - And을 사용할 경우

    ```javascript
    if (anEmployee.onVacation) {
      if (anEmployee.seniority > 10) {
        return 1;
      }
      return 0.5;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    /** 조건식 통합하기 - AND 사용 👍 **/

    // 👉 피팩터링 전 모두가 True일 경우 1을 반환하므로 &&로 붙여주면 된다.
    if (anEmployee.onVacation && anEmployee.seniority > 10) return 1;
    return 0.5;
    ```

### 중첩 조건문을 보호 구문으로 바꾸기

- 조건문은 주로 두가지 형태로 쓰인다.
  - 참인 경로와 거짓인 경로 무도 정상 동작으로 이어지는 형태
    - 이러한 경우 `if 와 else절`을 사용한다.
    - 해당 구조를 사용할 때 if절과 else 절에 똑같은 무게를 두어, 코드를 읽는 이에게 양갈래가 똑같이 중요하다는 뜻을 전해주자.
  - 한쪽만 정상인 형태
    - 이러한 경우 비정상 조건을 `if`에서 검사한 다음 조건이 참이면 함수에서 빠져 나온다.
    - 해당 검사 형태를 흔히 보호 구문이라고 한다.
    - 중첩 조건문을 보호 구문으로 바꾸기의 핵심은 의도를 부각하는데 있다.
    - 보호 구분은 조건이 `ture`일 경우 이건 이 함수의 핵심이 아니다 무언가 조치를 취한 후 함수에서 빠져나온다 의 느낌이이 강하다.
- 두 형태는 의도하는 바가 서로 다르므로 `그 의도가 코드에 드러나야한다.`
- 반환점이 하나여야 한다는 규칙은 정말 좋지 못한 생각이다.
  - 코드에서는 명확함이 핵심이다. 반환점이 하나일 때 함수의 로직이 더 명백하다면 상관이 없겠지만 그렇지 않다면 이러한 생각은 버리자
- 해당 리팩터링을 하다보면 중첩된 조건들에 가려서 잘 보이지 않는 경우 해결 방법

  - 코드의 의도를 파악한 후 조건이 실행 되는 조건 부터 본다.
  - 단계를 최대한 작계 나눠가면서 보호구문을 설정해 간다 한번에 하려하면 어렵지만 조금 적용해 가자
  - **"가변 변수를 제거하면 자다가도 떡이 생긴다는 사실을 항상 기억하자"** 라고 써 있다 ㅋㅋ ㅋㅋㅋ

- 예시

  ```javascript
  function getPayAmount() {
    let result;
    if (isDead) {
      result = deadAmount();
    } else {
      if (isSeparated) {
        result = separatedAmount();
      } else {
        if (isRetired) {
          result = retiredAmount();
        } else {
          result = normalPayAmount();
        } // if - else
      } // if - else
    } // if - else
    return result;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 중첩 조건문을 보호 구분으로 바꾸기 👍 **/

  // 👉 불필요한 중첩 if문을 보호 구문을 사용해 바로 바로 반환 시켜서 해결
  function getPayAmount() {
    if (isDead) return deadAmount();
    if (isSeparated) return separatedAmount();
    if (isRetired) return retiredAmount();
    return normalPayAmount();
  }
  ```

  - 추가 예시 코드 링크
    - [예시](https://github.com/edel1212/refactoring/blob/main/refactoringSkills/functionMove/ex07.js)
    - [예시2](https://github.com/edel1212/refactoring/blob/main/refactoringSkills/functionMove/ex08.js)

### 조건부 로직을 다형성으로 바꾸기

- 복잡한 조건부 로직은 프로그래밍에서 해석하기 가장 난해한 대상에 속한다.
- 이러한 복잡한 로직은 종종 더 높은 수준의 개념을 도입해 조건들을 분리해낼 수 있다.
  - 조건문을 구조를 그대로 둔 채 해결될 떄도 있지만 `클래스와 다형성`을 이용하면 더 확실해가 분리할 수도 있다.
  - 타입을 여러개로 만들고 각 타입이 조건부 로직을 자신만의 방시긍로 처리하도록 구성하는 방법이 있다.
    - 책, 음악,음식은 다르게 각각의 타입이 다르니 각 타입을 기준을 분기하는 Switch문이 포함된 함수가 여러 개 보인다면  
      **case별로 클래스를 하나씩** 만들어 `공통 switch 부분을 없앨 수` 있다.
  - 기본 동작을 위한 Case문과 그 `변형 동작으로 구성된 로직일 경우 해당 로직을 슈퍼클래스로 넣어서` 변형 동작에 신경쓰지 않고  
    **기본에 집중하게한 후** 변형 동작을 뜻하는 case들의 각각의 서브클래스를 만드는 방법이 있다.
- 단 남용은 금지이다. 모든 조건부 로직을 다형성으로 대체하는건 오히려 안좋은 방식 이므로 앞서 말한 경우에는 해당 방법을 사용하자 **남용 금지!**
- 예시
  - [링크]("https://github.com/edel1212/refactoring/blob/main/refactoringSkills/conditional/ex01.js")

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

<hr/>

## 리팩토링이 필요한 순간

### 기이한 이름

- 코드는 단순하고 명료하게 작성해야한다.
- 코드를 명료하게 표한하는데 가장 중요한 요소는 바로 `이름`이다.
- 이름만 잘 지어도 문백을 파악하느라 헤매는 시간을 크게 절약 할 수 있다.

### 중복 코드

- 똑같은 코드 구조가 여러 곳에서 번복 된다면 하나로 통합혀야 더 나은 프로그램을 만들 수 있다
  - 같은 코드가 3번 이상 반복 되면 그 코드는 하나의 메서드로 만들어 사용해주자
- 한 클래스에 딸린 두 메서드가 똑같은 표현식을 사용하는 경우 `함수 추출하기`를 써서 양쪽 모두 추출된 메서드를 호출하게 바꾸자
- 코드가 비슷하긴 한데 완전히 똑같지 않다면 `문장 슬라이드하기`로 비슷한 부분을 한곳에 모아 함수 추출하기를 더 쉽게 적용할 수 있는지 확인해 보자

### 긴 함수

- 오랜 기간 잘 활용돠는 프로그램들의 코드 들은 하나 같이 `짧은 함수`로 구성되어 있다.
  - 내부 로직에는 연산하는 부분이 하나도 없어 보인다.
    - 코드가 끝 없이 위임 하는 방시긍로 작성되어 있기 떄문이다.
- `간접 호출의 효과` : 코드를 이해, 공유, 선택하기 쉬워진다는 장접은 장점은 함수를 짧게 구성할 떄 나오는 것이다.
- 여기서도 짧은 함수로 구성된 코드를 이해하기 쉽게 만드는 가장 쉽고 확실한 방법은 `이름을 잘 지어두기`이다.
  - 함수 이름은 동장 방식이 아닌 `의도`가 잘들어나게 지어야한다.
- 원래 코드보다 길어지도라도 함수 단위로 `쪼개`어서 구현 후 의도에 맞게 이름을 지어 주자.
- 함수를 짧게 만드는 작업의 99%는 `함수 추출하기`이다.
  - 함수 본문에서 따로 묶어서 뺴낼 수 있는 코드 덩어리를 찾아 `새로운 함수를 만드`는 것이다.
- 리팩토링 대상의 함수가 매개변수와 임시 변수를 많이 사용한다면 함수를 추출하는데 어려울 수 있는데 이럴 땐 `매개변수를 객체로 만들기` 와 `그 객체 통쨰로 넘기기`를 사용하자
- 추출할 코드 덩어리 찾는 방법은?
  - 주석을 위주로 찾자 `주석이 달려있는 코드는` 코드만으로 이해하기 어렵기에 달려있을 확률이 높기 떄문이다.
    - 주석을 기준으로 만들어진 메서드의 경우 메서드 명은 주석명을 기반으로 작성해주자.
    - 코드가 단 한줄일 경우에도 설명할 필요가 있다면 함수로 추출하는 게 좋다.
  - 조건문이나 반복문의 경우에도 사용할 수 있다.
    - switch문
      - 거대한 switch의 경우 case문 마다 `함수를 추출`을 적용해서 각 case의 본문을 함수 호출문 하나로 변경 한다.
      - 같은 조건을 기준으로 나뉘는 switch문이 여러 개라면 `조건부 로직을 다형성`으로 바꿔주자.
    - 반복문
      - 반복문 내부의 로직이 길어 진다면 독립된 함수로 추출하여 생성한다.

### 긴 매개변수 목록

- 매개변수 목록이 길어지면 그 자체로 이해하가 어려우므로 리팰토링 해줄 필요가 있다.
- 다른 매개 변수에서 값을 얻어 와야하는 매개 변수가 있는데 이런 경우 `매개변수를 질의 함수 바꾸기`로 제거 할 수 있다.
- 클래스를 활용 하는 것도 매개변수 목록을 줄이는데 효적인 수단이다.
  - 여러 개의 함수가 특정 매개변수들의 값을 공통적으로 사용할 경우 `여러 함수를 클래스로 묶어` 사용해 주자.

### 전역 데이터

- 전역 데이터는 악취 중에 `가장 독한` 축에 속한다.
  - 코드 내 어디서든 건들일 수 있고 값을 누가 바꿨는지 찾아 낼 방법이 없기 떄문이다.
  - 버그가 끊임 없이 발생할 확률이 높은데 그 원인을 찾아내기가 굉장히 어렵다.
- 대표적인 리퍅토링 방법은 `변수 캡슐화하기`이다.

### 가변 데이터

- 코드의 다른 곳에서는 다른 값을 기대한다는 사실을 인식 하지 못한 채 수정하여 프로그램 오작동 하며 이러한 문제가 아주 드문 조건에서 발생한다면 원인을 찾아내는 것이 매우 어렵다.
- 데이터를 변경하려면 반드시 원래 데이터는 그대로 둔채 변경하려는 값에 해당하는 `복사본을 만들어서 반환` 하는 것을 습관화 하자
- 무분별한 데이터 수정에 따른 위험을 줄이는 방법
  - `변수 캡슐화하기`를 적용허여 정해 놓은 함수를 거쳐야만 값을 수정할 수 있도록 하면 값이 어떻게 수정 되는지 감시하거나 코드를 개선하기 쉬움. (브레이크포인트를 활용)
  - 하나의 변수에 용도가 다른 값들을 저장하느라 값을 갱신하는 경우 `변수 쪼개기`를 이용하여 용도별로 독딜 변수에 저장하게 하여 값 갱신이 문제를 일으킬 여지를 없앤다.
  - 갱신 로직은 다른 코드와 떨어뜨려 놓는 것이 좋기에 `문장 슬라이드하기` 와 `함수 추출하기`를 이용해서 코드를 분리해주는 것이 좋다.
  - `파생 변수를 질의 함수로 바꾸기`로 변경해서 코드에 적용하기
  - `여러 함수를 클래스로 묶기`로 묶거나 `여러 함수를 변호나 함수로` 묶는 방법을 적용할 수 있다.
  - 내부 필드를 직접 수정하지말고 `참조 값으로 바꾸기`를 적용하여 구조체를 통쨰로 교체하는 편이 더 좋은 방법이다.

### 뒤엉킨 변경

- 소프트웨어의 구조는 변경하기 쉬연 형태로 구성되어야한다.
  - 소프트웨어는 소프트해야 마땅하기 때문이다.
  - 코드를 수정할 떄 `고쳐야할 딱 한군데를 찾아서 수정할 수 있는것`이 좋은 소프트웨어 이다.
- 이렇게 하지 못하는 이유 중 하나는 코드가 `단일 책임 원칙(Single Responsibility Principle)`을 제대로 지키지 않았기 때문이다.
  - 하나의 모듈이 서로 다른 이유로 인해 여러 가지 방식으로 변경되는 일이 많을 떄 발생한다.
- `단계 쪼개기` 와 전체 처리 과정에서 각기 다른 맥륵의 함수를 호출하는 빈도가 높다면 각 `맥락에 해당하는 적당한 모듈을 만들어` 주자.
- 여러 맥락의 일에 관여하는 함수가 있다면 옮기기 전에 `함수로 추출`하여 사용해 주자.

### 산탄총 수술

- 코드를 변경 할때 마다 자잘하게 수정해야 하는 클래스가 너무 많을 때 생기는 문제를 의미한다.
  - 변경할 부분이 코드 전반에 퍼져있다면 찾기도 어렵고 꼭 수정해야할 곳을 지나칠 활률도 높다.
- 함께 변경되는 대상들을 `함수옮기기` 와 `필드 옮기기`로 모두 한 `모듈`에에 묶어 두면 관리하기가 쉽다.
- 비슷한 데이터를 다루는 함수가 많다면 여러 함수를 `클래스로 묶어`준 후 함수들의 출력 결과를 묶어서 다음 단계의 로직에 전달 할 수있다면 `단계 쪼개기`를 적용해 주자

### 기능 편애

- 어떤 함수가 자기가 속한 모듈의 함수나 데이터보다 `다른 모듈`의 함수나 데이터와 `상호 작용할 일이 더 많을 때` 생기는 문제이다.
- 프로그램을 모듈화 할 때는 영역 `안`에서 이뤄지는 상호작용은 `최대한 늘리고`, 영역 `사이`에서 이뤄지는 상호작용은 `최소로 줄이는데` 주력 하자
- 자주 사용하는 모듈로 해당 기능을 옮겨 주는 방법으로 해결 할 수 있다.
  - 둘다 사용해서 어디로 옮겨야 할지 모를경우 가장 많은 데이터를 포함한 모듈로 옮겨주자
    - `함수 추출하기`로 함수를 여러 조각으로 나눈 후 각각을 접합한 모듈로 옮기면 더 쉽게 해결 할 수 있다.

### 데이터 뭉치

- 몰려다니는 데이터 뭉치는 `클래스` 단위로 묶어서 관리해주자.
  - 데이터 뭉치가 앞에서 새로 만든 객체의 필드 중 일부만 사용하더라도 괜찮다.
  - 새 객체로 뽑아낸 필드가 두 개 이상이기만 해도 확실히 예전보다는 나이진 것이기 때문이다.

### 기본형 집착

- 기본형식에 집착하여 주어진 문제에 맞는기초 타입(화폐,좌표,구간,날짜 등)을 직접 정의하지 않고 기본형을 사용하여 해결하려 하는 문제.
  - 금앨을 그냥 숫자형으로 계산하거나, 물리량을 계산할때 밀리미터나 인치 같은 단위를 뭇시하는 것
- 해당 형식을를 제공해주는 `라이브러리`를 활용하거나 `직접 기능을 하는 Class`를 만들어 적용해 주자.

### 반복되는 switch문

- 같은 조건으로 반복되는 switch문은 다형성을 통해 리팩토링이 가능하다.

### 추측성 일반화

- "나중에 필요할 거야"라는 생각으로 당장은 필요 ㅇ벗느 모든 종류의 후킹 포인트와 특이 케이스 처리 로직을 작성해 둔 코드를 작성 해 놓는 문제.
- 쓸때 없이 파일의 라인이 길어지며 관리하기 어려워진다.
- 당장 걸리적 거리는 코드는 형상 관리에 남겨 둔 후 삭제해 버리자.

### 임시 필드

- 특정 상황에서만 값이 설정되는 필드를 가진 클래스가 있는데 객체를 가져올때는 당연히 모든 필드가 채워져 있으리라 기대하는 게 보통이기에 해당 파일을 보기 전까지 알수가  
  없다는 단점이 있다.
- 임시 필드는 클래스 추출하기로 위치를 변경해준 후 함수 옮기기로 임시 필드들과 관련도니 코드를 새 클래스로 몰아 넣자.
- `특이 케이스 추가하기`로 필드들이 유효하지 않을 때 위한 대안 클래스를 만들어 주는 방법도 있다.

### 메시지 체인

- 클라이언트가 한 객체를 통해 다른 객체를 얻은 뒤 방금 얻은 객체에 또 다른 객체를 요청하는 작업이 연쇄적으로 이어지는 코드를 말한다.
- 사용 시 네비게이션 중간 단계를 수정하면 클라이언트의 코드도 수정해야하는 문제가 생길 때가 있다.

  - `managerName = aPerson.departmane.manager.name` -> 중간의 `manager`가 변경 되면 해당 코드를 사용하는 전체를 수정해야함.
    - 이러한 경우 `위임 숨기기` 와 `함수 옮기기`러 함수를 추출하여 객체를 사용하는 코드를 뺴내어서 사용하면 된다.

### 중개자

- 객체의 대표적인 기능중 하나로, 외부로부터 세부사항을 숨겨주는 `캡슐화`가 있다.
- 캡슐화하는 과정에서 `위임이 자주` 활용된다.
  - 클래스가 제공하는 메서드 중 절반이 다른 클래스에 구현을 위임하고 있는 형태의 지나친 위임은 문제가 된다. 이러한 경우 `중개자 제거하기`를 사용하여 리팩토링 해주자.

### 내부자 거래

- 모듈 사이의 데이터 거래가 많으면 결합도가 높아 지므로 그양을 최소로 줄이고 모두 투명하게 처리해야한다.
- 은밀하게 데이터를 주고받는 모듈들이 있다면 `함수 옮기기`와 `필드 옮기기` 기법을 떼어 놓아서 사적으로 처리하는 부분을 줄여 주자.
- 여러 모듈이 같은 관심사를 공유한다면 공통 부분을 정식으로 처리하는 `제 3 모듈을 새로 만드거`나 `위임 숨기기`를 이용하여 다른 모듈이 중산자 역할을 하게 만들자.

### 거대한 클래스

- 클래스에 필드가 너무 많으면 중복 코드가 발생하기 쉬우며 유지 및 보수하기가 어려워진다.
- `클래스 추출하기`로 필드들 일부를 따로 묶는다. ==> `추출 한 후 상속 관계로 만드는 것이 좋음 👍 `
  - 같은 컴포넌트에 모아두는 것이 합당해 보이는 필드들을 선택하면 된다.
  - 접두어나 접미어가 같은 필드들이 함께 추출할 후보들이다.
  - 위와 같은 기준으로 분리할 컴포넌트를 원래 클래스와 `상속 관계`로 만든느 것이 좋다.
    - `슈퍼클래스 추출하기`나 `타입 코드를 서브클래스로 바꾸기`를 적용하는 편이 더욱 관리하기 편하다.
  - 중복된 코드를 제거하는 것도 좋은 방법이다.
    - 중복된 코드를 작은 메서드로 뽑아내어 적용하자

### 서로 다른 인터페이스의 대안 클래스들

- 클래스를 사용 할때의 큰 장점은 필요에 따라 언제든지 다른 클래스로 `교체`할 수 있다는 것이다.
  - 단 교체하려면 인터페이스가 같거나 상속을 통한 부모 클래스가 같아서 `다형성`을 사용해야 한다.
  - 불가능할 경우 `함수 옮기기`를 이용하여 인터페으스가 같아 질떄까지 필요한 동작들을 클래스 안으로 밀어 넣은 후 중복 코득 생기면 `슈퍼클래스 추출하기`를 적용할 지 고민 해보자.

### 데이터 클래스 (DTO)

- public 필드가 있다면 `레코드 캡슐화하기`를 통해 데이터를 캡슐화 해주자
- 변경하면 안 되는 필드는 `세터 제거하기`로 접근을 원천 봉쇄 해주자.
- 불변 데이터로부터 나오는 정보는 게터를 통하지 않고 그냥 필드 자체를 공개해서 사용하자

### 상속 포기

- 부모의 유산을 원치 않거나 수 많은 유산 중에서 관심 있는 몇개만 받고 끝내려는 경우에는 서브클래스에 필요한 메서드를 `메서드 내리기`와 `필드 내리기`  
  를 통하여 물려받고 싶지 않을 부모 코드를 서브 클래스로 내린 후 부모 클래스에는 공통 된 필드 및 메서드만 남겨두자
- 단! 서브 클래스가 부모의 동작은 `필요로 하지만` 인터페이스는 따르고 싶지 않을 때 문제이다.
  - 이럴 때는 `서브클래스 위임으로 바꾸기`나 `슈퍼클래스를 위임으로 바꾸기`를 활용해서 아예 상속 메커니즘에서 벗어날 수 있다.

### 주석

- 주석은 악취가 아닌 향기를 입힌다.
- 코드 블록이 하는 일에 주석을 남기고 싶다면 `함수 추출하기`를 적용하거나 이미 추출 되어 있다면 `함수 선언 바꾸기`로 함수 이름을 바꿔보자
- 시스템이 동장하기 위한 선행 조건을 명시하고 싶다면 `어서션 추가하기`를 사용하자.
- `주성을 남겨야겠다는 생각이들면 , 가장 먼저 주석이 필요 없는 코드로 "리팩토링" 해보자!`
- 현재 진행 상황뿐만 아니라 확실하지 않은 부분에 주석을 남기자.

<hr/>

## 테스트 구축

### 실패 해야할 상황을 만들자

- 실패 해야할 상황에서는 반드시 실패하게 만들어 주자
- 각각의 테스트가 실패하는 모습을 최소 한번 쯤은 실패할 수 있는 상황을 만들어서라도 테스트를 하자
  - 일부러 오류를 주입하는것이다.
- 자주 테스트하고, 작성 중인 코드는 최소 한 몇 분 간격으로 테스트하며 적어도 하루에 한번은 전체 테스트를 돌려보자

### 테스트 추가하기

- public 메서드를 `빠짐 없이 테스트 할 필요`는 없다.
  - 테스트는 `위험 요인을 중심`으로 작성해야한다.
  - `단순히 필드`를 읽고 쓰기만 하는 접근자는 테스트를 `할 필요가 없다.`s
    - 너무 단순한 코드는 버그가 숨어들 가능성이 별로 없기 떄문임
  - 테스트를 너무 많이 만들다 보면 오히려 필요한 테스트를 놓치기 쉽다.
    - 중요하거나 오류의 가능성이 큰 영역을 집중적으로 테스트하여 `테스트의 효과를 극대화 시키는 것이 중요하다.`
- 코드를 수정하여 임의의 값을 설정해서라도 테스트를 진행해주자.
  - 현재일 기준 전월을 구하는 날짜 로직에서 오늘 일자 기준으로만 구하는 로직이라면 일부로 날짜를 말일로 `코드를 임의로 변경하면` 생각하지 못한 예외를 찾을 수 있다  
    -> 현재 달의 -1인 로직이 오늘 날짜 기준 달을 -1만 한 후 날짜를 그대로 사용하면 일과 달이 안맞는 일이 생기는 경우가 있을 수 있다.
- 사용하는 데이터가 같다고 같은 테스트를 한 메서드에서 실행 시키면 좋지 않다.
  - 테스트끼리는 상호작용하는 공유 픽처스 사용하면 다른 테스트가 실패 할 확률도 있고 테스트의 실행 순서에 따라 결과가 달라질 수도 있으며 테스트 자체를 믿기 어려워진다.

### 경계 조건 검사하기

- 순조로운 값만 들어온다 생각하는 테스트가 아닌 개발자가 생각한 의도를 벗어난 경계 지점의 테스트 또한 필요하다.
  - 필요한 테이터가 `null, 공백`이거나 문자열을 기대했지만 `숫자`가 들어 오는 경우 `음수`가 들어오는 경우 등등
- 위와 같이 경계를 확인 하는 테스트를 작성하다보면 프로그램에서 이런 특이 상황을 어떻게 처리하는 게 좋을지 생각해 볼 수 있다.
  - `문제가 생길 가능성이 있느 경계 조건을 생각해 보고 그 부분을 집중적으로 테스트하자`
  - `모든 버그를 잡아낼 수 는 없다고 생각하여 테스트를 작성하지 않는다면 대다수의 버그를 잡을 수 있는 기회를 날리는 셈이다.`
    - 많은 테스트는 오히려 프로그래밍을 속도와 개발 속도를 높혀 준다는 사실은 변함이 없다.
      - 단 여기서 중요한건 모든 기능을 테스트 하는것이 아닌 중요한 위험한 부분에 `집중`하여 테스트 하는 것이 중요하다.
- 테스트가 모든 버그를 걸러주지는 못할지라도, 안심하고 리팩터링을 할 수 있는 `보호막`은 되어준다.

<hr/>

## 리펙토링 팁

- 테스트가 느리거나 불편하면 리팩터링 속도가 느려지고 오류가 생길 가능성도 커진다.
  - 따라서 가장 먼저 테스트를 쉽게 수행할 수 있는 환경을 조성해주는 것이 중요하다!
- 코드베이스에서 일관성을 주는것이다. 어떤 곳에는 적용하고 어떤곳에는 다르게 적용한다면 나중에 보는 내자신도 그렇고 다른 사람이 봤을떄도 오히려 혼란을 줄 수있다.
