import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./GamePage.module.css";
import * as stringUtil from "../../modules/stringUtil";
import CellBundle from "./components/Cell/CellBundle";

function GamePage() {
  const test = "순돌";

  const [testWord, setTestWord] = useState([
    "ㅇ",
    "ㅏ",
    "ㄴ",
    "ㄴ",
    "ㅕ",
    "ㅇ",
  ]);
  const [splitWord, setSplitWord] = useState([]);
  const [submitWordList, setSubmitWordList] = useState([]);
  const [testAbleNum, setTestAbleNum] = useState(6);
  const testWordLen = useRef(6);

  /**
   * pc에서 키보드 입력을 통한 이벤트 처리
   * @param {*} e 키보드 이벤트
   */
  const writeWord = (keyCode) => {
    // 뒤로가기 기능
    if (keyCode == "Backspace") {
      const nextSplitWord = [...splitWord];
      nextSplitWord.splice(splitWord.length - 1, 1);
      setSplitWord(nextSplitWord);
      return false;
    }

    if (keyCode == "Enter") {
      if (splitWord.length == testWordLen.current) {
        checkWord();
        return false;
      } else {
        alert("음운이 부족합니다");
        return false;
      }
    }

    // 이미 칸을 모두 채웠으면 입력 못함
    if (splitWord.length == testWordLen.current || !keyCode.includes("Key")) {
      return false;
    }

    const newCV = stringUtil.changeCodeOfHangle(keyCode);
    if (newCV == null) {
      return false;
    }

    const nextSplitWord = [...splitWord, newCV];
    if (nextSplitWord.length > testWordLen.current) {
      return false;
    }
    setSplitWord(nextSplitWord);
  };

  const checkWord = () => {
    let submitWordListNew = [...submitWordList];
    let submitWord = [];
    let perfectCnt = 0;

    for (var i = 0; i < testWordLen.current; i++) {
      if (testWord[i] == splitWord[i]) {
        submitWord.push({
          value: splitWord[i],
          state: "success",
        });
        perfectCnt++;
      } else if (testWord.includes(splitWord[i])) {
        submitWord.push({
          value: splitWord[i],
          state: "half",
        });
      } else {
        submitWord.push({
          value: splitWord[i],
          state: "fail",
        });
      }
    }
    submitWordListNew.push(submitWord);
    setSubmitWordList(submitWordListNew);
    setSplitWord([]);
    setTestAbleNum(testAbleNum - 1);

    if (perfectCnt == testWordLen.current) {
      alert("정답입니다!");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.h2}>Game</h2>
      <CellBundle
        writeWord={writeWord}
        testWordLen={testWordLen.current}
        testAbleNum={testAbleNum}
        submitWordList={submitWordList}
        splitWord={splitWord}
      />
    </div>
  );
}
export default GamePage;
