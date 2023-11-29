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
