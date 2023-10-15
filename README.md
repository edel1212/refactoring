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
- 절차
  - 1 . 함수를 새로 만들고 목적이 잘들어나는 `이름`을 붙인다. (어떻게가 아닌 '무엇을' 하는지)
    - 처음부터 최선의 이림을 짓고 시작할 필요는 없다.
    - 일단 함수로 추출해서 사용해보고 효과가 크지 않다면 다시 원래 상태로 인라인 시켜도 괜찮다.
      - 이 과정이 시간낭비라 생각할 수 있지만 꺠달은게 있다면 시간낭비가 아니다.
    - 중첩 함수를 지원하는 언어를 사용한다면 추출한 함수를 함수안에 중첩 시키자
      - 다음 단계에서 수행할 유효 범위를 벗어난 변수를 처리하는 작업을 줄일 수 있다.
  - 2 . 추출할 코드를 원본 함수에서 복사하여 새 함수에 붙여넣는다.
  - 3 . 추출한 코드중 원본 함수의 지역 변수를 참조하거나 함수의 유효범위를 벗어나는 변수는 없는지 검사한다. (있다면 매개변수로 전달)
    - 추출한 코드에서만 사용하는 변수가 추출한 함수 밖에 선언되어 있다면 추출한 함수 안에서 선언하도록 수정해 주자.
    - 추출한 코드에서 값을 수정하는 지역 변수가 너무 많을 경우 `함수 추출`을 멈추고 `변수 쪼개기`나 `임시 변수를 질의 함수로 변경`하기 와 같은 다른 리팩토링을 적용하여  
      코드를 단순화 한 후 함수 추출하기를 다시 시도하는 것이 좋다.
  - 4 . 변수 처리가 끝났다면 컴파일을 한다.
    - 컴파일을 통해 제대로 처리 하지 못한 변수를 찾는데 도움이 될 수 있다.
  - 5 . 원본 함수에서 추출한 코드 부분을 `새로 만든 추출한 함수`로 변경 해준다.
  - 6 . 테스트 코드를 작성하여 테스트를 진행한다.
  - 7 . 방금 추출하여 만든 코드와 비슷하거나 똑같은 코드가 없는지 확인한다. -> 있다면 방금 추출한 함수를 호출하도록 바꿀지 검토한다.
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
- 절차
  - 1 . 다형성 메서드인지 확인한다.
    - 서브클래스에서 오버라이드하는 메서드는 인라인 하기가 `불가능`하기 때문이인다.
  - 2 . 인라인할 함수를 호출하는 곳을 모두 찾는다.
  - 3 . 각 호출문을 함수 본문으로 교체해 준다.
  - 4 . 하나씩 교체할 때마다 테스트 해준다.
    - 한번에 처리할 필요가 없다, 인라인하기 까다로운 부분이 있다면 일단 남겨두고 여유가 생실떄마다 변경해줘도 괜찮다.
  - 5 . 모든 교체가 끝난다면 원래 정의 되어 있는 함수를 삭제한다.
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
- 절차
  - 1 . 추출하려는 표현식에 부작용은 없는지 확인한다.
  - 2 . 불변 변수를 하나 선언하고 일므을 붙일 표현식의 복제본을 대입힌다.
  - 3 . 원본 표현식을 새로 만든 변수로 교체한다.
  - 4 . 테스트한다.
  - 5 . 표현식을 여러 곳에서 사용한다면 각각을 새로 만든 변수로 교체한다. 하나 교체할 떄마다 테스트 해준다.
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

  - 1 . 매개변수를 제거하려거든 먼저 함수 본문에서 제거 대상 매개변수를 참조하는 곳은 없지 확인한다.
  - 2 . 메서드 선언을 원하는 형태로 바꾼다.
  - 3 . 기존 메서드 선언을 참조 하는 부분을 모두 찾아 바뀐 형태로 수정한다.
  - 4 . 테스트한다.
  -
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
- 절차
  - 1 . 변수로 접근과 갱신을 전담하는 캡슐화 함수들을 만든다.
  - 2 . 정적 검사를 수행한ㄷ.
  - 3 . 변수를 직접 참조하던 부분을 모두 적절한 캡슐화 함수로 바꾼다. 하나씩 바꿀 때마다 테스트 한다.
  - 4 . 변수의 접근 범위를 제한한다.
    - 변수로의 직접 접근을 말을 수 ㅇ벗을때도 있다. 그럴떄는 변수 일므을 바꿔서 테스트 해보면 해당 변수를 참조하는 곳을 쉽게 찾을 수 있음
  - 5 . 테스트한다.
  - 6 . 변수 값이 레코드라면 `레코드 캡슐화하기`를 적용할지 고려해본다.
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
- 절차
  - 1 . 폭넒게 쓰이는 변수라면 `변수 캠슐화하기`를 고려한다.
  - 2 . 이름을 바꿀 변수를 참조하는 곳을 모두 찾아서 변경한다.
    - 다른 코드베이스에서 참조하는 변수는 외부에 공개된 변수이므로 해당 리팩토링 방식을 적용할 수 없다.
    - 변수 값이 변하지 않는다면 다른 이름으로 복ㅈ제본을 만들어 하나씩 점진적으로 변경하자 -> 한번에 바꾸며다 오류나면 찾기 더 힘들기 떄문임..
  - 3 . 테스트 한다.

