import React from "react";
import Cell from "./Cell";
import styles from "./CellBundle.module.css";

function CellBundle({
  writeWord,
  submitWordList,
  testWordLen,
  splitWord,
  testAbleNum,
}) {
  /* 화면상 키보드가 입력되는 것을 감지하는 부분
    아래와 같은 addEventListener사용시 버그 발생(뒤로가기 한번 눌렀는데 200번 찍히는등)
    window.addEventListener("keyup", (e) => {});
    */
  window.onkeyup = (e) => {
    writeWord(e.code);
  };

  return (
    <div className={styles.cellBundle}>
      {submitWordList.map((submitWord, idx) => (
        <div className={styles.cellList} key={idx}>
          {submitWord.map((obj, idx) => (
            <Cell state={obj.state} value={obj.value} key={idx} />
          ))}
        </div>
      ))}
      <div className={styles.cellList}>
        {submitWordList.length < testWordLen &&
          [...Array(parseInt(testWordLen))].map((obj, idx) =>
            splitWord.length > idx ? (
              <Cell value={splitWord[idx]} key={idx} />
            ) : (
              <Cell key={idx} />
            )
          )}
      </div>
      {[...Array(parseInt(testAbleNum - 1))].map((obj, idx) => (
        <div className={styles.cellList} key={idx}>
          {[...Array(parseInt(testWordLen))].map((obj, idx) => (
            <Cell key={idx} />
          ))}
        </div>
      ))}
    </div>
  );
}
export default CellBundle;
