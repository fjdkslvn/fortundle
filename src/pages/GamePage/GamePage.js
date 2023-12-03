import React, { useState, useEffect } from "react";
import styles from "./GamePage.module.css";
import * as stringUtil from "../../modules/stringUtil";
import CellBundle from "./components/Cell/CellBundle";
import KeyBoard from "./components/KeyBoard/KeyBoard";

function GamePage() {
  const test = "도시락";

  const [testWord, setTestWord] = useState([]);
  const [splitWord, setSplitWord] = useState([]);
  const [submitWordList, setSubmitWordList] = useState([]);
  const [keyCheck, setKeyCheck] = useState({});
  const [testAbleNum, setTestAbleNum] = useState(6);
  const [finishState, setFinishState] = useState(false);

  useEffect(() => {
    setTestWord(stringUtil.getConstantVowel(test));

    const getSubmitWordList = JSON.parse(
      localStorage.getItem("submitWordList")
    );
    if (getSubmitWordList) {
      setSubmitWordList(getSubmitWordList);
      setTestAbleNum(testAbleNum - getSubmitWordList.length);
    }
  }, []);

  useEffect(() => {
    if (submitWordList.length > 0) {
      const submitWord = submitWordList[submitWordList.length - 1];
      const successList = submitWord.filter((word) => word.state === "success");
      if (successList.length === testWord.length) {
        alert("정답입니다!");
        setFinishState(true);
      } else if (testAbleNum === 0) {
        alert(`실패하였습니다. 정답은 ${test}입니다.`);
        setFinishState(true);
      }
    }
  }, [testAbleNum]);

  /**
   * pc에서 키보드 입력을 통한 이벤트 처리
   * @param {*} e 키보드 이벤트
   */
  const writeWord = (keyCode) => {
    // 이미 정답을 맞춘 경우
    if (finishState) {
      return false;
    }

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

    for (var i = 0; i < testWord.length; i++) {
      if (testWord[i] === splitWord[i]) {
        submitWord.push({
          value: splitWord[i],
          state: "success",
        });
        check[splitWord[i]] = "success";
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

    const newSubmitWordList = [...submitWordList, submitWord];
    localStorage.setItem("submitWordList", JSON.stringify(newSubmitWordList));
    setSubmitWordList(newSubmitWordList);
    setKeyCheck({ ...check });
    setSplitWord([]);
    setTestAbleNum(testAbleNum - 1);
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