### 매개변수 객체 만들기

- 데이터 항목 여러 개가 같은 형식으로 다른 함수에 몰려 다니는 경우 하나로 모아주는 것이 좋다.
- 한 곳으로 모아 데이터 구조를 하나로 묶어주면 데이터 사이의 관계가 명확해진다는 이점이 있다.
- 함수에서 받는 매개변수의 수가 줄어들어 가독성이 좋아진다.
- 같은 데이터구조를 사용하는 모든 함수가 이 데이터 구조를 참조할떄 같은 이름을 사용하기에 일관성 또한 높아진다.
- 데이터 구조에 담길 데이터에 공통으로 적용되는 동작을 추출해서 함수로 만들 수도 있고 더 나아가서 함수들과 데이터를 합쳐 클래스로 만들 수 도 있다.
- 새로 만든 데이터 구조가 문제영역을 훤씬 간결하게 표현하는 추상 개념으로 격상되면서 코드의 개념을 다시 그릴 수도 있다.
- 절차
  - 1 . 적당한 데이터 구조가 아직 마련되어 있지 않다면 새로 만든다.
    - 클래스 구조로 만드는 것이 좋다. 나중에 동작까지 함꼐 묶기 좋기 떄문임
  - 2 . `함수 선언 바꾸기`로 새 데이터 구조를 매개변수로 추가한다.
  - 3 . 테스트한다.
  - 4 . 함수 호출 시 새로운 데이터 구조 인스턴스를 넘기도록 수정하며, 하나씩 수정할 때마다 테스트한다.ㄴ
  - 5 . 기존 매개변수를 사용하던 코드를 새 데이터 구조의 원소를 사용하도록 바꾼다.
  - 6 . 변경이 끝났다면 기존의 매개변수를 제거하고 테스트한다.
- 예시

  ```javscript
  /** 온도 측정값 배열에서 정상 작동 범위를 벗어난 것이 있는지 검사하는 코드 */

  // 온도 측정값
  const station = { name : "ZB1",
                    reading : [
                         {temp : 46, time : "2016-11-10 09:10"},
                         {temp : 53, time : "2016-11-10 09:20"},
                         {temp : 16, time : "2016-11-10 09:30"},
                    ]}

  // 정상 범위를 벗어난 측정값을 찾는 함수
  function readingOutsideRange(station, min, max){
    return station.readings.filter(r => r.temp < min || r.temp > max);
  }

  // 함수 호출
  alerts = readingsOutsideRange(station
                              , operatingPlan.temperaturFloor     // 최저 온도
                              , operatingPlan.temperaturCeiling); // 최고 온도


  // 👉 위에서 사용하는 최저,최고 온도를 class로 묶어줌
  class NumberRange{
    constructor(min, max){
      this._data = {min : min, max : max}
    }
    get min() {return this._data.min}
    get max() {return this._data.max}
  }

  // 👉 기존 함수를 "함수 선언 바꾸기"를 사용해서 매개변수를 변경
  function readingOutsideRange(station, range){
    return station.readings.filter(r => r.temp < range.min || r.temp > range.max);
  }

  // 👉 변경된 형식으로 호출
  const range = new NumberRange(operatingPlan.temperaturFloor, operatingPlan.temperaturCeiling); // 객체 생성
  alerts = readingOutsideRange(station, range);
  ```

