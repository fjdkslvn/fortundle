import React, { useState, useEffect } from "react";
import styles from "./GamePage.module.css";
import * as stringUtil from "../../modules/stringUtil";
import CellBundle from "./components/Cell/CellBundle";
import KeyBoard from "./components/KeyBoard/KeyBoard";

function GamePage() {
  const test = "순돌";

  const [testWord, setTestWord] = useState([]);
  const [splitWord, setSplitWord] = useState([]);
  const [submitWordList, setSubmitWordList] = useState([]);
  const [keyCheck, setKeyCheck] = useState({});
  const [testAbleNum, setTestAbleNum] = useState(6);

  useEffect(() => {
    setTestWord(stringUtil.getConstantVowel(test));
  }, []);

  /**
   * pc에서 키보드 입력을 통한 이벤트 처리
   * @param {*} e 키보드 이벤트
   */
  const writeWord = (keyCode) => {
    // 뒤로가기 기능
    if (keyCode === "Backspace") {
      const nextSplitWord = [...splitWord];
      nextSplitWord.splice(splitWord.length - 1, 1);
      setSplitWord(nextSplitWord);
      return false;
    }

    if (keyCode === "Enter") {
      if (splitWord.length === testWord.length) {
        checkWord();
        return false;
      } else {
        alert("음운이 부족합니다");
        return false;
      }
    }

    // 이미 칸을 모두 채웠으면 입력 못함
    if (splitWord.length === testWord.length || !keyCode.includes("Key")) {
      return false;
    }

    const newCV = stringUtil.changeCodeOfHangle(keyCode);
    if (!newCV) {
      return false;
    }

    const nextSplitWord = [...splitWord, newCV];
    if (nextSplitWord.length > testWord.length) {
      return false;
    }
    setSplitWord(nextSplitWord);
  };

  const checkWord = () => {
    let submitWord = [];
    let check = { ...keyCheck };
    let perfectCnt = 0;

    for (var i = 0; i < testWord.length; i++) {
      if (testWord[i] === splitWord[i]) {
        submitWord.push({
          value: splitWord[i],
          state: "success",
        });
        check[splitWord[i]] = "success";
        perfectCnt++;
      } else if (testWord.includes(splitWord[i])) {
        submitWord.push({
          value: splitWord[i],
          state: "half",
        });
        check[splitWord[i]] =
          check[splitWord[i]] !== "success" ? "half" : check[splitWord[i]];
      } else {
        submitWord.push({
          value: splitWord[i],
          state: "fail",
        });
        check[splitWord[i]] =
          check[splitWord[i]] !== "success" && check[splitWord[i]] !== "half"
            ? "fail"
            : check[splitWord[i]];
      }
    }
    setSubmitWordList([...submitWordList, submitWord]);
    setKeyCheck({ ...check });
    setSplitWord([]);
    setTestAbleNum(testAbleNum - 1);

    if (perfectCnt === testWord.length) {
      alert("정답입니다!");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <h2>Game</h2>
      <CellBundle
        writeWord={writeWord}
        testWordLen={testWord.length}
        testAbleNum={testAbleNum}
        submitWordList={submitWordList}
        splitWord={splitWord}
      />

      {/* 가상 키보드 영역 */}
      <KeyBoard writeWord={writeWord} keyCheck={keyCheck} />
    </div>
  );
}
export default GamePage;
