/** 단어의 자음과 모음 분리 */
export function getConstantVowel(kor) {
  if (kor == "") {
    return [];
  }

  const cvList = {
    f: [
      "ㄱ",
      ["ㄱ", "ㄱ"],
      "ㄴ",
      "ㄷ",
      ["ㄷ", "ㄷ"],
      "ㄹ",
      "ㅁ",
      "ㅂ",
      ["ㅂ", "ㅂ"],
      "ㅅ",
      ["ㅅ", "ㅅ"],
      "ㅇ",
      "ㅈ",
      ["ㅈ", "ㅈ"],
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ],
    s: [
      "ㅏ",
      ["ㅏ", "ㅣ"],
      "ㅑ",
      ["ㅑ", "ㅣ"],
      "ㅓ",
      ["ㅓ", "ㅣ"],
      "ㅕ",
      ["ㅕ", "ㅣ"],
      "ㅗ",
      ["ㅗ", "ㅏ"],
      ["ㅗ", "ㅏ", "ㅣ"],
      ["ㅗ", "ㅣ"],
      "ㅛ",
      "ㅜ",
      ["ㅜ", "ㅓ"],
      ["ㅜ", "ㅓ", "ㅣ"],
      ["ㅜ", "ㅣ"],
      "ㅠ",
      "ㅡ",
      ["ㅡ", "ㅣ"],
      "ㅣ",
    ],
    t: [
      "",
      "ㄱ",
      ["ㄱ", "ㄱ"],
      ["ㄱ", "ㅅ"],
      "ㄴ",
      ["ㄴ", "ㅈ"],
      ["ㄴ", "ㅎ"],
      "ㄷ",
      "ㄹ",
      ["ㄹ", "ㄱ"],
      ["ㄹ", "ㅁ"],
      ["ㄹ", "ㅂ"],
      ["ㄹ", "ㅅ"],
      ["ㄹ", "ㅌ"],
      ["ㄹ", "ㅍ"],
      ["ㄹ", "ㅎ"],
      "ㅁ",
      "ㅂ",
      ["ㅂ", "ㅅ"],
      "ㅅ",
      ["ㅅ", "ㅅ"],
      "ㅇ",
      "ㅈ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ],
    j: [
      "ㄱ",
      ["ㄱ", "ㄱ"],
      ["ㄱ", "ㅅ"],
      "ㄴ",
      ["ㄴ", "ㅈ"],
      ["ㄴ", "ㅎ"],
      "ㄷ",
      ["ㄷ", "ㄷ"],
      "ㄹ",
      ["ㄹ", "ㄱ"],
      ["ㄹ", "ㅁ"],
      ["ㄹ", "ㅂ"],
      ["ㄹ", "ㅅ"],
      ["ㄹ", "ㅌ"],
      ["ㄹ", "ㅍ"],
      ["ㄹ", "ㅎ"],
      "ㅁ",
      "ㅂ",
      ["ㅂ", "ㅂ"],
      ["ㅂ", "ㅅ"],
      "ㅅ",
      ["ㅅ", "ㅅ"],
      "ㅇ",
      "ㅈ",
      ["ㅈ", "ㅈ"],
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ],
  };

  function selectCV(type, idx) {
    for (var i = 0; i < cvList[type][idx].length; i++) {
      resultList.push(cvList[type][idx][i]);
    }
  }

  const ga = 44032;
  let fn, sn, tn, jn;
  let resultList = [];

  for (var k = 0; k < kor.length; k++) {
    let uni = kor[k].charCodeAt(0);

    // 가장 첫 음절인 '가'보다 작다면, 초성만 존재하는 상태
    if (uni < ga) {
      if (uni < 12623) {
        jn = uni - 12593; // 가장 첫 자음인 'ㄱ'의 유니코드는 12593
        selectCV("j", jn);
      } else {
        sn = uni - 12623; // 가장 첫 모음인 'ㅏ'의 유니코드는 12623
        selectCV("s", sn);
      }
    } else {
      // 유니코드로 나타낼수있는 가장 첫 음절이 '가'이기 때문에 가를 기준으로 끊어버리기 위해
      // '가'의 유니코드값을 내가 알고자하는 음절에서 뺀 후 계산
      uni = uni - ga;

      // 초성은 588 단위로 변경되기 때문에 588로 나눠서 자리수 버리기
      fn = parseInt(uni / 588);
      // 중성은 28단위로 변경되기 때문에, 초성 값을 버린 후 마찬가지로 28로 나눠서 자리수 버리기
      sn = parseInt((uni - fn * 588) / 28);
      // 종성은 숫자가 1씩 올라가는데 중성이 28단위로 변경되는 이유가 종성이 28개라서 그런것 ㅇㅇ
      // 그러니 그냥 28로 나머지 계산처리해서 종성을 구할 수 있음
      tn = parseInt(uni % 28);

      selectCV("f", fn);
      selectCV("s", sn);
      selectCV("t", tn);
    }
  }

  return resultList;
}

/** 입력한 키를 한글 자음 모음으로 변환 */
export function changeCodeOfHangle(code) {
  const hangle = {
    KeyQ: "ㅂ",
    KeyW: "ㅈ",
    KeyE: "ㄷ",
    KeyR: "ㄱ",
    KeyT: "ㅅ",
    KeyY: "ㅛ",
    KeyU: "ㅕ",
    KeyI: "ㅑ",
    KeyA: "ㅁ",
    KeyS: "ㄴ",
    KeyD: "ㅇ",
    KeyF: "ㄹ",
    KeyG: "ㅎ",
    KeyH: "ㅗ",
    KeyJ: "ㅓ",
    KeyK: "ㅏ",
    KeyL: "ㅣ",
    KeyZ: "ㅋ",
    KeyX: "ㅌ",
    KeyC: "ㅊ",
    KeyV: "ㅍ",
    KeyB: "ㅠ",
    KeyN: "ㅜ",
    KeyM: "ㅡ",
  };

  return hangle[code];
}