- 진정한 값 객체로 거듭나기

  - 쉽게 설명하면 같은 묶어 놓은 매개변수들이 사용하는 로직등을 class의 이점을 살려서 class내부의 메서드로 만들어주는 것이다.
  - 간단한 예시로는 페이징을 사용할때 만들었던 DTO를 생각하면 될듯하다.
    - 항상 받는 파라미터는 정해져있고 그걸로 목록함수, 다음, 이전 유무 메서드 등등 을 작성해준다.

  ```javascipt
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
- 절차
  - 1 . 함수들이 공유하는 공통 데이터 레코드를 캡슐화 한다.
    - 공통 데이터가 레코드 구조로 묶여 있지 않다면 먼저 `매개변수 객체 만들기`로 데이터를 하나로 묶는 레코드를 만든다.
  - 2 . 공통 레코드를 사용하는 함수 각각을 새 클래스로 옮긴다 `(함수 옮기기)`
  - 3 . 데이터를 조작하는 로직들은 `함수로 추출`해서 새 클래스로 옮긴다.
- 예시

  ```javascipt
  /** 정부에처 차를 수돗물처럼 제공하는 프로그램 예시 사람들은 매달 차 계기량을 읽어서 측정값을 기록함 */

  // 차량 계기량 측정값
  reading = {customer : "ivan", quantity : 10 , month :  5 , year : 2017};

  /** 문제의 코드 같은 로직의 함수가 중복되어 사용되고 있다👎 **/
  // 클라이언트1
  const aReading = acquiredRading();
  const baseChage = baseRate(aReading.monht, aReading.year) * aReading.quantity;    // 기본 요금 계산

  // 클라이언트2
  const aReading = acquiredRading();
  const base = baseRate(aReading.monht, aReading.year) * aReading.quantity;         // 기본 요금 계산
  const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));            // 차 소비량만큼 면세

  // 클라이언트3
  const aReading = acquiredRading();
  const basicChargeAmount = calcualteBaseChage(aReading);

  function calculateBaseCharge(aReading){ // 기본 요금 계산 함수
    return baseRate(aReading.monht, aReading.year) * aReading.quantity;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 리팩토링 👍 **/
  //  레코드를 클래스로 변환하기위해 캡슐화를 진행
  class Reading{
    constructor(data){
      this._customer = data.customer;
      this._quantity = data.quantity;
      this._month    = data.month;
      this._year     = data.year;
    }
    get customer(){return this._customer;}
    get quantity(){return this._quantity;}
    get month(){return this._month;}
    get year(){return this._year;}

    // 👉 함수 이름을 원하는대로 바꿔주자 "함수 이름 바꾸기"
    get baseCharge(){
      return baseRate(this._monht, this._year) * this._quantity;
    }

    // 👉 클라이언트2에서 사용하던 불필요하게 긴 로직을 같은 레코드를 쓰는 해당 클래스에서 메서드로 만들어줌
    get taxableCharge(){
      return Math.max(0, this.baseChage - taxThreshold(this._year))
    }

  }

  // 클라이언트 3
  const rawReading = acquiredRading();
  const aReading   = new Reading(rawReading);
  // 💬 아래와 같이 이름을 바꾸고 나면 해당 baseCharge 값이 "필드 값" 인지 "계산된 값(메서드 호출 값)"인지 구분할수 없다
  //    이는 "단일 접근 원칙"을 따르므로 권장하는 방식이다. 👍
  const basicChargeAmount = aReading.baseCharge;

  // 클라이언트 1
  const rawReading = acquiredRading();
  const aReading   = new Reading(rawReading);
  const baseCharge = aReading.baseCharge;

  // 클라이언트2
  const rawReading    = acquiredRading();
  const aReading      = new Reading(rawReading);
  const taxableCharge =  aReading.taxableCharge;

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
- 절차
  - 1 . 변환할 레코드를 입력 받아서 값을 그대로 반환하는 변환 함수를 만든다.
    - 해당 작업은 깊은 복사로 처리해주자. 변환 함수가 원본 레코드를 바꾸지 않는지 검사하는 테스트를 꼭해주자!! [ ✅ 항상 원본 데이터 보존이 중요하다 ]
  - 2 . 묶을 함수 중 함수 하나를 골라서 본문 코드를 변환 함숨수로 옮기고 처리 결과를 레코드에 기록 -> 클라언트 코드가 이필드를 참조하게 변경
    - 로직이 복잡하면 `함수 추출하기`를 진행 후 적용해 주자
  - 3 . 테스트하기
  - 4 . 나머지 관련 함수들도 위의 과정에 따라서 처리해주자.
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

  ```javascipt
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

  ```javascipt
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
  function compareUsage(customerID, laterYear, month){
    const later = customerData[customerID].usage[lateYear][month];
    const earlier = customerData[customerID].usage[lateYear - 1][month];
    return {laterAmount : later, change : later - earlier};
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /** 리팩토링 캡슐화 👍 **/
  class CustomerData{
    constructor(data){
      this._data = data;
    }

    // 내부 데이터 수정
    setUsage(customerID, year, month, amount){
      this._data[customerID].usages[year][month]
    }

    // 데이터 복사본을 반환함
    get rawData(){
      // 👉 깊은 복사
      return _.cloneDeep(this.data);
    }

    // 사용량 반환
    usage(customerID, year, month){
      return this._data[customerID].usages[year][month];
    }
  }

  function getCustomerData() {return constoerData;}
  function setRawDataOfCustomers(arg) {customerData = new CustomerData(arg);}
  function getRawDataOfCustomers(){ return customerData.rawData; }

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

  /** 리팩토링 캡슐화 👍 **/
  class Order{
    constructor(quantity, item) {
      this._quantity = quantity;
      this._item = item;
    }
    
    // 👉 base값을 함수로 추출
    get basePrice(){
      return this._quantity * this._item.price;
    }
    
    // 👉 discount값을 함수로 추출
    get discountFactor(){
      let dicountFactor = 0.98;
      if (basePrice > 1_000) discount -= 0.03;
      return dicountFactor;
    }
    
    // 👉 두 값을 조합하는 함수로 변경 
    get price(){
      return this.basePrice * this.discountFactor;   
    }
  }
  ```

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

```javscript
// 👎 원래 코드
class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;


  }
}

/*************************************************************************************/
/*************************************************************************************/

// 👍 매개변수를 질의 함수로 바꿈
class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    return 30000 + this.bonusAmount;
  }

  get bonusAmount() {
    return this.overThresholdAmount + this.perAudienceAmount;
  }

  get overThresholdAmount() {
   // 👉 if (this.performance.audience > 20) 대체 가능 이유는 20 보다 큰지 확인 하는 것이기 떄문 생각해보면 당연한것 !
    return Math.max(this.performance.audience - 20, 0) * 500;
  }

  get perAudienceAmount() {
    return 300 * this.performance.audience;
  }
}
```

- 사용 중인 데이터 구조에서 값들을 뽑아서 각가의 별개의 매개변수를 전달하는 코드라면 `객체 통째로 넘기기`를 적용해서 원본 데이터 구조를 그대로 전달한다.
- 항상 함께 전달되는 매개변수들의 그룹이 있다면 해댕 목록의 변수들을 `매개변수 객체 만들기`를 사용해주자
- 함수의 동장 방식을 정하는 플래그 역할의 매개변수는 `플래그 인수 제거하기`로 없애준다.
  - 코드를 이해하기 어려워지기 때문 이럴 경우 메서드를 `2개로 나눠서` 사용해주는것이 더욱 가독성이 높디.

```javascript
// 👎 원래 코드
function calculateTotal(amount, applyDiscount) {
  if (applyDiscount) {
    // 할인을 적용하는 로직
    return amount * 0.9;
  } else {
    return amount;
  }
}

/*************************************************************************************/
/*************************************************************************************/

// 👍 메서드를 분리함
function calculateTotalWithoutDiscount(amount) {
  return amount;
}

function calculateTotalWithDiscount(amount) {
  return amount * 0.9;
}
```

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

```javascipt
// 👎 원래 코드
class Shape {
  constructor(type) {this.type = type;}

  area() {
    switch (this.type) {
      case 'circle':
        return Math.PI * this.radius * this.radius;
      case 'rectangle':
        return this.width * this.height;
      // 등등 ..
    }// switch
  }// area
}

// 원 class
class Circle extends Shape {
  constructor(radius) {
    super('circle');
    this.radius = radius;
  }// constructor
}

// 직사각형 class
class Rectangle extends Shape {
  constructor(width, height) {
    super('rectangle');
    this.width = width;
    this.height = height;
  } // constructor
}

/*************************************************************************************/
/*************************************************************************************/

 // 👍 전역 변수를 캡슐화 시킴
class Shape {
  constructor() {}
  area() {}
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}
```

### 추측성 일반화

- "나중에 필요할 거야"라는 생각으로 당장은 필요 ㅇ벗느 모든 종류의 후킹 포인트와 특이 케이스 처리 로직을 작성해 둔 코드를 작성 해 놓는 문제.
- 쓸때 없이 파일의 라인이 길어지며 관리하기 어려워진다.
- 당장 걸리적 거리는 코드는 형상 관리에 남겨 둔 후 삭제해 버리자.

### 임시 필드

- 특정 상황에서만 값이 설정되는 필드를 가진 클래스가 있는데 객체를 가져올때는 당연히 모든 필드가 채워져 있으리라 기대하는 게 보통이기에 해당 파일을 보기 전까지 알수가  
  없다는 단점이 있다.

```javascipt
//  임시 필드 예시
class Order {
  constructor(id) {
    this.id = id;
    this.items = [];
    this.isProcessed = false; // 👉 임시 필드 코드를 열기까지  알 수가 없음
  }

  addItem(item) {
    this.items.push(item);
  }

  process() {
    // 주문 처리 로직
    this.isProcessed = true;
  }
}
```

- 임시 필드는 클래스 추출하기로 위치를 변경해준 후 함수 옮기기로 임시 필드들과 관련도니 코드를 새 클래스로 몰아 넣자.
- `특이 케이스 추가하기`로 필드들이 유효하지 않을 때 위한 대안 클래스를 만들어 주는 방법도 있다.

### 메시지 체인

- 클라이언트가 한 객체를 통해 다른 객체를 얻은 뒤 방금 얻은 객체에 또 다른 객체를 요청하는 작업이 연쇄적으로 이어지는 코드를 말한다.
- 사용 시 네비게이션 중간 단계를 수정하면 클라이언트의 코드도 수정해야하는 문제가 생길 때가 있다.

  - `managerName = aPerson.departmane.manager.name` -> 중간의 `manager`가 변경 되면 해당 코드를 사용하는 전체를 수정해야함.

    - 이러한 경우 `위임 숨기기` 와 `함수 옮기기`러 함수를 추출하여 객체를 사용하는 코드를 뺴내어서 사용하면 된다.

    ```javascript
    // 👎 변경 전
    managerName = aPerson.department.manager.name;

    /*************************************************************************************/
    /*************************************************************************************/
    // 👍 변경 후
    class reportAutoGenerator {
      constructor(aPerson) {
        this.aPerson = aPerson;
      } // constructor

      report() {
        return this.aPerson.department.manager.name;
      }
    }
    console.log(reportAutoGenerator.report(aPerson));
    ```

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

```javscipt
// javascript
describe('province',function(){
  // 👎 좋지 못한 방법이다. 한개의 픽처스로 같이 두개의 테스트 진행 중
  const asia = new Province(siampleProvinceDate());

  it('shortfall',()=>{
    expect(asia.shortfall).equals(5);
  })

  it('profit',()=>{
    expect(asia.profit).equals(230);
  })
})
```

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
